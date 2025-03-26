<?php

class FinanceConnection {

    public $database;
    public $username;
    public $hostname;
    public $password;

    function __construct() {
        $this->password = "1989E30BMW325i";
        $this->database = "dpsllc";
	    $this->hostname = "phobos";
        $this->username = "dpsllcuser";
    }
}
?>
