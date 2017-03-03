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
    echo "it worked";
}
else {
    echo "Incorrect username or password";
}





?>