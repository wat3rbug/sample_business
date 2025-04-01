<?php

class OrderConnection {

    public $database;
    public $username;
    public $hostname;
    public $password;

    function __construct() {
        $this->password = "2002E46BMW325i";
        $this->database = "dpsllcpos";
	    $this->hostname = "phobos";
        $this->username = "posuser";
    }
}
?>
