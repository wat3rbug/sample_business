drop user 'dpsllcuser'@'10.0.0.%';
drop user 'dpsllcuser'@'localhost';
drop user 'posuser'@'10.0.0.%';
drop user 'posuser'@'localhost';
flush privileges;

create user 'dpsllcuser'@'10.0.0.%' identified by '1989E30BMW325i';
create user 'dpsllcuser'@'localhost' identified by '1989E30BMW325i';
create user 'posuser'@'localhost' identified by '2002E46BMW325i';
create user 'posuser'@'10.0.0.%' identified by '2002E46BMW325i';
flush privileges;

grant select on *.* to 'dpsllcsuser'@'10.0.0.%';
grant select on *.* to 'dpsllcuser'@'localhost';
grant select, insert, update, delete on dpsllc.* to 'dpsllcuser'@'10.0.0.%';
grant select, insert, update, delete on dpsllc.* to 'dpsllcuser'@'localhost';

grant select on *.* to 'posuser'@'10.0.0.%';
grant select on *.* to 'posuser'@'localhost';
grant select, insert, update, delete on dpsllcpos.* to 'posuser'@'10.0.0.%';
grant select, insert, update, delete on dpsllcpos.* to 'posuser'@'localhost';
flush privileges;
