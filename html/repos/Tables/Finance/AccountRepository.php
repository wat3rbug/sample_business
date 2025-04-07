<?php
class AccountRepository {

    private $conn;

    function __construct() {
        include_once("FinanceConnection.php");
        $db = new FinanceConnection();
        $servername = $db->hostname;
        $username = $db->username;
        $password = $db->password;
        $charset = "utf8mb4";
        $database = $db->database;
        $dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => true,
        ];
        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    function createAccount($cust_dict) {
        $name = $cust_dict["name"];
        $accttype = $cust_dict["accttype"];
        if (isset($name) && isset($accttype)) {
            $sql = "INSERT INTO accounts (name, accounttype, insertedby) VALUES (?, ?, 'Doug')";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $accttype);
            $statement->execute();
        }
    }

    function getAllAccountTypes() {
        $sql = "SELECT * FROM accounttypes";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getAllAccounts() {
        $sql = "SELECT a.id, a.name, at.name AS accounttype, at.id AS accttype FROM accounts as a JOIN accounttypes AS at ON a.accounttype = at.id";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getAccountById($id) {
        if (isset($id)) {
            $sql = "SELECT a.id, a.name, at.name AS accounttype, at.id AS accttype FROM accounts as a JOIN accounttypes AS at ON a.accounttype = at.id WHERE a.id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }
    function updateAccount($cust_dict) {
        $id = $cust_dict["id"];
        $name = $cust_dict["name"];
        $accttype = $cust_dict["accttype"];
        if (isset($id) && isset($name) && isset($accttype)) {
            $sql = "UPDATE accounts SET name = ?, accounttype = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $accttype);
            $statement->bindParam(3, $id);
            $statement->execute();
        }
    }

    function deleteAccount($id) {
        if (isset($id)) {
            $sql = "DELETE FROM accounts WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}
?>