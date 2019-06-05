const app = document.getElementById('rootImg');

const logo = document.createElement('img');
logo.src = 'img/valiutu-kursai-bankuose.jpg';

logo.setAttribute('width', '85%');
logo.setAttribute('height', '300px');
app.appendChild(logo);


let dateNow = new Date();
let dateToday = dateNow.getFullYear() + '-' + ("0" + (dateNow.getMonth() + 1)).slice(-2) + '-' + ("0" + dateNow.getDate());
let year = dateNow.getFullYear();
document.getElementById("year").innerHTML = "<h6>" + year + " m.<h6>";
document.getElementById("date").max = dateToday;


function checkSubmit(e) {
    let inputDate = document.getElementById("date").value;
    let xmlDoc = getXml(inputDate);
}



let btn = document.getElementById("show");
btn.addEventListener("click", function () {
    if ((document.getElementById("form11").style.display == 'none') && (document.getElementById("form22").style.display == 'inline')) {
        document.getElementById("form11").style.display = 'inline';
        document.getElementById("form22").style.display = 'none';
        document.getElementById("inputeResult").innerHTML = "";
        document.getElementById("inputeDate1").innerHTML = "";
        document.getElementById("inputeResultCurrency").innerHTML = "";
        inputeResultCurrency
    } else if (document.getElementById("form11").style.display == 'none') {
        document.getElementById("form11").style.display = 'inline';
    } else {
        document.getElementById("form11").style.display = 'none';
        document.getElementById("inputeResult").innerHTML = "";
        document.getElementById("inputeDate1").innerHTML = "";
        document.getElementById("inputeResultCurrency").innerHTML = "";
    }
})


let btn2 = document.getElementById("show2");
btn2.addEventListener("click", function () {
    if ((document.getElementById("form22").style.display == 'none') && (document.getElementById("form11").style.display == 'inline')) {
        document.getElementById("inputeResult").innerHTML = "";
        document.getElementById("inputeDate1").innerHTML = "";
        document.getElementById("inputeResultCurrency").innerHTML = "";
        document.getElementById("form11").style.display = 'none';
        document.getElementById("form22").style.display = 'inline';
    } else if (document.getElementById("form22").style.display == 'none') {
        document.getElementById("form22").style.display = 'inline';

    } else {
        document.getElementById("form22").style.display = 'none';
        document.getElementById("inputeResult").innerHTML = "";
        document.getElementById("inputeDate1").innerHTML = "";
        document.getElementById("inputeResultCurrency").innerHTML = "";
    }
})


let form = document.forms["form1"];
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputCurrency = document.getElementById("selectedCurrency").value
    let inputDate = document.getElementById("date").value

    let jsonObj = JSON.parse(localStorage.getItem("jsonObj"));
    let x2js = new X2JS();
    let xmlDoc = x2js.json2xml(jsonObj);

    let sumOfFxRt = localStorage.getItem('sumOfFxRt');

    getRateOfCurency(xmlDoc, sumOfFxRt, inputCurrency, inputDate);
})

function getXml(inputDate) {
    let dt = inputDate;
    let xhttp = new XMLHttpRequest();
    console.log(inputDate);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let xmlDoc = xhttp.responseXML;
            let sumOfFxRt = sumOfFxRate(xmlDoc);
            getAllCcyOfxml(xmlDoc, sumOfFxRt);
            localStorage.setItem("sumOfFxRt", sumOfFxRt);

            let x2js = new X2JS();
            let jsonObj = x2js.xml2json(xmlDoc);

            localStorage.setItem("jsonObj", JSON.stringify(jsonObj));
        }
    };

    let proxyForCors = "https://cors-anywhere.herokuapp.com/";
    let url = proxyForCors + "http://old.lb.lt/webservices/fxrates/FxRates.asmx/getFxRates?tp=EU&dt=" + dt;
    xhttp.open("GET", url, true);
    xhttp.send();
}


function getAllCcyOfxml(xmlDoc, sumOfFxRt) {
    let currencys = [];
    clearSelectOption();
    for (let i = 1; i <= ((sumOfFxRt * 2));
        (i += 2)) {

        let ccy = xmlDoc.getElementsByTagName("Ccy")[i].childNodes[0].nodeValue;
        currencys.push(ccy);
    }

    for (let a = 0; a < currencys.length; a++) {
        let x = document.createElement("option");

        x.setAttribute("value", currencys[a]);
        let t = document.createTextNode(currencys[a]);

        x.appendChild(t);
        document.getElementById("selectedCurrency").appendChild(x);
    }
    setProgessBar(sumOfFxRt);
}

function clearSelectOption() {
    let selectElement = document.getElementById('selectedCurrency');
    selectElement.innerHTML = '';
}

function setProgessBar(sumOfFxRt) {
    let setNew = document.getElementById("progressBar1");
    let width = 1;
    let width2 = 1;
    let id = setInterval(frame, 5);

    function frame() {
        if (width >= 100) {
            // clearInterval(id);
        } else {
            width++;
            setNew.style.width = width + '%';

            if (width2 >= sumOfFxRt) {} else {
                width2++;
                setNew.innerHTML = width2 + ' valiutos prieinamos';
            }
        }
    }
}

function sumOfFxRate(xmlDoc) {

    let allFxRates = xmlDoc.getElementsByTagName('FxRate'),
        amountOfNodes = allFxRates.length;
    return (amountOfNodes);

}

function getRateOfCurency(xmlDoc, sumOfFxRt, inputCurrency, inputDate) {
    for (let j = 1; j <= (sumOfFxRt * 2);
        (j += 2)) {

        let ccy = xmlDoc.getElementsByTagName("Ccy")[j].childNodes[0].nodeValue;

        if (ccy == inputCurrency.toUpperCase()) {
            let amt = xmlDoc.getElementsByTagName("Amt")[j].childNodes[0].nodeValue;
            console.log(amt);

            let dividedAndRoundedIndex = Math.round((j /= 2));
            let dt = xmlDoc.getElementsByTagName("Dt")[dividedAndRoundedIndex - 1].childNodes[0].nodeValue;

            checkDate(dt, inputDate);
            document.getElementById("inputeResult").innerHTML = "<h4> Valiutos: <b>" + ccy + "</b> kursas: <b>" + amt + "</b> už vierną eurą.</h4>"
            break;
        }
    }
}

function checkDate(findedDate, inputDate) {
    if (findedDate === inputDate) {
        document.getElementById("inputeDate1").innerHTML = "<h6>Įvesta data: " + inputDate + ".<h6>";

    } else {
        document.getElementById("inputeDate1").innerHTML = " <h5>Jūsų nurodytai datai: <b>" + inputDate + "</b> duomenų nėra (Savaitgalis, švenčių diena arba dar šios dienos duomenys nepateikti. <br> Yra anksčiausi duomenys šiai datai - <b>" + findedDate + "</b>. </h5>";

    }
}
