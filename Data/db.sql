CREATE DATABASE taskList;
use taskList;

CREATE TABLE `user`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR (50) NOT NULL,
    correo VARCHAR (50) NOT NULL
);

CREATE TABLE task(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUser INT NOT NULL,
    title VARCHAR (100) NOT NULL,
    compleTED BOOLEAN DEFAULT false,
    FOREIGN KEY(idUser) REFERENCES user(id)
);