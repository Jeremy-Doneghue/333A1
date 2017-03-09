var user = {};
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
    const json = JSON.stringify(user.favStocks);
    console.log(json);
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
 * Filter out the stocks that the user has already favourited
 */
function filterFavourites() {
    // Array of indexes in fullStockList where they are also a user favourite
    var matches = [];

    // Remove stocks that are already in the favourites
    // For each in the full list of stocks
    for (let i = 0; i < fullStockList.length; i++) {

        // For each of the user's favourite stocks
        for (let j = 0; j < user.favStocks.length; j++) {
            // If there's a match
            if (user.favStocks[j].companyname == fullStockList[i].companyname) {
                matches.push(i);
            }
        }
    }

    for (index in matches) {
        fullStockList.splice(index, 1);
    }
}

/**
 * Add a stock to the user's list of favourites
 * @param {*} stock 
 */
function addFavouriteStock(stock) {
    user.favStocks.push(stock);
    filterFavourites();
    rvc.render();
}

function testAddStock(){
    addFavouriteStock(fullStockList[0]);
}
