
/**
 * 
 * user defined
 * function
 */
var myNamespace = {};

function currencyConv(number1, number2) {
    let res = number2 / number1;
    res = myNamespace.round(res, 4);
    return res;
}


myNamespace.round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;

};




/**
 * 
 * perform on window load
 */

window.onload = function() {
    document.querySelector("#input-curr").focus();
    var givencurr1 = document.getElementById("given-curr1");
    var givencurr2 = document.getElementById("given-curr2");
    var givencurr = "";

    for (var i = 0; i < 2; i++) {
        if (i == 0) {
            givencurr = givencurr1;
        } else if (i == 1) {
            givencurr = givencurr2;
        }

        var x = document.createElement("option");
        x.innerHTML = "--data-arriving--";
        x.className = "o1"
        givencurr.appendChild(x);
        document.getElementsByClassName('o1')[i].disabled = true;
    }









    /**this is fetching asynchrounsly currency data 
     * 
     * 
     */
    if (!localStorage.getItem("CURRENCY")) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && this.status == 200) {
                var x = JSON.parse(this.responseText);


                function loops(obj) {
                    var result = [];
                    for (var key in obj) {

                        if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                            result.push(loops(obj[key]));
                        } else {
                            result.push(obj[key]);
                        }


                    }
                    return result;
                }

                result = loops(x);
                window.localStorage.setItem("CURRENCY", JSON.stringify(result));
                fill(givencurr1, givencurr2);
             
                

            }
        }


        xhttp.open('GET', 'http://www.floatrates.com/daily/usd.json', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();

    } else {
        fill(givencurr1, givencurr2);
    }

}






/**
 * polluting DOM starts here....
 */

function fill(givencurr1, givencurr2) {

    var getItem = JSON.parse(localStorage.getItem("CURRENCY"));
    getItem.forEach(function(data, index) {
        
        let x = document.createElement("option");
        let y = document.createElement("option");
        y.className = x.className = "data";
        x.id = index;
        y.id = index + "c";
        x.value = data[4];
        y.value = data[4];
        y.innerHTML = x.innerHTML = data[3];
        givencurr1.appendChild(x);
        givencurr2.appendChild(y);

    });
}





/**
 * Textbox event 
 * triggers
 * here
 */


var x = document.querySelector("#input-curr");
var y = document.querySelector("#output-curr");
var c1 = document.getElementById("given-curr1");
var c2 = document.getElementById("given-curr2");

x.onkeyup = selectionArea;

function selectionArea(e) {
    if (x.value.length > 0)
        y.disabled = "";
    window.onclick = function(e) {
        if(e.target.id == "body")
        {
            y.disabled = true;
        }
    }

};

document.getElementById("convertbtn").onclick = calculate;

function calculate() {
    let a = c1.options[c1.selectedIndex].value;
    let b =  c2.options[c2.selectedIndex].value;
    
    if (x.value.length > 0 && a!="--data-arriving--" && b!="--data-arriving--" ) 
    {
        let res = currencyConv(a , b);
        res *= x.value;
        y.value = res;
    } 
    else 
    {
        alert(" Please provide the required input! ");
    }


}