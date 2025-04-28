<?php
class ProductRepository {

    private $conn;

    function __construct() {
        include_once("POS/OrderConnection.php");
        $db = new OrderConnection();
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

    function createProduct($cust_dict) {
        $name = $cust_dict["name"];
        $url = $cust_dict["url"];
        $photo = $cust_dict["photo"];
        $material =  $cust_dict["material"];
        $time = $cust_dict["buildtime"];
        $mattype = $cust_dict["materialtype"];

        if ($photo == "") $photo = null;
        if (isset($name) && isset($url) && isset($material) && isset($time) && isset($mattype)) {
            $sql = "INSERT INTO products (`name`, photo, `url`, buildtime, material, materialtype) VALUES (?, ?, ?, ?, ?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $photo);
            $statement->bindParam(3, $url);
            $statement->bindParam(4, $time);
            $statement->bindParam(5, $material);
            $statement->bindParam(6, $mattype);
            $statement->execute();
        }
    }

    function getProductById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM products WHERE id = ?";
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
    function getAllProducts() {
        $sql = "SELECT p.id, p.name, p.url, p.buildtime, p.material, m.name AS materialtype, p.photo FROM products AS p JOIN materials AS m on p.materialtype = m.id";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function updateProduct($cust_dict) {
        $id = $cust_dict["id"];
        $name = $cust_dict["name"];
        $url = $cust_dict["url"];
        $photo = $cust_dict["photo"];
        $buildtime = $cust_dict["buildtime"];
        $material = $cust_dict["material"];
        $mattype = $cust_dict["materialtype"];
        var_dump($cust_dict);
        if ($photo == "") $photo = null;
        if (isset($name) && isset($url) && isset($id)) {
            $sql = "UPDATE products SET `name` = ?, photo = ?, `url` = ?, buildtime = ?, material = ?, materialtype = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $photo);
            $statement->bindParam(3, $url);
            $statement->bindParam(4, $buildtime);
            $statement->bindParam(5, $material);
            $statement->bindParam(6, $mattype);
            $statement->bindParam(7, $id);
            $statement->execute();
        }
    }

    function deleteProduct($id) {
        if (isset($id)) {
            $sql = "DELETE FROM products WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }   
    }

    function updateProductPhoto($id, $photo) {
        if (isset($id) && isset($photo)) {
            $sql = "UPDATE products SET photo = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $photo);
            $statement->bindParam(2, $id);
            $statement->execute();
        }
    }
}
?>