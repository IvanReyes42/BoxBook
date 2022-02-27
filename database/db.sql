create database BoxBook;
use BoxBook;

create table Users(
    IdUser int primary key AUTO_INCREMENT,
    UserName varchar(50) not null,
    password varchar(60) not null,
    FullName varchar(50) not null
);

create table Books(
    IdBook int primary key AUTO_INCREMENT,
    ISBN varchar(15) not null,
    Title varchar(100) not null,
    Authors varchar(200) not null,
    Editoral varchar(100) not null,
    Gender varchar(50) not null,
    Year varchar(4) not null,
    Qualification int not null,
    Review varchar(200) not null,
    CoverPage varchar(200) not null,
     Status enum('To read', 'Reading','Finished') not null,
    FkIdUser int,
    Foreign Key (FkIdUser) REFERENCES Users(IdUser)
);

create table comments(
    Idcomment int primary key AUTO_INCREMENT,
    Comment varchar(200) not null,
    FkIdBook int not null,
    FkIdUser int not null,
    Foreign Key (FkIdUser) REFERENCES Users(IdUser),
    Foreign Key (FkIdBook) REFERENCES Books(IdBook)
);

create table Progress(
    IdProgress int primary key AUTO_INCREMENT,
    Percentage int not null,
    comment varchar(200) not null,
    FkIdBook int not null,
    Foreign Key (FkIdBook) REFERENCES Books(IdBook)
);

