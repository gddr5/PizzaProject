/* [T] Template System
version: 1.0
Important:   The Template System requires jQuery to load files. The pages has to be accessed with a server.
Description: Template System is managing the main websites parts. The navigation and the other main sites are gonna
             be inserted via jQuery load function. Every template site is located in the template/ folder. Each element
             can be loaded and manipulated via javascript.
             It is also been used to manage the links. Each link refering to another own site can be inserted via js.
*/

/* [T] Config */
/* URL Links 
   These variables contain the filepath of the different websites. Those will be used to mainpulate links in the template to
   refere to the correct page. (This means if sitename/filename changes, you only have change these variables.)*/
// Cart site filepath
var CART_URL    = "cart.html";
// Profile site filepath
var PROFILE_URL = "user.html";
// Opening Hours site filepath
var HOURS_URL   = "hours.html";
// Menu site filepath
var MENU_URL    = "menu.html";
// Ordering site filepath
var ORDER_URL   = "order.html";
// Login site filepath
var LOGIN_URL   = "index.html";
// Register site filepath
var REGISTER_URL= "reg.html";


/* Template Directory Path
   The direcotry where every template file is located*/
var TemplatePath = "template/";

/* HTML ID's
   The Gloabal HTML IDs that are necessary for the template system to run
   IMPORTANT: These are the jQuery ID names (these contain "#" at the beginning)*/
// Preloader ID
var PreloaderID = "#t_preloader";
// Popup ID
var popupID = "#t_popup";
// navigation ID
var navigationID = "#t_navigation";
// Main wrapper ID
var MainID = "#main";


/* [T] Main Template Function */
/* Template Main Function
   On every site this function has to be called to let the Template System work.
   At the pageload it will manage the site.
   If you want to run a specific website you have to add the page name as a string. Otherwise leave the parameter clear.*/
function template(page) {
    window.onload = function () {
        
        // Page names that gonna execute certain template functions
        switch(page){
            case "login":
                // Login site
                t_login();
                break;
            case "register":
                // Register site
                t_register();
                break;
            case "users":
                // User site
				t_users();
				break;
            
            // every other page if nothing is called
            case undefined:
            case "":
            case null:
                break;
            default:
                break;
        }
        
        // main functions that goning to be exectuted if the template system is called.
        // adds the navigation
        t_navigation();
        // adds the popup template
        t_popup();
        // hides the preloader
        hidepreloader();
        
    }
}

/* [T] Preloader Template */
// show the preloader
function showpreloader(){
    $(PreloaderID).fadeIn();
}

//hide the preloader
function hidepreloader(){
   setTimeout(function (){
       $(PreloaderID).fadeOut();
   }, 1400);
}


/* [T] Popup Template 
   This will create a hidden popup div to the page so the popup() function can be called.*/
function t_popup() {
    // Filename of the Popup Template
    var PopupFile = "popup.html";
    
    $(popupID).load(TemplatePath + PopupFile);
}


/* [T] Navigation Template */
function t_navigation() {
    // Filename of the Naviagtion Template
    var NavigationFile = "navigation.html";
    
    $(navigationID).load(TemplatePath + NavigationFile, function () {
        var orderradius = document.getElementById("orderradius");
        var hours = document.getElementById("hours");
        var state = document.getElementById("state");
        var cart = document.getElementById("cart");
        
        // inserts the page links into the navigation
        orderradius.href = ORDER_URL;
        hours.href = HOURS_URL;
        state.href = LOGIN_URL;
        cart.href = CART_URL;
        
        // CHANGE LATER (insert the correct local and session Storage)
        // if the user is logged in show the Profile name
        if (true) {
            state.innerText = "Dummy Data"; //sessionStorage.getItem('name');
            state.href = PROFILE_URL;
        }
        
        // CHANGE LATER (insert the correct local and session Storage)
        // if the localstorage of the cart exists, show the item amount
        if(true){
            var amount = 0; // cart local Storage
            cart.innerText = amount + " | Warenkorb";
        }
        
    });
}


/* [T] Login Template */
function t_login(){
    // Filename of the Login Template
    var LoginFile = "login.html";

    $(MainID).load(TemplatePath + LoginFile, function (){
        // changes the register link in the template
        document.getElementById("t_link_register").href = REGISTER_URL;
    });
}

/* [T] Register Template */
function t_register(){
    // Filename of the Register Template
    var Registerile = "register.html";

    $(MainID).load(TemplatePath + Registerile, function (){
        // changes the login link in the template
        document.getElementById("t_link_login").href = LOGIN_URL;
    });
}

/* [T] User site Template */
function t_users(){
    // Filename of the User site Template
    var Registerile = "users.html";

    $(MainID).load(TemplatePath + Registerile, function (){
		for(var j = 0; j < 2; j++){
				
			for(var i = 0; i < 3; i++){
				var y = $("<div>").load(TemplatePath + "bestellhistorieTemplate.html", function (){
					document.getElementById("anzahl").innerText = "3" + "x";
					document.getElementById("art").innerText = "dummyPizza";
					document.getElementById("anzahl").id = "anzahl" + j + "" + i;
					document.getElementById("art").id = "art" + j + "" + i;
					document.getElementById("groesse").id = "groesse" + j + "" + i;
					document.getElementById("extra").id = "extra" + j + "" + i;
				});
				$("#bestellverlauf").append(y);
			}
			
			var y = $("<div>").load(TemplatePath + "nochmalBestellenTemplate.html");
			$("#bestellverlauf").append(y);
		}
       // document.getElementById("t_link_login").href = LOGIN_URL;
    });
}