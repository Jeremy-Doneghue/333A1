//     _____                                             _       
//    / ____|                                           | |      
//   | |     ___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ ___ 
//   | |    / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __/ __|
//   | |___| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_\__ \
//    \_____\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|___/
//                         | |                                   
//                         |_|                                   

/**
 * Renders a set of child nodes
 * @param {*} parentElement the id of the element that this latches onto, usually a div
 */
function dynamicElement(parentElement, props) {

    this.head = Object.assign(parentElement, props);
    this.children = [];

    this.addChild = (elem) => {
        this.children.push(elem);
        this.render();
    };

    /**
     * Removes all children from the element
     */
    this.clear = () => {
        this.children = [];
        this.render;
    };

    this.render = () => {
        //Remove children
        while (this.head.firstChild) {
            this.head.removeChild(this.head.firstChild);
        }

        //Add children
        if (this.children.length > 0) {
            for (elem in this.children) {
                this.head.appendChild(this.children[elem]);
            }
        }
    };
}

/**
 * A dumb button
 * @param {*} text the text on the button
 * @param {*} props properties
 */
function Button(text, props) {
    const item = document.createElement("BUTTON");
    const textNode = document.createTextNode(text);
    item.appendChild(textNode);
    return Object.assign(item, props);
}

/**
 * A dumb input
 * @param {*} props properties
 */
function Input(props) {
    const item = document.createElement("INPUT");
    return Object.assign(item, props);
}

/**
 * A stock listing in an <li> element
 * @param {*} props properties
 */
function StockListItem(text, props) {
    const item = document.createElement("LI");
    const textNode = document.createTextNode(text);
    item.appendChild(textNode);
    return Object.assign(item, props);
}

/**
 * Displays the current stock price and its recent change
 * @param {*} stock the stock to display
 * @param {*} props properties
 */
function StockPriceDisplay(stock, props) {
    const container = document.createElement('span');

    const current = document.createElement('span');
    current.appendChild(document.createTextNode(stock.currentprice));
    current.className = 'stock-price-current';

    const change = document.createElement('span');

    if (stock.recentchangedirection == 'Up') {
        change.className = 'stock-change up';
        change.appendChild(document.createTextNode(`+ ${stock.recentchange}`));
    } 
    else {
        change.className = 'stock-change down';
        change.appendChild(document.createTextNode(`- ${stock.recentchange}`));
    }
        
    container.appendChild(current);
    container.appendChild(change);

    return Object.assign(container, props);
}


/**
 * A generic text element
 * @param {*} text 
 * @param {*} props 
 */
function Text(text, props) {
    const elem = document.createElement('span');
    elem.appendChild(document.createTextNode(text));
    return Object.assign(elem, props);
}

/**
 * 
 * @param Object user 
 * @param Object props 
 */
function WelcomeMessage(stock, props) {
    const text = `Welcome, ${user.name}`;
    return elem = new Text(text, props);
}

/**
 * A text area
 */
function NotesArea(text, props) {
    const elem = document.createElement("textarea");
    elem.value = text;
    return Object.assign(elem, props);
}

function UnorderedList(props) {
    const elem = document.createElement('ul');
    return Object.assign(elem, props);
}

function HorizontalLine(props) {
    const elem = document.createElement('hr');
    return Object.assign(elem, props);
}


//   __      ___                _____            _             _ _               
//   \ \    / (_)              / ____|          | |           | | |              
//    \ \  / / _  _____      _| |     ___  _ __ | |_ _ __ ___ | | | ___ _ __ ___ 
//     \ \/ / | |/ _ \ \ /\ / / |    / _ \| '_ \| __| '__/ _ \| | |/ _ \ '__/ __|
//      \  /  | |  __/\ V  V /| |___| (_) | | | | |_| | | (_) | | |  __/ |  \__ \
//       \/   |_|\___| \_/\_/  \_____\___/|_| |_|\__|_|  \___/|_|_|\___|_|  |___/
//                                                                               
//**************===============**************\\                

var rvc = new RootViewController();
rvc.addChild(new stockListingsController());  
rvc.addChild(new loginViewController());

//**************===============**************//      
                                                           
/**
 * Triggers rendering for all the children
 */
function RootViewController() {

    this.childViewControllers = [];
    this.addChild = (child) => {
        this.childViewControllers.push(child);
        this.render();
    }

    this.render = () => {
        for (vc of this.childViewControllers) {
            vc.render();
        }
    }
}

function loginViewController() {

    this.element = new dynamicElement(document.getElementById('login-form'), {});

    this.render = function() {

        this.element.clear();
        
        // If the user is not logged in
        if (!userLoggedIn()) {

            //Log in message message
            const message = new Text('Please log in', { className: 'welcome-message'});

            //Username field
            const username = new Input({
                type: 'text', 
                placeholder: 'Username', 
                name: 'uname', 
                id: 'user', 
                required: true,
            });

            //Password field
            const password = new Input({
                type: 'password', 
                placeholder: 'Password', 
                name: 'psw', 
                id: 'pass', 
                required: true,
            });

            //Submit button
            const submitButton = new Button('Log in', { 
                type: 'submit', 
                className: 'login-button',
                onclick: () => { login() },
            });           

            //Add the components to the dynamic element
            this.element.addChild(message);
            this.element.addChild(username);
            this.element.addChild(password);
            this.element.addChild(submitButton);
        }
        //Display logout button
        else {
            const welcome = new WelcomeMessage(user, { className: 'welcome-message'});

            const logout = new Button('logout', { className: 'logout-button' });
            logout.addEventListener('click', () => { logOut() });  

            this.element.addChild(welcome);
            this.element.addChild(logout);
        }

        this.element.render();
    }
}

/**
 * Display the user's stock listings
 */
function stockListingsController() {

    this.stockArea = new dynamicElement(document.getElementById('stock-container'), { className: 'stock-container' });

    this.selectedStock = -1;
    this.addingNewStocks = false;

    this.render = function () {

        // If the user is logged out, then stop adding new stocks 
        //(this is for if the previous user logged out while still adding stocks) 
        //From http://stackoverflow.com/a/32108184
        if (Object.keys(user).length === 0 && user.constructor === Object){
            this.addingNewStocks = false;
        }

        // Show the container, since it's display:none during login
        document.getElementById('stock-container').style.display = 'block';

        // Create stock list parent elements
        const ul = new UnorderedList({});
        const stockList = new dynamicElement(ul, { id: 'stock-list' });

        // Clear existing elements so we can re-render them
        stockList.clear();
        this.stockArea.clear();

        //If the user is logged in
        if (userLoggedIn()) {

            //Stocklist header
            const label = new Text('Your stocks', { 
                className: 'stock-header-label',
            });

            const addButtonText = (this.addingNewStocks) ? 'Done' : 'Add';
            const addButton = new Button(addButtonText, { 
                className: 'button-add-stocks',
                //Toggle adding stocks
                onclick: () => { 
                    this.addingNewStocks = !this.addingNewStocks; 
                    this.render()
                },
            });

            this.stockArea.addChild(label);
            this.stockArea.addChild(addButton);
            
            //Render the stockList
            // For each of the users favourite stocks
            for (index in user.favStocks) {
                //Create a stockListItem
                //Alternate light and dark background
                const cssClass = (index % 2 == 0) ? 'stock-list-item odd' : 'stock-list-item even';

                let itemText = user.favStocks[index].companyname;                 

                //Stock list object
                const sli = new StockListItem(itemText, {

                    className: cssClass, 
                    listIndex: index,

                    //onclick event listener
                    onclick: () => {             
                        //If already selected, deselect
                        if (this.selectedStock ==  sli.listIndex) {
                            this.selectedStock = -1;
                        }  
                        //Else select
                        else {
                            this.selectedStock = sli.listIndex;
                        }                                     
                        this.render();
                    },

                    //Add a button to remove a stock on hover
                    onmouseenter: () => {

                        //create a button
                        const removeButton = new Button('x', 
                        { 
                            onclick: () => {
                                let stockList = user.favStocks;
                                stockList.splice(sli.listIndex, 1);
                                // this.selectedStock = -1;
                                this.render();
                            },
                            id: 'rmb',
                        });

                        // If not currently adding stocks, allow them to be deleted
                        if (!this.addingNewStocks) {
                            sli.appendChild(removeButton);
                        }                        
                    },

                    //remove the button when the mouse leaves
                    onmouseleave: () => {
                        if (!this.addingNewStocks) {
                            sli.removeChild(document.getElementById('rmb'));
                        }                        
                    },
                });

                //Check if this listing is the selected stock
                if (this.selectedStock == sli.listIndex) {
                    sli.className += ' stock-selected';
                }      
                        
                //Create stock price change indicator
                const changeDisplay = new StockPriceDisplay(user.favStocks[index], { className: 'change-display'});

                //Add the stock price change indicator to the list item 
                sli.appendChild(changeDisplay);                   

                this.stockArea.addChild(stockList.head);
                stockList.addChild(sli);
            }

            // Add the text area to stockArea
            if (this.selectedStock != -1) {

                const hr = new HorizontalLine({
                    className: 'divider',
                });

                const stockLabel = new Text(`${user.favStocks[this.selectedStock].companyname}`, {
                    className: 'stock-details-label',
                });

                const annualTrend = new Text(
                    `${user.favStocks[this.selectedStock].annualtrend}`,
                    { className: 'annual-trend-label' }
                );

                const noteLabel = new Text('Notes:', { 
                    className: 'notes-label',
                });
                const noteArea = new NotesArea(user.favStocks[this.selectedStock].note, { 
                    className: 'notes', 
                    rows: 5,
                    onkeyup: () => {
                        // Save the updated note to the user object after each change
                        let stockToChange = user.favStocks[this.selectedStock];
                        stockToChange = Object.assign(stockToChange, { note: noteArea.value });
                        user.favStocks[this.selectedStock] = stockToChange; 
                    }  
                });
                this.stockArea.addChild(hr);
                this.stockArea.addChild(stockLabel);
                this.stockArea.addChild(annualTrend);
                this.stockArea.addChild(noteLabel);
                this.stockArea.addChild(noteArea);
            }

            //If we are adding new stocks to the favourites
            if (this.addingNewStocks) {

                filterFavourites();

                const newStockList = new UnorderedList({
                    className: 'add-stock-list',
                });

                // If there is at least one stock that is not the user's favourite
                if (nonFavouriteStocks.length > 0) {
                    // Display the stocks that the user could add
                    for (index in nonFavouriteStocks) {                    
                        const item = new StockListItem(nonFavouriteStocks[index].companyname, {
                            className: 'add-stock-item',
                        });

                        const addStockButton = new Button('Add', {
                            className: 'add-stock-button',
                            stock: nonFavouriteStocks[index],
                            onclick: () => {
                                addFavouriteStock(addStockButton.stock);                                
                            },
                        });
                        item.appendChild(addStockButton);
                        newStockList.appendChild(item);
                    }
                    this.stockArea.addChild(newStockList);
                }
                else {
                    const noMoreStocks = new Text('You sure must love stocks, because you\'ve added them all!', {
                        className: 'no-more-stocks'
                    });
                    this.stockArea.addChild(noMoreStocks);
                }                
            }
        }
        // If the user is not logged in, display nothing
        else {
            document.getElementById('stock-container').style.display = 'none';
        }
        this.stockArea.render();
    }
}




