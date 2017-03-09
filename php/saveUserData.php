<?php
    session_start();

    $json = $_GET['data'];
    $obj = json_decode($json);

    //Connect to database
    $con = mysqli_connect("localhost","root","root", "333A1");

    // Check connection
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // $query = 
?>