var outputElm = document.getElementById('output');
var errorElm = document.getElementById('error');
var commandsElm = document.getElementById('commands');
var textReply = document.getElementById('textReply');
var textElm = document.getElementById('content');
var testButton = document.getElementById('testButton');
var cancelButton = document.getElementById("cancelButton");
var validateButton = document.getElementById("validateButton");
var printButton = document.getElementById("printButton");

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
dbReply = document.getElementsByClassName('CodeMirror')[0];
dbReply.style = {};
outputElm.style = {};
errorElm.style = {};

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
    noerror();
    if(isDb()) execute(editor.getValue() + ';');
}
function validate() {
    test();
    show(false);
    advance();
}
function giveup() {
    show(true);    
    if(isDb()) editor.setValue(getSolution());
    test();
    advance();
}
function getSolution() {
    if(question.getElementsByClassName("response").length!=0) {        
        return question.getElementsByClassName("response")[0].innerHTML;
    }
    return "";
}
function isText() {
    return question.classList.contains("text");
}
function isDb() {
    return !isText();
}
function hasResponse() {
    return question.getElementsByClassName("response").length!=0;
}
function show(cancel) {
    var response = (isText()) ? textReply.value : editor.getValue();
    if(hasResponse()) {        
        response += (cancel) ? "\n---- Dommage: ----\n" : "\n-----------\n( ";
        response += getSolution();
        response += (cancel) ? "" : " )";
    }    
    question.innerHTML += "<pre><code>" + response  + "</code></pre>";    
}

function advance() {
    el = question;
    el = el.nextElementSibling;
    while (el != null) {
        if (el.style != undefined) el.style.display = "";
        if (el.classList.contains("question")) {
            question = el;
            updateDisplay();
            return;
        }
        el = el.nextElementSibling;
    }
    question = null;
    updateDisplay();
}

function updateDisplay() {
    if(question == null) {
        textReply.style.display = "none";
        dbReply.style.display = "none";
        testButton.style.display = "none";
        validateButton.style.display = "none";
        cancelButton.style.display = "none";
        printButton.style.display = "";
    }
    if(isText()) {
        textReply.style.display = "block";
        dbReply.style.display = "none";
        testButton.style.display = "none";
        outputElm.style.display = "none";
        errorElm.style.display = "none";
        textReply.value = "";
    } else {
        textReply.style.display = "none";
        dbReply.style.display = "block";
        testButton.style.display = "";
        outputElm.style.display = "";
        errorElm.style.display = "";
    }
}


function updateContent() {
    var display = true;
    els = document.getElementById("content").childNodes;
    var nb = 0;
    for (el in els) {
        if (els[el].classList != undefined)
            if (els[el].classList.contains("question")) {
                nb++;
            }
    }
    var i = 1;
    for (el in els) {
        if (els[el].style == undefined) continue;
        if (!display) els[el].style.display = "none";
        if (els[el].classList.contains("question")) {
            if (display) {
                display = false;
                question = els[el];
                updateDisplay();
            }
            els[el].innerHTML = "<b>" + i + "/" + nb + " : </b>" + els[el].innerHTML;
            i++;
        }

    }
}

function loadHtml(htmlFile) {
    var xcontent = new XMLHttpRequest();
    xcontent.overrideMimeType("text/html");
    xcontent.open('GET', "TP/" + htmlFile + ".html", true);
    xcontent.onreadystatechange = function () {
        if (xcontent.readyState == 4 && xcontent.status == "200") {
            textElm.innerHTML = xcontent.responseText
            updateContent();
        }
    };
    xcontent.send(null);
}
function loadDb(dbFile) {
    var xdb = new XMLHttpRequest();
    xdb.overrideMimeType("text/sql");
    xdb.open('GET', "TP/" + dbFile + ".sql", true);
    xdb.onreadystatechange = function () {
        if (xdb.readyState == 4 && xdb.status == "200") {
            execute(xdb.responseText);
        }
    };
    xdb.send(null);
}

var regex = new RegExp('(\\?|&|^)html=(.*?)(&|$)');
var html = document.location.href.match(regex);
if (html != null) loadHtml(html[2]);
regex = new RegExp('(\\?|&|^)db=(.*?)(&|$)');
var db = document.location.href.match(regex);
if (db != null) loadDb(db[2]);  