<?php

$conn = new mysqli("localhost", "root", "", "puzzle_game");

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form data is received
if (isset($_POST['username']) && isset($_POST['time'])) {
    $username = $conn->real_escape_string($_POST['username']);
    $time = $conn->real_escape_string($_POST['time']);

    // Insert the data into the 'times' table
    $sql = "INSERT INTO scores (name, time) VALUES ('$username', '$time')";

    if ($conn->query($sql) === TRUE) {
        echo "Laiks saglabāts!";
    } else {
        echo "Kļūda saglabājot laiku: " . $conn->error;
    }
} else {
    echo "Nepareizi dati!";
}

?>
