let body = document.getElementsByTagName('body')[0];
let sujet = document.getElementById('sujet');
let outputElm = document.getElementById('output');
let errorElm = document.getElementById('error');
let textReply = document.getElementById('textReply');
let dbReply = document.getElementById("dbReply");
let pyReply = document.getElementById("pyReply");
let textEditor = document.getElementById('textEditor');
let testButton = document.getElementById('testButton');
let cancelButton = document.getElementById("cancelButton");
let validateButton = document.getElementById("validateButton");
let printButton = document.getElementById("printButton");
let dbEditor = null;
let worker = null;
let question = null;
let pyProg = "";
let nbQuestion = 0;
let content = "";


// Les fonctions pour python
let initPyDone = false;
function initPy() {
    if (initPyDone) return;
    initPyDone = true;
    pyEditor = CodeMirror.fromTextArea(pyReply, {
        mode: 'text/x-python',
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
    pyReply = pyReply.nextElementSibling;
    pyReply.id = "pyEditor";
}

function readPy(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
function execPy(prog) {
    Sk.pre = "output";
    out("");
    Sk.configure({output: outAppend, read: readPy});
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'pycanvas';
    let myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function (mod) {
        noerror();
    },
            function (err) {
                error(err.toString());
            });
}

let initSqlDone = false;
function initSql() {
    if (initSqlDone) return;
    initSqlDone = true;
    dbEditor = CodeMirror.fromTextArea(dbReply, {
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
    worker = new Worker("worker.sql-wasm.js");
    worker.onerror = error;
    dbReply = dbReply.nextElementSibling;
    dbReply.id = "dbEditor";
}
function execSql(commands) {
    worker.onmessage = function (event) {
        let results = event.data.results;
        if (!results) {
            error(event.data.error);
            return;
        }
        out("");
        for (let i = 0; i < results.length; i++) {
            outputElm.appendChild(tableCreate(results[i].columns, results[i].values));
        }
    }
    worker.postMessage({action: 'exec', sql: commands});
    out("Je cherche...");
}

let tableCreate = function () {
    function valconcat(vals, tagName) {
        if (vals.length === 0)
            return '';
        let open = '<' + tagName + '>', close = '</' + tagName + '>';
        return open + vals.join(close + open) + close;
    }
    return function (columns, values) {
        let tbl = document.createElement('table');
        let html = '<thead>' + valconcat(columns, 'th') + '</thead>';
        let rows = values.map(function (v) {
            return valconcat(v, 'td');
        });
        html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
        tbl.innerHTML = html;
        return tbl;
    }
}();

function out(text) {
    outputElm.textContent = text;
}
function outAppend(text) {
    outputElm.textContent += text;
}
function error(text) {
    errorElm.textContent = text;
    out("Essaie encore...");
}
function noerror() {
    errorElm.textContent = "";
}
function test() {
    noerror();
    if (isDb()) execSql(dbEditor.getValue() + ';');
    else if (isPy()) execPy(pyProg + pyEditor.getValue());
}
function validate() {
    test();
    buildResponse(false);
    nextQuestion();
}
function giveup() {
    buildResponse(true);
    if (isDb()) dbEditor.setValue(getSolution());
    else if (isPy()) pyEditor.setValue(getSolution());
    test();
    nextQuestion();
}
function getSolution() {
    if (question.getElementsByClassName("response").length != 0) {
        return question.getElementsByClassName("response")[0].innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }
    return "";
}
function isDb() {
    return !isText() && !isPy(); // pour compatibilité ascendante
    //return question.classList.contains("db");
}
function isText() {
    if (question == null) return false;
    return question.classList.contains("text");
}
function isPy() {
    if (question == null) return false;
    return question.classList.contains("py");
}
function hasResponse() {
    return question.getElementsByClassName("response").length != 0;
}
function getResponse() {
    if (isText()) return textEditor.value;
    if (isDb()) return dbEditor.getValue();
    if (isPy()) return pyEditor.getValue();
    return "";
}
function buildResponse(cancel) {
    let response = getResponse();
    if (hasResponse()) {
        response += (cancel) ? "\n---- Dommage: ----\n" : "\n-----------\n( ";
        response += getSolution();
        response += (cancel) ? "" : " )";
    }
    question.innerHTML += "<pre><code>" + response + "</code></pre>";
}
function nextQuestion() {
    if (isPy()) pyProg += getResponse() + "\n";
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
    // Remove all classes from body
    body.className = "";
    // Then add one
    if (nbQuestion == 0) body.classList.add("db");
    else if (question == null) body.classList.add("empty");
    else if (isText()) body.classList.add("text");
    else if (isDb()) body.classList.add("sql");
    else if (isPy()) body.classList.add("py");
}

function initContent() {
    let display = true;
    nbQuestion = 0;
    els = sujet.childNodes;
    for (el in els) {
        if (els[el].classList != undefined)
            if (els[el].classList.contains("question")) {
                nbQuestion++;
            }
    }
    let i = 1;
    for (el in els) {
        if (els[el].style == undefined) continue;
        if (!display) els[el].style.display = "none";
        if (els[el].classList.contains("question")) {
            if (display) {
                display = false;
                question = els[el];
            }
            els[el].innerHTML = "<b>" + i + "/" + nbQuestion + " : </b>" + els[el].innerHTML;
            i++;
        }
    }
}

// Les fonctions de chargement de fichiers.
function reloadSqlFile() {
    execSql(db);
}
function openSqlFile(event) {
    let files = event.target.files;
    if (files.length == 0) return;
    let file = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        db = event.target.result;
        execSql(db);
    });
    reader.readAsText(file);
}
function reloadHtmlFile() {
    let start = document.getElementById("start");
    while (start.nextSibling != null)
        sujet.removeChild(start.nextSibling);
    sujet.innerHTML += content;
    initContent();
    updateDisplay();
}
function openHtmlFile(event) {
    let files = event.target.files;
    if (files.length == 0) return;
    let file = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        content = event.target.result;
        reloadHtmlFile();
    });
    reader.readAsText(file);
}

let loads = [];
function nextLoad() {
    if (loads.length != 0) {
        fileName = loads.shift();
        fileExtension = fileName.split('.').pop();
        switch (fileExtension) {
            case "py":
                loadPy(fileName);
                break;
            case "html":
                loadHtml(fileName);
                break;
            case "sql":
                loadDb(fileName);
                break;
            case "js":
                loadJs(fileName);
                break;
        }
    } else {
        initContent();
        if (db != null) {
            initSql();
            execSql(db);
        }
        if (py != null) {
            initPy();
        }
        updateDisplay();
    }
}
function load(fileName) {
    loads.push(fileName);
}
function loadJs(jsFile) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", jsFile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.text = xhr.responseText;
                document.body.appendChild(script);
                nextLoad();
            }
        }
    };
    xhr.send(null);
}
function loadHtml(htmlFile) {
    let xcontent = new XMLHttpRequest();
    xcontent.overrideMimeType("text/html");
    xcontent.open('GET', "TP/" + htmlFile, true);
    xcontent.onreadystatechange = function () {
        if (xcontent.readyState == 4 && xcontent.status == "200") {
            sujet.innerHTML = xcontent.responseText
            nextLoad();
        }
    };
    xcontent.send(null);
}
function loadDb(dbFile) {
    let xdb = new XMLHttpRequest();
    xdb.overrideMimeType("text/sql");
    xdb.open('GET', "TP/" + dbFile, true);
    xdb.onreadystatechange = function () {
        if (xdb.readyState == 4 && xdb.status == "200") {
            db = xdb.responseText;
            nextLoad();
        }
    };
    xdb.send(null);
}
function loadPy(pyFile) {
    let xdb = new XMLHttpRequest();
    xdb.overrideMimeType("text/python");
    xdb.open('GET', "TP/" + pyFile, true);
    xdb.onreadystatechange = function () {
        if (xdb.readyState == 4 && xdb.status == "200") {
            pyProg = xdb.responseText;
            nextLoad();
        }
    };
    xdb.send(null);
}

let regex = new RegExp('(\\?|&|^)html=(.*?)(&|$)');
let html = document.location.href.match(regex);
if (html != null) load(html[2] + ".html");
regex = new RegExp('(\\?|&|^)db=(.*?)(&|$)');
let db = document.location.href.match(regex);
if (db != null) {
    load("codemirror.js");
    load("sql-mode.js");
    if (db[2] != "") load(db[2] + ".sql");
}
regex = new RegExp('(\\?|&|^)py=(.*?)(&|$)');
let py = document.location.href.match(regex);
if (py != null) {
    load("codemirror.js");
    load("python-mode.js");
    load("skulpt.min.js");
    load("skulpt-stdlib.js");
    if (py[2] != "") load(py[2] + ".py");
}

nextLoad();