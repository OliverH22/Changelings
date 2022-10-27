<?php
// 1. Grab username
list($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) = explode(':', base64_decode(substr($_SERVER['HTTP_AUTHORIZATION'], 6)));
$user = $_SERVER['PHP_AUTH_USER'];

// 2. Retrieve the JSON file (string) holding member data
$path = '../data/data.json';
$jsondata = file_get_contents($path);

// 3. Decode the file into object
$data = json_decode($jsondata, true);

// 4. Reference the user data and encode it into JSON string
$userdata = $data[$user];
$userdatajson = json_encode($userdata);

// 5. Send the string to the form
echo $userdatajson;
?>