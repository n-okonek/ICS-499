CREATE DATABASE `eaas`;

CREATE TABLE eaas.`role` (
  `role_id` int unsigned NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`)
);

CREATE TABLE eaas.`rom` (
  `rom_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `binary_blob` mediumblob,
  `hash` binary(16) DEFAULT NULL,
  PRIMARY KEY (`rom_id`)
);

CREATE TABLE eaas.`user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int unsigned DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `registered` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `profile` text,
  PRIMARY KEY (`user_id`),
  KEY `role_id_FK_idx` (`role_id`),
  CONSTRAINT `role_id_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE eaas.`user_rom` (
  `rom_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`rom_id`,`user_id`),
  KEY `user_id_FK` (`user_id`),
  CONSTRAINT `rom_id_FK` FOREIGN KEY (`rom_id`) REFERENCES `rom` (`rom_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE eaas.`save` (
  `save_id` int unsigned NOT NULL AUTO_INCREMENT,
  `rom_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`save_id`),
  KEY `rom_id_idx` (`rom_id`),
  KEY `save_user_id_FK_idx` (`user_id`),
  CONSTRAINT `save_rom_id_FK` FOREIGN KEY (`rom_id`) REFERENCES `rom` (`rom_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `save_user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

