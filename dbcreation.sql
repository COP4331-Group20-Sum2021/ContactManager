CREATE DATABASE ContactManager;

CREATE TABLE `ContactManager`.`users`
  (
     `id`               INT NOT NULL auto_increment,
     `datecreated`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `datelastloggedin` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `firstname`        VARCHAR(50) NOT NULL DEFAULT '',
     `lastname`         VARCHAR(50) NOT NULL DEFAULT '',
     `login`            VARCHAR(50) NOT NULL DEFAULT '',
     `password`         VARCHAR(50) NOT NULL DEFAULT '',
     PRIMARY KEY (`id`)
  )
engine = innodb;

CREATE TABLE `ContactManager`.`contacts`
  (
     `id`     INT NOT NULL auto_increment,
     `firstname`   VARCHAR(50) NOT NULL DEFAULT '',
     `lastname`   VARCHAR(50) NOT NULL DEFAULT '',
     `userid` INT NOT NULL DEFAULT '0',
     `phone` VARCHAR(50) NOT NULL DEFAULT '',
     `email` VARCHAR(50) NOT NULL DEFAULT '',
     `description` VARCHAR(100) NOT NULL DEFAULT '',
     `lastupdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (`id`),
     FOREIGN KEY (userid) REFERENCES users(id)
  )
engine = innodb; 
