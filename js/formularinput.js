'use strict';

// moved cause template.js
//document.addEventListener('DOMContentLoaded', function () {


    // click Event an Button anhängen







    // Bestellformular und Pizzaausswahl wird in eine Json Datei geschrieben


            function schreibe() {
				
                var timestamp = new Date(Date.now());

                var orderId = timestamp.getUTCFullYear().toString() + timestamp.getUTCMonth()+1 + timestamp.getDate() + timestamp.getHours() + timestamp.getMinutes() + timestamp.getSeconds();

                var firstname = document.getElementById('firstname').value;

                var lastname = document.getElementById('lastname').value;

                var name = firstname + " " + lastname;

                var street = document.getElementById('street').value;

                var nr = document.getElementById('nr').value;

                var postcode = document.getElementById('postcode').value;

                var town = document.getElementById('town').value;

                var phone = document.getElementById('phone').value;

                if(document.getElementById('bar').checked === true){
                    var zahlung = "Bar";
                }
                else if(document.getElementById('mc').checked === true){
                     zahlung = "Master Card";
                }
                else if(document.getElementById('vi').checked === true){
                     zahlung = "Visa";
                }
                else{
                     zahlung = "American Express";
                }


                var objcontact = {
                        name: name,
                        postcode: postcode,
                        street: street,
                        city: town,
                        nr: nr,
                        phone: phone,
                        zahlung: zahlung
                };

                // Delete menu and extras in sessionStorage after click Button 'kostenpföichtig bestellen.
                sessionStorage.removeItem('menu');
                sessionStorage.removeItem('extras');

			var bestellung = sessionStorage["bestellung"];
			bestellung = JSON.parse(bestellung);
			var pizzen = bestellung["items"];
			var total = bestellung["total"];
			
			if(firstname == "" || lastname == "" || postcode == "" || street == "" || town == "" || nr == "" || phone == ""){
				alert("Sie haben ein Formularfeld leer gelassen!");
			}
			else{
				if(total < 12) {
					
					alert("Mindestbestellwert von 12 Euro wurde nicht erreicht");
				
				}
				else {
					var dict = {};
					dict["id"] = orderId;
					dict["items"]=pizzen;
					dict["contact"]=objcontact;
					dict["total"]=total;
					var fertigesdict = {};
					fertigesdict["request"] = "newOrder";
					fertigesdict["jsonData"] = dict;

					printPDF(fertigesdict.jsonData);
					fertigesdict = JSON.stringify(fertigesdict);
					ordercheck(fertigesdict);
				}
			}
			}
			
// Bestellübersicht an Server und Antwort in SessionStorage
    function ordercheck(fertigesdict) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var orderready = this.responseText;
                writestorage(orderready);
            }
        };
		xhttp.open("POST", "https://localhost:8080", false);
        xhttp.send(fertigesdict);

    }

    function writestorage(orderready) {
		orderready = JSON.parse(orderready);
		var fertigebestellung = orderready["response_data"];
		fertigebestellung = JSON.stringify(fertigebestellung);
        sessionStorage.setItem('bestellung', fertigebestellung);
        location.href="https://localhost:8080/bestellbestaetigung.html";
    }
    function loeschen() {
        sessionStorage.removeItem("bestellung");
        location.href="https://localhost:8080/index.html";
    }
//});




