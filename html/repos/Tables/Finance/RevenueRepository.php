<?php
class RevenueRepository {

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

    function createRevenue() {

    }

    function getRevenueByMonth($month) {
        if (isset($month)) {
            $sql = "SELECT * FROM v_revenue WHERE MONTH(?) AND YEAR(?) ORDER BY transdate";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $month);
            $statement->bindParam(2, $month);
            $statement->execute();
            $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
        }
    }

    function getAllRevenue() {
        $sql = "SELECT * FROM v_revenue";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getRevenueById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM v_revenue WHERE id = ?";
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

    function deleteRevenue() {
        
    }
}
?>