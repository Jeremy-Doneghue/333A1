<?php

session_start();

$data = json_decode(file_get_contents('php://input'), true);

//Check the user id is the same as in the session
if ($_SESSION['id'] == $data['uid']) {

    //Connect to database
    $con = mysqli_connect("localhost","root","root", "333A1");
    $uid = $data['uid'];

    // Update user's notes in the database
    foreach($data['favStocks'] as $favStock) 
    {
        $stockid = $favStock['stockid'];
        $note = $favStock['note'];

        $stmt = mysqli_prepare($con, "UPDATE notes SET note = ? WHERE user = ? AND stock = ?");
        mysqli_stmt_bind_param($stmt, 'sii', $note, $uid, $stockid);

        mysqli_stmt_execute($stmt);
    }
}
else {
    echo "Access denied";
}

?>