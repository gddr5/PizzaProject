    //get menu from server
function loadMenuJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://localhost:8080/json/menu.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 //get extras menu from server
 function loadExtrasJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://localhost:8080/json/extras.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
    
//save menus in sessionStorage (using above functions)
function saveMenu (json) {
    loadMenuJSON(function(response) {
        var menuJsonString = response;
        sessionStorage.setItem('menu', menuJsonString);
        });
    loadExtrasJSON(function(response) {
        var extrasJsonString = response;
        sessionStorage.setItem('extras', extrasJsonString);
        });
}

//check, if menu is already saved to sessionStorage
function controll () {
 
    if ( sessionStorage.getItem('menu') == null ) {
        saveMenu();
    }
 
}

//detect chosen pizza with size, amount etc and add to bestellung which is saved in sessionStorage
function pizzaWahl ( x ) {
    var menu  = JSON.parse(sessionStorage.getItem('menu'));
    var allExtras = JSON.parse(sessionStorage.getItem('extras'));
    var chosenPizza = menu[x];
    var name = chosenPizza['name'];
    var sizePickerName = 'size' + x; //variable for the name of the selectPicker belonging to chosen Pizza
    var chosenSize = document.getElementById(sizePickerName).value;
    var sizeId = 0;
    for (var i = 0; i < chosenPizza['sizes'].length; i++) {
        if (chosenSize == chosenPizza['sizes'][i]) {
            sizeId = i;
        }
    }
    //var sizeId = document.getElementById(sizePickerName).value;
    var size = chosenPizza['sizes'][sizeId];
    var amountPickerName = 'amount' + x;
    var amount = document.getElementById(amountPickerName).value;
    var pizzaPrices = chosenPizza['prices'];
    var pizzaPrice = pizzaPrices[sizeId];
    console.log(pizzaPrices);
    console.log(sizeId);
    var extras = [];
    var possibleExtras = chosenPizza['extras'];
    // loop through available extras
    for ( var i = 0; i<possibleExtras.length; i++) {
        if ( document.getElementById(i) != null ) {
            if ( document.getElementById(i).checked == true ) {
                extras.push(i);
            }
        }
    }
    var extrasPrice = 0;
    for (var i = 0; i<allExtras.lenght; i++) {
        for (var j = 0; j<extras.length; j++) {
            if ( allExtras[i] == extras[j]) {
                extrasPrice += allExtras[i][price];
                console.log(extrasPrice);
            }
        }
    }
    var price = pizzaPrice + extrasPrice;
    console.log(price); 
    var newPizza = {name:name, extras:extras, size:size, count:amount, price:price};
    var pizzaArray = [];
    var oldTotal;
    if (sessionStorage.getItem('bestellung') == null) {
        pizzaArray.push(newPizza);
        var oldTotal = 0;
    } else {
        var oldBestellung = JSON.parse(sessionStorage.getItem('bestellung'));
        //var oldPizzaArray = oldBestellung['items'];
        pizzaArray = oldBestellung['items'];
        pizzaArray.push(newPizza);
        var oldTotal = oldBestellung['total'];
    }
    var total = oldTotal + ((pizzaPrice + 0)*amount);
    var bestellung = JSON.stringify({items:pizzaArray, total:total});
    sessionStorage.setItem('bestellung', bestellung);
}

function bestellen () {
    sessionStorage.removeItem('menu');
    sessionStorage.removeItem('extras');
    location.href="https://localhost:8080/orderoverview.html";
}