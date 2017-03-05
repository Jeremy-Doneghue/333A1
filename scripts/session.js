var user = {};

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
    rvc.render();
}

function logOut(){
    user = {};
    rvc.render();
}