create database dpsllcpos;
use dpsllcpos;

drop table if exists `products`;
drop table if exists `colors`;
drop table if exists `lineitems`;
drop table if exists `customers`;
drop table if exists `states`;
drop table if exists `orders`;

create table materials (
    id int auto_increment primary key,
    name varchar(40) not null
) engine = InnoDB;

create table products (
    id int auto_increment primary key,
    name varchar(40) not null,
    photo varchar(255),
    url varchar(255),
    buildtime decimal (5,2) not null,
    material decimal (5,2) not null,
    materialtype int not null,
    foreign key fk_material_type(materialtype)references materials(id)
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

insert into states (postal_code, state) values ('AL', 'Alabama');
insert into states (postal_code, state) values ('AK', 'Alaska');
insert into states (postal_code, state) values ('AS', 'American Samoa');
insert into states (postal_code, state) values ('AZ', 'Arizona');
insert into states (postal_code, state) values ('AR', 'Arkansas');
insert into states (postal_code, state) values ('CA', 'California');
insert into states (postal_code, state) values ('CO', 'Colorado');
insert into states (postal_code, state) values ('CT', 'Connecticut');
insert into states (postal_code, state) values ('DE', 'Delaware');
insert into states (postal_code, state) values ('DC', 'District of Columbia');
insert into states (postal_code, state) values ('FL', 'Florida');
insert into states (postal_code, state) values ('GA', 'Georgia');
insert into states (postal_code, state) values ('GU', 'Guam');
insert into states (postal_code, state) values ('HI', 'Hawaii');
insert into states (postal_code, state) values ('ID', 'Idaho');
insert into states (postal_code, state) values ('IL', 'Illinois');
insert into states (postal_code, state) values ('IN', 'Indiana');
insert into states (postal_code, state) values ('IA', 'Iowa');
insert into states (postal_code, state) values ('KS', 'Kansas');
insert into states (postal_code, state) values ('KY', 'Kentucky');
insert into states (postal_code, state) values ('LA', 'Louisiana');
insert into states (postal_code, state) values ('ME', 'Maine');
insert into states (postal_code, state) values ('MD', 'Maryland');
insert into states (postal_code, state) values ('MH', 'Marshall Islands');
insert into states (postal_code, state) values ('MA', 'Massachusetts');
insert into states (postal_code, state) values ('MI', 'Michigan');
insert into states (postal_code, state) values ('FM', 'Micronesia');
insert into states (postal_code, state) values ('MN', 'Minnesota');
insert into states (postal_code, state) values ('MS', 'Mississippi');
insert into states (postal_code, state) values ('MO', 'Missouri');
insert into states (postal_code, state) values ('MT', 'Montana');
insert into states (postal_code, state) values ('NE', 'Nebraska');
insert into states (postal_code, state) values ('NV', 'Nevada');
insert into states (postal_code, state) values ('NH', 'New Hampshire');
insert into states (postal_code, state) values ('NJ', 'New Jersey');
insert into states (postal_code, state) values ('NM', 'New Mexico');
insert into states (postal_code, state) values ('NY', 'New York');
insert into states (postal_code, state) values ('NC', 'North Carolina');
insert into states (postal_code, state) values ('ND', 'North Dakota');
insert into states (postal_code, state) values ('MP', 'Northern Marianas');
insert into states (postal_code, state) values ('OH', 'Ohio');
insert into states (postal_code, state) values ('OK', 'Oklahoma');
insert into states (postal_code, state) values ('OR', 'Oregon');
insert into states (postal_code, state) values ('PW', 'Palau');
insert into states (postal_code, state) values ('PA', 'Pennsylvania');
insert into states (postal_code, state) values ('PR', 'Puerto Rico');
insert into states (postal_code, state) values ('RI', 'Rhode Island');
insert into states (postal_code, state) values ('SC', 'South Carolina');
insert into states (postal_code, state) values ('SD', 'South Dakota');
insert into states (postal_code, state) values ('TN', 'Tennessee');
insert into states (postal_code, state) values ('TX', 'Texas');
insert into states (postal_code, state) values ('UT', 'Utah');
insert into states (postal_code, state) values ('VT', 'Vermont');
insert into states (postal_code, state) values ('VA', 'Virginia');
insert into states (postal_code, state) values ('VI', 'Virgin Islands');
insert into states (postal_code, state) values ('WA', 'Washington');
insert into states (postal_code, state) values ('WV', 'West Virginia');
insert into states (postal_code, state) values ('WI', 'Wisconsin');
insert into states (postal_code, state) values ('WY', 'Wyoming');

create table customers (
    id int auto_increment primary key,
    fname varchar(40) not null,
    lname varchar(40) not null,
    address1 varchar(100) not null,
    address2 varchar(100),
    city varchar(40) not null,
    state varchar(2) not null default "TX",
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
