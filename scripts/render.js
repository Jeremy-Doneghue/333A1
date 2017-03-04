//     _____                                             _       
//    / ____|                                           | |      
//   | |     ___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ ___ 
//   | |    / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __/ __|
//   | |___| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_\__ \
//    \_____\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|___/
//                         | |                                   
//                         |_|                                   

function dynamicElement(parentElement) {
    this.id = parentElement;
    this.head = document.getElementById(this.id),
        this.children = [],

        this.addChild = (elem) => {
            this.children.push(elem);
            this.render();
        }

    this.clear = () => {
        this.children = [];
        this.render;
    }

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
    }
}

/**
 * A stock listing in a LI element
 * @param {*} props properties
 */
function StockListItem(text, props) {
    const item = document.createElement("LI");
    const textNode = document.createTextNode(text);
    item.appendChild(textNode);
    return Object.assign(item, props);
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

//**************===============**************//      
                                                           
/**
 * Triggers rendering for all the children
 */
function RootViewController() {

    this.childViewControllers = [];
    this.addChild = (child) => {
        this.childViewControllers.push(child);
    }

    this.render = () => {
        for (vc of this.childViewControllers) {
            vc.render();
        }
    }
}

/**
 * Display the user's stock listings
 */
function stockListingsController() {

    this.stockList = new dynamicElement('stock-list');

    this.render = function () {
        //If the user is logged in
        if (user != null) {
            
            // For each of the users favourite stocks
            for (index in user.favStocks) {
                //Create a stockListItem
                const sli = new StockListItem(user.favStocks[index].companyname, {});
                //Give that stockListItem a button
                sli.appendChild(new Button(
                    'x',
                    {
                        onclick: function () { alert('remove') },
                    }
                ));

                //Add the stock listing to the list    
                this.stockList.addChild(sli);
            }
        }
    }
}




