<?php

include "./partials/connection.php";

$task_id = $_GET['id'];

try {
    $sql = "DELETE FROM tasks WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':id', $task_id);

    $stmt->execute();

    echo json_encode(["message" => "Task deleted successfully"]);
} catch (PDOException $e) {

    echo json_encode(["error" => "Failed to delete task: " . $e->getMessage()]);
}
