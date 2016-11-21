var ws = new WebSocket("ws://127.0.0.1:9000/websocket");

console.log(ws);

ws.onmessage = function (event) {
    onMessage(event);
};
ws.onopen = function (event) {
    logTextToConsole('CONNECTED');
};
ws.onerror = function (event) {
    onError(event)
};

var send = function () {
    var text = document.getElementById("wsInput").value;
    console.log(text);
    ws.send(text);
    logTextToConsole(text);
};

function logTextToConsole(text) {
    var span = document.createTextNode(text);
    logElementToConsole(span);
}


function logElementToConsole(element) {
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(element);

    document.getElementById('wsHistory').appendChild(p);

}

function onMessage(evt) {
    var span = document.createElement('span');
    span.style.wordWrap = 'break-word';
    span.style.color = 'blue';
    span.innerHTML = 'RECEIVED: ';

    var message = document.createTextNode(evt.data);
    span.appendChild(message);

    logElementToConsole(span);
}

function onError(evt) {
    logErrorToConsole('ERROR', evt.data);
}

function clearLog() {
    while (document.getElementById('wsHistory').childNodes.length > 0) {
        document.getElementById('wsHistory').removeChild(document.getElementById('wsHistory').lastChild);
    }
}
