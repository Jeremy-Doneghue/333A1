var user = {
  "name": "Demo User",
  "uid": "2",
  "favStocks": [
    {
      "companyname": "Fling Fing",
      "currentprice": "0.94",
      "recentchange": "0.11",
      "annualtrend": "Down",
      "recentchangedirection": "Up",
      "stockid": "4",
      "note": "Keep an eye on this one."
    },
    {
      "companyname": "XYZ Logistics",
      "currentprice": "1.00",
      "recentchange": "0.05",
      "annualtrend": "Down",
      "recentchangedirection": "Down",
      "stockid": "2",
      "note": "Divest now!"
    },
    {
      "companyname": "Acme Publishing",
      "currentprice": "1.33",
      "recentchange": "0.08",
      "annualtrend": "Up",
      "recentchangedirection": "Down",
      "stockid": "3",
      "note": "BOOM!"
    },
    {
      "companyname": "Total Solutions Inc",
      "currentprice": "0.55",
      "recentchange": "0.01",
      "annualtrend": "Down",
      "recentchangedirection": "Up",
      "stockid": "6",
      "note": "Outlook not looking good."
    },
    {
      "companyname": "Neutral Networks",
      "currentprice": "1.25",
      "recentchange": "0.40",
      "annualtrend": "Up",
      "recentchangedirection": "Up",
      "stockid": "5",
      "note": "This one's a bit convoluted, I should feed forward this information to my advisor.\nI've had a recurrant thought in my mind that I should learn more about this company."
    }
  ]
};

var nonFavouriteStocks = [];
var fullStockList = {};
retrieveFullStockList();

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

    // var ajax = new XMLHttpRequest();
    // ajax.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //         fullStockList = JSON.parse(this.responseText);
    //     }
    // };
    // ajax.open("GET", `php/getStockList.php`);
    // ajax.send();
    fullStockList = JSON.parse(`[{"companyname":"ABC Company","currentprice":"0.40","recentchange":"0.02","annualtrend":"Up","recentchangedirection":"Up","stockid":"1"},{"companyname":"XYZ Logistics","currentprice":"1.00","recentchange":"0.05","annualtrend":"Down","recentchangedirection":"Down","stockid":"2"},{"companyname":"Acme Publishing","currentprice":"1.33","recentchange":"0.08","annualtrend":"Up","recentchangedirection":"Down","stockid":"3"},{"companyname":"Fling Fing","currentprice":"0.94","recentchange":"0.11","annualtrend":"Down","recentchangedirection":"Up","stockid":"4"},{"companyname":"Neutral Networks","currentprice":"1.25","recentchange":"0.40","annualtrend":"Up","recentchangedirection":"Up","stockid":"5"},{"companyname":"Total Solutions Inc","currentprice":"0.55","recentchange":"0.01","annualtrend":"Down","recentchangedirection":"Up","stockid":"6"}]`);
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
