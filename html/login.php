<?php
   $email = $_POST['email'];
   $password = $_POST['password'];

   //Database connection 
   
   $conn = new mysqli('localhost','root','','ilearn');
   if($conn->connect_error){
       echo"$conn->connect_error";
       die('Connection failed : ' . $conn->connect_error);
   }else{
    $stmt = $conn->prepare("select * from signup where email = ?");
    $stmt->bind_param("s" , $email);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    if($stmt_result->num_rows >0){
         $data = $stmt_result->fetch_assoc();
         if($data['password'] === $password) {
            echo "<h2>Login Successfull </h2>";
            // header("Location: popregister.html");
         } else {
            echo "<h2>Invalid Email or password </h2>";
            // swal("Good job!", "You clicked the button!", "success")

         }

    // } else {
    //     echo "<h2>Invalid Email or password </h2>";
     }

}
?>