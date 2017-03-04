<?php

$username = $_GET['user'];
$password = $_GET['pass'];

//Connect to database
$con = mysqli_connect("localhost","root","root", "333A1");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$query = "SELECT * 
          FROM Users 
          WHERE username = '$username'
          AND binary password = '$password'"; //Use binary for case sensitivity
          
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
$count = mysqli_num_rows($result);

if ($count == 1) {
    sendData($con, $row['uid'], $row['username']);
}
else {
    echo "Incorrect username or password";
}

//Close the connection
mysqli_close($con);

function sendData($con, $id, $username) {

    //Get the user's favourite stocks
    $favStocksQuery = "SELECT stock FROM FavouriteStocks WHERE user = '$id'";
    $favStockResult = mysqli_query($con, $favStocksQuery);
    $numrows = mysqli_num_rows($favStockResult);
    $stocks = array();
    while ($id = mysqli_fetch_assoc($favStockResult)['stock']) {

        //Query each stock
        $stockQuery = "SELECT * FROM stocks WHERE id = '$id'";
        $result = mysqli_query($con, $stockQuery);
        $row = mysqli_fetch_assoc($result);

        //Put the info into an object
        $stockObject = (object)[
            'companyname' => $row['companyname'],
            'currentprice' => $row['currentprice'],
            'recentchange' => $row['recentchange'],
            'annualtrend' => $row['annualtrend'],
            'recentchangedirection' => $row['recentchangedirection']            
        ];
        array_push($stocks, $stockObject);
    }
    
    // Object to encode to json
    $user = (object)['name' => $username, 'favStocks' => $stocks];
    echo json_encode($user);
}
?>