<?php

include "./partials/connection.php";

$title = $_POST['title'];
$description = $_POST['compleTED'];
$user_id = $_POST['idUser'];

try {
    $sql = "INSERT INTO tasks (title, description, idUser) VALUES (:title, :description, :idUser)";
    $stmt = $conn->prepare($sql);

    // Vincular los parámetros con los valores enviados desde el formulario
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $compleTED);
    $stmt->bindParam(':idUser', $user_id);

    $stmt->execute();

} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to create task: " . $e->getMessage()]);
}
