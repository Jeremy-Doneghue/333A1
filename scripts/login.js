/**
 * 
 */
function login() {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    
    //Check both forms aren't empty
    if (username.length == 0){
        return;
    }
    if (password.length == 0){
        return;
    }
    
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setUser(this.responseText);
            console.log(JSON.stringify(JSON.parse(this.responseText), null, 2));
        }
    };
    ajax.open("GET", `php/login.php?user=${username}&pass=${password}`);
    ajax.send();

    document.getElementById('user').value = '';
    document.getElementById('pass').value = '';
}