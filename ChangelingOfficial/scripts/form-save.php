<?php
/* data.json: contains all project member data
 * Organized as such after parsing: {
 * "memberusername" : {
 *         "name": "string",                  // where "string" is custom input of user
 *         "bio": "string",                   // where "string" is custom input of user
 *         "terms": [ "string", {{REPEAT}} ], // where "string" is in format TermYYYY, e.g. "Summer2020", "Fall2020", etc.
 *         "teams": [ "string", {{REPEAT}} ], // where "string" is Team, e.g. "Staff", "Web", "Production", etc.
 *         "roles": "string",                 // where "string" is custom input of user
 *         "links": [
 *             { "id": "string", "val": "string" },
 *             // contains up to five of the above objects
 *             // where id = website, secondary, github, linkedin, or email
 *             // where val = the URL
 *         ]
 *     }
 * },
 * {{REPEAT}}
 * Photos will be username.jpg (same directory as data.json), therefore they are not stored in the data.json
 * Possible way to utilize data.json for teams page:
 *   1. grab the data as an object
 *   2. create collections for each team
 *   3. fill the collections by filtering out people from the data that were a part of the team (e.g. push person if person.teams contains "team filtering for")
 *   4. fill each team container on the page with corresponding team collections that have just been filled with the filtered data
 *   4.5 ensure data is parsed into legible, consistent manner (e.g. convert Summer2020 to Summer 2020, use icons based on id of URL that link to said URL)
 *   
 * **NOTE**: Terms, Teams, and Links are written as a string ( e.g. "[\"Summer2020\"]" ) to the file 
 * and must have an extra JSON.parse() ( e.g. `JSON.parse(data.teams)` ) in order to retrieve array
 */

// 1. Grab username
list($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) = explode(':', base64_decode(substr($_SERVER['HTTP_AUTHORIZATION'], 6)));
$user = $_SERVER['PHP_AUTH_USER'];

// 2. Retrieve the data sent from the form
$name = $_POST['name'];
$bio = $_POST['bio'];
$terms = $_POST['terms'];
$teams = $_POST['teams'];
$roles = $_POST['roles'];
$links = $_POST['links'];

// 3. Retrieve the JSON file (string) holding member data
$path = '../data/data.json';
$oldjson = file_get_contents($path);

// 4. Decode the file into object
$data = json_decode($oldjson, true);

// 5. Push the new data from the form into the member data object
$data[$user] = [
	"name" => $name,
	"bio" => $bio,
	"terms" => $terms,
	"teams" => $teams,
	"roles" => $roles,
	"links" => $links
];

// 6. Encode the data object back into JSON string
$newjson = json_encode($data);

// 7. Save the file back to the server
file_put_contents($path, $newjson);

// 8. Handle photo if sent
if (isset($_FILES["photo"])) {
	// a. Convert blob into string
	$imgstr = file_get_contents($_FILES['photo']['tmp_name']);
	
	// b. Convert string to image in order to compress
	$img = imagecreatefromstring($imgstr);
	
	// c. Save image to specified path based on user name
	$imgpath = "../data/" . $user . ".jpg";
	imagejpeg($img, $imgpath, 80);
	
	// d. Free up memory
	imagedestroy($img);
}
?>