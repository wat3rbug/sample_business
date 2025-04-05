<?php
class UpdateFinanceRepository {

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

    function updateLedger($cust_dict) {
        $id = $cust_dict['id'];
        $name = $cust_dict['name'];
        $amount = $cust_dict['amount'];
        $transdate = $cust_dict['transdate'];

        if (isset($id) && isset($transdate) && isset($name) && isset($amount)) {
            $sql ="UPDATE ledgerentries as l JOIN transactions AS t ON t.id = l.trans JOIN accounts AS a ON a.id = l.account SET l.amount = ?, t.transdate = ?, a.name = ? WHERE l.id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $amount);
            $statement->bindParam(2, $transdate);
            $statement->bindParam(3, $name);
            $statement->bindParam(4, $id);
            $statement->execute();
        }
    }
    function getLedgerEntryById($id) {
        if (isset($id)) {
            $sql = "SELECT l.*, t.transdate, a.name FROM ledgerentries AS l JOIN transactions AS t ON l.trans = t.id JOIN accounts AS a ON l.account = a.id JOIN accounttypes AS at ON a.accounttype = at.id WHERE l.id = ?";
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

    function deleteLedgerEntry($id) {
        if (isset($id)) {
            $sql = "DELETE FROM ledgerentries WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}