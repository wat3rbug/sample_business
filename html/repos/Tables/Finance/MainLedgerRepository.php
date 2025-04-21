<?php
class MainLedgerRepository {

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

    function getPurchaseHistoryByMonth($current) {
        if (isset($current)) {
            $sql = "SELECT l.*, t.transdate, a.name AS accountname, at.name AS accounttype  FROM ledgerentries AS l JOIN transactions AS t ON l.trans = t.id JOIN accounts AS a ON a.id = l.account JOIN accounttypes AS at ON at.id = a.accounttype WHERE MONTH(?) AND YEAR(?) ORDER BY transdate, id";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $current);
            $statement->bindParam(2, $current);
            $statement->execute();
            $output = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function updateLedger($cust_dict) {
        $id = $cust_dict['id'];
        $name = $cust_dict['name'];
        $amount = $cust_dict['amount'];
        $transdate = $cust_dict['transdate'];
        $entrytype = $cust_dict['entrytype'];

        if (isset($id) && isset($transdate) && isset($name) && isset($amount) && isset($entrytype)) {
            $sql ="UPDATE ledgerentries as l JOIN transactions AS t ON t.id = l.trans JOIN accounts AS a ON a.id = l.account SET l.amount = ?, t.transdate = ?, l.name = ?, l.entrytype = ? WHERE l.id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $amount);
            $statement->bindParam(2, $transdate);
            $statement->bindParam(3, $name);
            $statement->bindParam(4, $entrytype);
            $statement->bindParam(5, $id);
            $statement->execute();
        }
    }
    function getLedgerEntryById($id) {
        if (isset($id)) {
            $sql = "SELECT l.*, t.transdate, a.name AS accountname, at.name AS accounttype  FROM ledgerentries AS l JOIN transactions AS t ON l.trans = t.id JOIN accounts AS a ON a.id = l.account JOIN accounttypes AS at ON at.id = a.accounttype WHERE l.id = ?  ORDER BY transdate, id";
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

    function completePurchaseOrder($cust_dict) {
        $account =$cust_dict["account"];
        $amount = $cust_dict["amount"];
        $transdate = $cust_dict["transdate"];
        $sql = "INSERT INTO ledgerentries (trans, account, amount) VALUES (?, ?, ?)";
        $statement = $this->conn->prepare($sql);
        $statement->bindParam(1, $transdate);
        $statement->bindParam(2, $account);
        $statement->bindParam(3, $amount);
        $statement->execute();
    }

    function deleteLedgerEntry($id) {
        if (isset($id)) {
            $sql = "DELETE FROM ledgerentries WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function addTransaction() {
        $sql ="INSERT INTO transations (transdate) VALUES(curdate())";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
    }

    function getLastTransaction() {
        $sql = "SELECT transdate FROM transactions ORDER BY id DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getLastLedgerEntry() {
        $sql = "SELECT * FROM ledgerentries ORDER BY id DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
}