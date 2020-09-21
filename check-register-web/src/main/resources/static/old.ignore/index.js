setTimeout(doShit, 2500);
let dotstuff = setInterval(dots, 500);

function doShit(){
    document.getElementById('bullshit').appendChild(document.createElement('p').appendChild(document.createTextNode("javascript is working")));
}

function dots(){
    document.getElementById('bullshit').appendChild(document.createTextNode('.'));
}

let btn = document.createElement("button");
btn.appendChild(document.createTextNode("Stop Dots"));
btn.addEventListener("click", stopThisShit);
document.getElementById('bullshit').appendChild(btn);

function stopThisShit(){
    clearInterval(dotstuff);
}




let killBtn = document.createElement("button");
killBtn.appendChild(document.createTextNode("Kill Da Server"));
killBtn.addEventListener("click", killProgram);
document.getElementById('bullshit').appendChild(killBtn);


function killProgram(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/kill',true);
    xhr.send();
}

let printBtn = document.createElement("button");
printBtn.appendChild(document.createTextNode("Print in Server"));
printBtn.addEventListener("click", printConsoleStuff);
document.getElementById('bullshit').appendChild(printBtn);

function printConsoleStuff(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/print', true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            const response = JSON.parse(xhr.response);
            console.log((response.contents));
            document.getElementById('bullshit').appendChild(document.createTextNode(response.contents));
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    const send = {
        contents: "Printing by web request"
    };
    console.log(JSON.stringify(send));

    xhr.send(JSON.stringify(send));
}

let checkBtn = document.createElement("button");
checkBtn.appendChild(document.createTextNode("Get Check From Server"));
checkBtn.addEventListener("click", getCheck);
document.getElementById('bullshit').appendChild(checkBtn);

let lastCheck = null;

function getCheck(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/check', true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            const response = JSON.parse(xhr.response);
            lastCheck = response;
            console.log(response);
            const str = response.transactionName + ' | ' + response.memo + ' | ' + response.payment.symbol + response.payment.value + ' | ' + response.payment.symbol + response.deposit.value;
            document.getElementById('bullshit').appendChild(document.createElement('p'));
            document.getElementById('bullshit').appendChild(document.createTextNode(str));
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

let updateCheckBtn = document.createElement('button');
updateCheckBtn.appendChild(document.createTextNode('Update Check'));
updateCheckBtn.addEventListener('click', updateCheck);
document.getElementById('bullshit').appendChild(updateCheckBtn);

function updateCheck(){
    if(lastCheck !== null){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/updateCheck', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        lastCheck.transactionName = lastCheck.transactionName + "Updated";
        console.log(JSON.stringify(lastCheck));
        xhr.send(JSON.stringify(lastCheck));
    }
}

let getAccountBtn = document.createElement('button');
getAccountBtn.appendChild(document.createTextNode('Get Account Test'));
getAccountBtn.addEventListener('click', getAccount);
document.getElementById('bullshit').appendChild(getAccountBtn);

function getAccount(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/account/23', true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            console.log(xhr.response);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

let getBookSummaryBtn = document.createElement('button');
getBookSummaryBtn.appendChild(document.createTextNode("Get Book Summary"));
getBookSummaryBtn.addEventListener('click', getSummary);
document.getElementById('bullshit').appendChild(getBookSummaryBtn);

function getSummary(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/summary/0', true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            console.log("Summary Object");
            console.log(xhr.response);
            console.log(JSON.parse(xhr.response));
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}