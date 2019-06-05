localStorage.clear();
let dateNow2 = new Date();
let dateToday2 = dateNow2.getFullYear() + '-' + ("0" + (dateNow2.getMonth() + 1)).slice(-2) + '-' + ("0" + dateNow2.getDate()).slice(-2);

document.getElementById("date1").max = dateToday2;
document.getElementById("date2").max = dateToday2;


function checkSubmit2(e) {
    let inputDate = document.getElementById("date1").value;
    getXml2(inputDate);

    document.getElementById("date2").min = inputDate;
}

function checkSubmit3(e) {
    let inputDate2 = document.getElementById("date2").value;
    document.getElementById("date1").max = inputDate2;
    getXml3(inputDate2);

}

let form2 = document.forms["form2"];
form2.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputCurrency = document.getElementById("selectedCurrency2").value
    let inputDate1 = document.getElementById("date1").value
    let inputDate2 = document.getElementById("date2").value
    console.log(inputDate1);
    console.log(inputDate2);
    console.log(inputCurrency);
    let jsonObj2 = JSON.parse(localStorage.getItem("jsonObj2"));

    let x2js = new X2JS();
    let xmlDoc1 = x2js.json2xml(jsonObj2);

    let jsonObj3 = JSON.parse(localStorage.getItem("jsonObj3"));
    let xmlDoc2 = x2js.json2xml(jsonObj3);

    let sumOfFxRt2 = Number(localStorage.getItem('sumOfFxRt2'));
    let sumOfFxRt3 = Number(localStorage.getItem('sumOfFxRt3'));

    getRateOfCurency2(xmlDoc1, sumOfFxRt2, inputCurrency);
    getRateOfCurency3(xmlDoc2, sumOfFxRt3, inputCurrency);

    printResult(inputDate1, inputDate2, inputCurrency);

})


function printResult(inputDate1, inputDate2, inputCurrency) {
    let amt1 = Number(localStorage.getItem('amt1'));
    let amt2 = Number(localStorage.getItem('amt2'));
    let date1 = localStorage.getItem('dt1');
    let date2 = localStorage.getItem('dt2');
    console.log(amt1 + " pirmas amt");
    console.log(amt2 + " antras amt");

    console.log(date1 + " pirma data");
    console.log(date2 + " antra data");


    if (amt1 > amt2) {
        console.log("Valiutos kursas sumažėjo : -" + (amt1 - amt2).toFixed(4) + " " + inputCurrency + " Euro atžvilgiu.");
        document.getElementById("inputeResult").innerHTML = "<h4> Valiutos kursas sumažėjo : <b>" + (amt1 - amt2).toFixed(4) + " </b> " + inputCurrency + " Euro atžvilgiu.</h4>"

        console.log("Valiutos - " + inputCurrency + " kursai: " + date1 + ": "+ amt1 + "  " + date2 + ": " + amt2+ ".");
        document.getElementById("inputeResultCurrency").innerHTML = "<h4> Valiutos - <b>"+ inputCurrency + "</b> kursai: " + date1 + ": <b>"+ amt1 + "</b>;   " + date2 + ": <b>" + amt2+ "</b>.";

    } else if (amt1 < amt2) {
        console.log("Valiutos kursas padidėjo: " + (amt2 - amt1).toFixed(4) + " " + inputCurrency + " Euro atžvilgiu.");
        document.getElementById("inputeResult").innerHTML = "<h4> Valiutos kursas padidėjo : <b>" + (amt2 - amt1).toFixed(4) + " </b> " + inputCurrency + " Euro atžvilgiu.</h4>"

       console.log("Valiutos - " + inputCurrency + " kursai: " + date1 + ": "+ amt1 + "  " + date2 + ": " + amt2+ ".");
        document.getElementById("inputeResultCurrency").innerHTML = "<h4> Valiutos - <b>"+ inputCurrency + "</b> kursai: " + date1 + ": <b>"+ amt1 + "</b>;  " + date2 + ": <b>" + amt2+ "</b>.";
    } else {
        console.log("Valiutos kursas liko nepakitęs ir yra lygus: " + amt1 + " " + inputCurrency + " Euro atžvilgiu.");
        document.getElementById("inputeResult").innerHTML = "<h4> Valiutos kursas liko nepakitęs ir yra lygus: <b>" + amt1 + " </b> " + inputCurrency + " Euro atžvilgiu.</h4>"
        document.getElementById("inputeResultCurrency").innerHTML = "";
    }
    checkInterval(date1, date2, inputDate1, inputDate2);
}


function getXml2(inputDate) {
    let dt = inputDate;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let xmlDoc = xhttp.responseXML;
            let sumOfFxRt2 = sumOfFxRate(xmlDoc);

            localStorage.setItem("sumOfFxRt2", sumOfFxRt2);
            setProgessBar2(sumOfFxRt2);
            let x2js = new X2JS();
            let jsonObj2 = x2js.xml2json(xmlDoc);
            localStorage.setItem("jsonObj2", JSON.stringify(jsonObj2));
            checkCcySizeInXml();
        }
    };
    let proxyForCors = "https://cors-anywhere.herokuapp.com/";
    let url = proxyForCors + "http://old.lb.lt/webservices/fxrates/FxRates.asmx/getFxRates?tp=EU&dt=" + dt;
    xhttp.open("GET", url, true);
    xhttp.send();
}


function getXml3(inputDate2) {
    let dt = inputDate2;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let xmlDoc2 = xhttp.responseXML;
            let sumOfFxRt3 = sumOfFxRate(xmlDoc2);

            localStorage.setItem("sumOfFxRt3", sumOfFxRt3);
            setProgessBar3(sumOfFxRt3);
            let x2js = new X2JS();
            let jsonObj3 = x2js.xml2json(xmlDoc2);
            localStorage.setItem("jsonObj3", JSON.stringify(jsonObj3));
            checkCcySizeInXml();
        }
    };

    let proxyForCors = "https://cors-anywhere.herokuapp.com/";
    let url = proxyForCors + "http://old.lb.lt/webservices/fxrates/FxRates.asmx/getFxRates?tp=EU&dt=" + dt;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function checkCcySizeInXml() {
    let jsonObj2 = JSON.parse(localStorage.getItem("jsonObj2"));
    let x2js = new X2JS();
    let xmlDoc1 = x2js.json2xml(jsonObj2);

    let sumOfFxRt2 = Number(localStorage.getItem('sumOfFxRt2'));



    let jsonObj3 = JSON.parse(localStorage.getItem("jsonObj3"));
    let xmlDoc2 = x2js.json2xml(jsonObj3);

    let sumOfFxRt3 = Number(localStorage.getItem('sumOfFxRt3'));

    if ((sumOfFxRt2 === 0) || (sumOfFxRt3 === 0)) {} else {
        if (sumOfFxRt2 < sumOfFxRt3) {
            getAllCcyOfxml2(xmlDoc1, sumOfFxRt2, sumOfFxRt3);
        } else {
            getAllCcyOfxml2(xmlDoc2, sumOfFxRt3, sumOfFxRt2);
        }
    }
}

function getAllCcyOfxml2(xmlDoc, sumOfFxRt2, sumOfFxRt3) {
    let currencys2 = [];
    clearSelectOption2();
    for (let i = 1; i <= ((sumOfFxRt2 * 2));
        (i += 2)) {

        let ccy = xmlDoc.getElementsByTagName("Ccy")[i].childNodes[0].nodeValue;
        currencys2.push(ccy);
    }
    for (let a = 0; a < currencys2.length; a++) {
        let x = document.createElement("option");

        x.setAttribute("value", currencys2[a]);
        let t = document.createTextNode(currencys2[a]);

        x.appendChild(t);
        document.getElementById("selectedCurrency2").appendChild(x);
    }

    if (sumOfFxRt2 < sumOfFxRt3) {
        setProgessBar4(sumOfFxRt2);
    } else {
        setProgessBar4(sumOfFxRt3);
    }
}

function clearSelectOption2() {
    let selectElement2 = document.getElementById('selectedCurrency2');
    selectElement2.innerHTML = '';
}

function setProgessBar2(sumOfFxRt2) {
    let setNew2 = document.getElementById("progressBar2");
    let width = 1;
    let width2 = 1;
    setInterval(frame2, 7);

    function frame2() {

        if (width >= 100) {
            // clearInterval(id);
        } else {
            width++;
            setNew2.style.width = width + '%';

            if (width2 >= sumOfFxRt2) {} else {
                width2++;
                setNew2.innerHTML = width2 + ' valiutos prieinamos';
            }
        }
    }
}

function setProgessBar3(sumOfFxRt3) {

    let setNew3 = document.getElementById("progressBar3");
    let width4 = 1;
    let width5 = 1;
    frame3();

    function frame3() {
        while (width4 < 100) {
            width4++;
            setNew3.style.width = width4 + '%';

            if (width5 >= sumOfFxRt3) {} else {
                width5++;
                setNew3.innerHTML = width5 + ' valiutos prieinamos';
            }
        }
    }
}

function setProgessBar4(minSumOfFxRt) {
    let setNew4 = document.getElementById("progressBar4");
    let width7 = 1;
    let width8 = 1;
    setInterval(fillProgressBar, 370);

    function fillProgressBar() {

        while (width7 < 100) {
            width7++;
            setNew4.style.width = width7 + '%';
            if (width8 >= minSumOfFxRt) {} else {
                width8++;
                setNew4.innerHTML = width8 + ' viso prieinamos valiutos ';
            }
        }

    }
}

function sumOfFxRate(xmlDoc) {

    let allFxRates = xmlDoc.getElementsByTagName('FxRate'),
        amountOfNodes = allFxRates.length;
    return (amountOfNodes);

}

function getRateOfCurency2(xmlDoc, sumOfFxRt, inputCurrency, inputDate) {
    for (let j = 1; j <= (sumOfFxRt * 2);
        (j += 2)) {
        let ccy = xmlDoc.getElementsByTagName("Ccy")[j].childNodes[0].nodeValue;

        if (ccy == inputCurrency.toUpperCase()) {
            let amt = xmlDoc.getElementsByTagName("Amt")[j].childNodes[0].nodeValue;
            localStorage.setItem("amt1", amt);

            let dividedAndRoundedIndex = Math.round((j /= 2));
            let dt = xmlDoc.getElementsByTagName("Dt")[dividedAndRoundedIndex - 1].childNodes[0].nodeValue;
            localStorage.setItem("dt1", dt);
            checkDate(dt, inputDate);
            break;
        }
    }
}

function getRateOfCurency3(xmlDoc, sumOfFxRt, inputCurrency) {

    for (let j = 1; j <= (sumOfFxRt * 2);
        (j += 2)) {
        let ccy = xmlDoc.getElementsByTagName("Ccy")[j].childNodes[0].nodeValue;

        if (ccy == inputCurrency.toUpperCase()) {
            let amt2 = xmlDoc.getElementsByTagName("Amt")[j].childNodes[0].nodeValue;
            localStorage.setItem("amt2", amt2);
            let dividedAndRoundedIndex = Math.round((j /= 2));
            let dt2 = xmlDoc.getElementsByTagName("Dt")[dividedAndRoundedIndex - 1].childNodes[0].nodeValue;
            localStorage.setItem("dt2", dt2);

            break;
        }
    }
}


function checkInterval(date1, date2, inputDate1, inputDate2) {

    if ((date1 === inputDate1) && (date2 === inputDate2)) {
        document.getElementById("inputeDate1").innerHTML = "<h6>Įvestas intervalas: " + inputDate1 + " - " + inputDate2 + ".<h6>";

    } else {
        document.getElementById("inputeDate1").innerHTML = " <h5>Jūsų nurodytam intervalui : <b>" + inputDate1 + " - " + date2 + "</b> duomenų nėra (Savaitgalis, švenčių diena arba dar šios dienos duomenys nepateikti. <br> Yra anksčiausi duomenys šiam intervalui - <b>" + date1 + " - " + date2 + "</b>. </h5>";

    }
}
