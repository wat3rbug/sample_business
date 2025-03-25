create user 'dpsllcuser'@'10.0.0.%' identified by '1989E30BMW325i';
grant select on *.* to 'dpsllcsuser'@'10.0.0.%';
grant select, insert, update, delete on dpsllc.* to 'dpsllcuser'@'10.0.0.%';
grant select, insert, update, delete on dpsllc_pos.* to 'dpsllcuser'@'10.0.0.%';

create user 'dpsllcuser'@'localhost' identified by '1989E30BMW325i';
grant select on *.* to 'dpsllcuser'@'localhost';
grant select, insert, update, delete on dpsllc.* to 'dpsllcuser'@'localhost';
grant select, insert, update, delete on dpsllc_pos.* to 'dpsllcuser'@'localhost';
flush privileges;
