create database dpsllc;
use dpsllc;
drop table if exists `ledgerentries`;
drop table if exists `accounts`;
drop table if exists `accounttypes`;
drop table if exists `transactions`;
	
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
	foreign key ledger_entry_transaction_fk(trans) references transactions(id),
	foreign key ledger_entries_account_fk(account) references accounts(id)
) engine = InnoDB;

create index transactions_transaction_date_idx on transactions(id);
create index ledger_entries_entry_type_idx on ledgerentries(trans);
create index ledger_entries_account_id_idx on ledgerentries(account);
create index accounts_account_type_idx on accounts(accounttype);
	
create or replace view v_assets as
	select l.*, t.transdate, a.name from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Assets' order by t.transdate desc;
	
create or replace view v_equity as
	select l.*, t.transdate, a.name from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Owners Equity' order by t.transdate desc;
	
create or replace view v_liabilities as
	select l.*, t.transdate, a.name from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Liabilities' order by t.transdate desc;
	
create or replace view v_revenue as
	select l.*, t.transdate, a.name from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Revenue' order by t.transdate desc;
	
create or replace view v_expenses as
	select l.*,t.transdate, a.name from ledgerentries as l
	join transactions as t on l.trans = t.id
	join accounts as a on l.account = a.id
	join accounttypes as at on a.accounttype = at.id
	where at.name = 'Expenses' order by t.transdate desc;