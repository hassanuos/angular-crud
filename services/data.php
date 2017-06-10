<?php
$servername = "localhost";
# BEGIN : Complete with data
$username = "root";
$password = "mysql";
$db = "angjs";
# END: Complete with data

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if(isset($_GET['action'])){
    if ($_GET['action'] == 'get'){
        $a=array(); 
	if ($result = $conn->query("SELECT * from users")) {
	    while($row = $result->fetch_assoc()) {
		array_push($a,$row);
	    }
	    echo json_encode($a,JSON_NUMERIC_CHECK);
	}
    }
}
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST['action'])){
	if($_POST['action'] == 'login') {
		$sql = "SELECT * FROM login WHERE username='{$_POST['username']}' AND password='{$_POST['password']}'";
		$result = $conn->query($sql);
		echo json_encode($result->fetch_assoc());
	}
}
if ($_POST['action'] == 'add'){
    $result = $conn->query("INSERT INTO users (name,web,age,profesion) VALUE ('{$_POST['name']}','{$_POST['web']}',{$_POST['age']},'{$_POST['profesion']}')");
    echo json_encode($conn->insert_id,JSON_NUMERIC_CHECK);
}  elseif ($_POST['action'] == 'edit') {
    $result = $conn->query("UPDATE users SET name='{$_POST['name']}',web='{$_POST['web']}',age={$_POST['age']},profesion='{$_POST['profesion']}' WHERE id={$_POST['id']}");
}  elseif ($_POST['action'] == 'delete') {
    $result = $conn->query("DELETE FROM users WHERE id={$_POST['id']}");
}
$conn->close();
?>
