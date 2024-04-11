<?php
include "./partials/connection.php";

$task_id = $_GET['id'];

try {
    $sql = "SELECT * FROM tasks WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':id', $task_id);
    $stmt->execute();
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($task);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to fetch task: " . $e->getMessage()]);
}
