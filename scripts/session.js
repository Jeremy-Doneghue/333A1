var user = {};

function setUser(jsonString) {
    user = Object.assign(user, JSON.parse(jsonString));
}

function unsetUser(){
    user = null;
}