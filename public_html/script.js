var outputElm = document.getElementById('output');
var errorElm = document.getElementById('error');
var commandsElm = document.getElementById('commands');
var textElm = document.getElementById('content');
var editor = CodeMirror.fromTextArea(commandsElm, {
    mode: 'text/x-mysql',
    viewportMargin: Infinity,
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    extraKeys: {
        "Ctrl-Enter": test,
    }
});
var question = null;
var worker = new Worker("worker.sql-wasm.js");
worker.onerror = error;
function error(e) {
    errorElm.textContent = e.message;
    outputElm.textContent = "Essaie encore...";
}
function noerror() {
    errorElm.textContent = "";
}
function execute(commands) {
    worker.onmessage = function (event) {
        var results = event.data.results;
        if (!results) {
            error({message: event.data.error});
            return;
        }
        outputElm.innerHTML = "";
        for (var i = 0; i < results.length; i++) {
            outputElm.appendChild(tableCreate(results[i].columns, results[i].values));
        }
    }
    worker.postMessage({action: 'exec', sql: commands});
    outputElm.textContent = "Je cherche...";
}

var tableCreate = function () {
    function valconcat(vals, tagName) {
        if (vals.length === 0)
            return '';
        var open = '<' + tagName + '>', close = '</' + tagName + '>';
        return open + vals.join(close + open) + close;
    }
    return function (columns, values) {
        var tbl = document.createElement('table');
        var html = '<thead>' + valconcat(columns, 'th') + '</thead>';
        var rows = values.map(function (v) {
            return valconcat(v, 'td');
        });
        html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
        tbl.innerHTML = html;
        return tbl;
    }
}();

function test() {
    noerror()
    execute(editor.getValue() + ';');
}
function validate() {
    noerror()
    if (question == null) return;
    execute(editor.getValue() + ';');
    var response = editor.getValue();
    question.innerHTML += "<pre><code class='lang-sql'>" +
            response + "\n-----------\n( " +
            question.getElementsByClassName("response")[0].innerHTML +
            " )</code></pre>";
    advance();
}
function giveup() {
    noerror();
    if (question == null) return;
    var response = editor.getValue();
    editor.setValue(question.getElementsByClassName("response")[0].innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    execute(editor.getValue() + ';');
    question.innerHTML += "<pre><code class='lang-sql'>" + response + "\nDommage:\n" + editor.getValue() + "</code></pre>";
    advance();
}
function advance() {
    el = question;
    el = el.nextElementSibling;
    while (el != null) {
        if (el.style != undefined) el.style.display = "";
        if (el.classList.contains("question")) {
            question = el;
            return;
        }
        el = el.nextElementSibling;
    }
    question = null;
    document.getElementById("print").style.display = "";
}

function updateContent() {
    var display = true;
    var nb = 1;
    els = document.getElementById("content").childNodes;
    for (i in els) {
        if (els[i].style == undefined) continue;
        if (!display) els[i].style.display = "none";
        if (els[i].classList.contains("question")) {
            if (display) {
                display = false;
                question = els[i];
            }
            els[i].innerHTML = "<b>" + nb + " : </b>" + els[i].innerHTML;
            nb++;
        }

    }
}

function load(htmlFile, dbFile) {
    var xcontent = new XMLHttpRequest();
    xcontent.overrideMimeType("text/html");
    xcontent.open('GET', "TP/"+htmlFile + ".html", true);
    xcontent.onreadystatechange = function () {
        if (xcontent.readyState == 4 && xcontent.status == "200") {
            textElm.innerHTML = xcontent.responseText
            updateContent();
        }
    };
    xcontent.send(null);
    var xdb = new XMLHttpRequest();
    xdb.overrideMimeType("text/sql");
    xdb.open('GET', "TP/"+dbFile + ".sql", true);
    xdb.onreadystatechange = function () {
        if (xdb.readyState == 4 && xdb.status == "200") {
            execute(xdb.responseText);
        }
    };
    xdb.send(null);
}
                       
var regex = new RegExp('(\\?|&|^)html=(.*?)(&|$)');
var html = document.location.href.match(regex)[2];
regex = new RegExp('(\\?|&|^)db=(.*?)(&|$)');
var db = document.location.href.match(regex)[2];
load(html,db);  