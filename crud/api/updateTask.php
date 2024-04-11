<?php
include "./partials/connection.php";


$task_id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['compleTED'];
$idUser = $_POST['idUser'];

try {
    $sql = "UPDATE tasks SET title = :title, description = :compleTED, user_id = :user_id WHERE id = :task_id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':id', $task_id);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $compleTED);
    $stmt->bindParam(':idUser', $user_id);

    $stmt->execute();

    echo json_encode(["message" => "Task updated successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to update task: " . $e->getMessage()]);
}
