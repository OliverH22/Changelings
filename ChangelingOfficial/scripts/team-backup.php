<?php
/** This script lives under /home/changelingAdmin and executes via cron
 *  1. crontab -e
 *  2. mm hh * * * php /home/changelingAdmin/team-backup.php
 *     the * indicates recurring; three stars means daily (otherwise it'd be day of month, month, day of week)
 *  3. crontab -l
 */

/**
 * Recursively copies a directory
 * Based off of https://www.php.net/manual/en/function.copy.php#91010
 * @param string $src Source path
 * @param string $dst Destination path
 */
function recurse_copy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst, 0700);
    while(false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($src . '/' . $file)) {
                recurse_copy($src . '/' . $file, $dst . '/' . $file); 
            }
            else {
                copy($src . '/' . $file, $dst . '/' . $file); 
            }
        }
    }
	
    closedir($dir);
}

/**
 * Recursively deletes a directory
 * @param  string $dir The directory to delete
 * @return boolean  result of rmdir
 */
function recurse_delete($dir) {
    if (!file_exists($dir)) {
        return true;
    }
    if (!is_dir($dir)) {
        return unlink($dir);
    }
	
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        if (!recurse_delete($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }
	
    return rmdir($dir);
}

// to prevent execution when the entire repo is copied onto the server
if (getcwd() == "/home/changelingAdmin") {
	$teamDir = "/home/changelingAdmin/changelingvr.com/data";
	$parentDest = "/home/changelingAdmin/teamBackup/";
	$dest = $parentDest . date('Y-m-d');
	// count number of existing backups, ignore . and ..
	$folders = array_diff(scandir($parentDest), array('..', '.'));
	// remove old backups
	if (count($folders) > 5) {
		// [2] because array_diff doesn't update the keys of the array; therefore the array will always start counting from 2 instead of 0
		recurse_delete($parentDest . $folders[2]);
	}
	recurse_copy($teamDir, $dest);
}
?>