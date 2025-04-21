create database dpsllc;
use dpsllc;
drop table if exists `ledgerentries`;
drop table if exists `accounts`;
drop table if exists `accounttypes`;
drop table if exists `transactions`;
drop table if exists `tags`;
drop table if exists `polineitems`;
drop table if exists `partorders`;
drop table if exists `vendors`;
drop table if exists `states`;
drop table if exists `poitems`;




	
create table transactions (
	id int auto_increment primary key,
	transdate datetime not null default curdate()
) engine = InnoDB;

create table accounttypes (
	id int auto_increment primary key,
	name varchar(20) not null
) engine = InnoDB;

insert into accounttypes (name) values ('Assets');
insert into accounttypes (name) values ('Liabilities');
insert into accounttypes (name) values ('Owners Equity');
insert into accounttypes (name) values ('Revenue');
insert into accounttypes (name) values ('Expenses');
	
create table accounts (
	id int auto_increment primary key,
	name varchar(255) not null,
	accounttype int not null,
	foreign key fk_accounts_at(accounttype) references accounttypes(id),
	isarchived int not null default 0,
	insertedate datetime not null default curdate(),
	insertedby varchar(255) not null,
	updatedat datetime,
	updatedby varchar(255)
) engine = InnoDB;

create table ledgerentries (
	id int auto_increment primary key,
	trans int not null,
	account int not null,
	entrytype int not null default 0,
	amount decimal(5, 2) not null,
	name varchar(40) not null,
	foreign key ledger_entry_transaction_fk(trans) references transactions(id),
	foreign key ledger_entries_account_fk(account) references accounts(id)
) engine = InnoDB;

create table poitems (
	id int auto_increment primary key,
	name varchar(100) not null,
	description varchar(400)
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

create table vendors (
	id int auto_increment primary key,
	name varchar(100) not null,
	url varchar(255),
	address1 varchar(100),
	address2 varchar(100),
	city varchar(100),
	state varchar(2) not null default "TX",
	foreign key fk_customer_state(state) references states(postal_code),
	zipode varchar(10) 
) engine = InnoDB;

 create table partorders (
	id int auto_increment primary key,
	ordered date not null default curdate(),
	shipped date,
	received date,
	vendor int not null,
	foreign key fk_po_vendor(vendor) references vendors(id),
	scheduled date,
	ledger int,
	foreign key fk_po_ledger(ledger) references ledgerentries(id)
 ) engine = InnoDB;

 create table polineitems (
	id int auto_increment primary key,
	partorder int not null,
	foreign key fk_polineitem_po(partorder) references partorders(id),
	quantity int not null default(1),
	cost_per_unit decimal not null
 ) engine = Innodb;

 create table tags (
	id int auto_increment primary key,
	description varchar(20) not null,
	vendor int not null,
	foreign key fk_vendor_tag(vendor) references vendors(id)
 ) engine = InnoDB;

create index transactions_transaction_date_idx on transactions(id);
create index ledger_entries_entry_type_idx on ledgerentries(trans);
create index ledger_entries_account_id_idx on ledgerentries(account);
create index accounts_account_type_idx on accounts(accounttype);
	
create or replace view v_assets as
	select l.*, t.transdate from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Assets' order by t.transdate desc;
	
create or replace view v_equity as
	select l.*, t.transdate from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Owners Equity' order by t.transdate desc;
	
create or replace view v_liabilities as
	select l.*, t.transdate from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Liabilities' order by t.transdate desc;
	
create or replace view v_revenue as
	select l.*, t.transdate from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Revenue' order by t.transdate desc;
	
create or replace view v_expenses as
	select l.*,t.transdate from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Expenses' order by t.transdate desc;