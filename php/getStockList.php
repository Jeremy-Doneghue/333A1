<?php
    //Connect to database
    $con = mysqli_connect("localhost","root","root", "333A1");

    // Check connection
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $query = "SELECT * FROM stocks";
    $result = mysqli_query($con, $query);

    $stocks = array();
    while ($row = mysqli_fetch_assoc($result)) {

        //Put the info into an object
        $stockObject = (object)[
            'companyname' => $row['companyname'],
            'currentprice' => $row['currentprice'],
            'recentchange' => $row['recentchange'],
            'annualtrend' => $row['annualtrend'],
            'recentchangedirection' => $row['recentchangedirection'],
            'stockid' => $row['id']            
        ];
        array_push($stocks, $stockObject);
    }

    //Echo the result
    echo json_encode($stocks);
           
    //Close the connection
    mysqli_close($con);
?>