DROP DATABASE IF EXISTS usernames_db;

CREATE DATABASE usernames_db;

USE usernames_db;

CREATE TABLE tblusernames (
    ID int NOT NULL IDENTITY,
    Username varchar(25) NOT NULL,
    Passwrd varchar(25) NOT NULL,
    PRIMARY KEY (ID)
);
