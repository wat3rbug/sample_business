<?php

class OrderConnection {

    public $database;
    public $username;
    public $hostname;
    public $password;

    function __construct() {
        $this->password = "1990E30BMW325i!";
        $this->database = "dpsllc_pos";
	    $this->hostname = "phobos";
        $this->username = "dpsllcuser";
    }
}
?>
