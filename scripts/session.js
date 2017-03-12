var user = {};
var nonFavouriteStocks = [];
var fullStockList = {};

/**
 * Returns whether the user is logged in or not
 */
function userLoggedIn() {
    if (Object.keys(user).length === 0 && user.constructor === Object) {
        return false;
    }
    return true;
}

/**
 * Save the user's favourite stocks and notes to the database
 */
function saveUserStocks() {
    let obj = {};
    obj = Object.assign(obj, { uid: user.uid});
    let stocks = { favStocks: [] };
    for (index in user.favStocks) {
        let stock = { 
            stockid: user.favStocks[index].stockid,
            note: user.favStocks[index].note,
        };
        stocks.favStocks.push(stock);
    }
    obj = Object.assign(obj, stocks);
    const json = JSON.stringify(obj);
    
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }           
    };
    ajax.open('POST', `php/saveUserData.php`, true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(json);

    console.log('Data to be saved' + json);
}

/**
 * Sets the user object from a json string
 * @param {*} jsonString 
 */
function setUser(jsonString) {
    user = Object.assign(user, JSON.parse(jsonString));
    retrieveFullStockList();
    rvc.render();
}

/**
 * Logs the user out
 */
function logOut() {
    user = {};
    nonFavouriteStocks = [];
    fullStockList = {};
    rvc.render();
}

/**
 * Retrieve a full list of stocks in json format
 */
function retrieveFullStockList() {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.stringify(JSON.parse(this.responseText), null, 2));
            fullStockList = JSON.parse(this.responseText);
        }
    };
    ajax.open("GET", `php/getStockList.php`);
    ajax.send();
}

/**
 * Add the stocks that aren't in the user's favourites list to nonFavouriteStocks
 */
function filterFavourites() {

    nonFavouriteStocks = [];
    
    for (index in fullStockList) {

        let toAdd = fullStockList[index].stockid;

        let foundMatch = false;
        for (jdex in user.favStocks) {
            if (user.favStocks[jdex].stockid == toAdd) {
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch) {
            nonFavouriteStocks.push(fullStockList[index]);
        }
    }
}

/**
 * Add a stock to the user's list of favourites
 * @param {*} stock 
 */
function addFavouriteStock(stock) {
    user.favStocks.push(stock);
    rvc.render();
}
