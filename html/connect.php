<?php
     $Name = $_POST['Name'];
     $email = $_POST['email'];
     $password = $_POST['password'];
     $number = $_POST['number'];

    //  Database connection

    $conn = new mysqli('localhost','root','','magic shop');
    if($conn->connect_error){
        echo"$conn->connect_error";
        die('Connection failed : ' . $conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into signup(Name, email, password, number) values(?, ?, ?, ?)");
        $stmt->bind_param("sssi", $Name, $email, $password, $number);
        $execval = $stmt->execute();
        echo $execval;
        // header("Location: popregister.html");
     echo "Registration Sucessfull..";
        $stmt->close();
        $conn->close();
    }
    ?>