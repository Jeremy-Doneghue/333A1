var user = {};
var fullStockList = {};

/**
 * Returns whether the user us logged in or not
 */
function userLoggedIn() {
    if (Object.keys(user).length === 0 && user.constructor === Object) {
        return false;
    }
    return true;
}

function setUser(jsonString) {
    user = Object.assign(user, JSON.parse(jsonString));
    retrieveFullStockList();
    rvc.render();
}

function logOut(){
    user = {};
    rvc.render();
}

/**
 * Retrieve a full list of stocks in json format
 */
function retrieveFullStockList() {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            //console.log(this.responseText);
            console.log(JSON.stringify(JSON.parse(this.responseText), null, 2));
        }
    };
    ajax.open("GET", `php/getStockList.php`);
    ajax.send();
}