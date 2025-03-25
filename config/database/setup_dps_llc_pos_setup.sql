create database dpsllc_pos;
use dpsllc_pos;

drop table if exists `products`;
drop table if exists `colors`;
drop table if exists `lineitems`;
drop table if exists `customers`;
drop table if exists `states`;
drop table if exists `orders`;

create table products (
    id int auto_increment primary key,
    name varchar(40) not null,
    photo varchar(255)
) engine = InnoDB;

create table colors(
    id int auto_increment primary key,
    name varchar(40) not null
) engine = InnoDB;

create table lineitems (
    id int auto_increment primary key,
    product int not null,
    foreign key fk_lineitems_product(product) references products(id),
    weight decimal not null,
    cost decimal not null,
    buildtime datetime not null,
    quantity int not null default 1,
    color int not null,
    foreign key fk_line_item_color(color) references colors(id)
) engine = InnoDB;

create table states (
    postal_code varchar(2) primary key,
    state varchar(20) not null
) engine = InnoDB;

create table customers (
    id int auto_increment primary key,
    fname varchar(40) not null,
    lname varchar(40) not null,
    address1 varchar(100) not null,
    address2 varchar(100),
    city varchar(40) not null,
    state varchar(2) not null,
    foreign key fk_customer_state(state) references states(postal_code),
    zipcode varchar(10) not null
) engine = InnoDB;

create table orders (
    id int auto_increment primary key,
    orderdate datetime not null default curdate(),
    processdate datetime,
    shipdate datetime,
    receivedate datetime,
    customer int not null,
    foreign key fk_order_customer(customer) references customers(id),
    complete tinyint(1) not null default 0
) engine = InnoDB;
