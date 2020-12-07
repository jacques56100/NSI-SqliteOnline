PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Lignes;
DROP TABLE IF EXISTS Commandes;
DROP TABLE IF EXISTS Sandwichs;
DROP TABLE IF EXISTS Clients;

CREATE TABLE Clients( id INT PRIMARY KEY NOT NULL,
                      nom TEXT,
                      adresse TEXT, 
                      ville TEXT,
                      telephone TEXT);

CREATE TABLE Sandwichs( id INT PRIMARY KEY NOT NULL,
                        nom TEXT,
                        prix REAL);

CREATE TABLE Commandes( id INT PRIMARY KEY NOT NULL,
                        date DATE,
                        client int,
FOREIGN KEY (client) REFERENCES Clients(id)
);

CREATE TABLE Lignes( id INT PRIMARY KEY NOT NULL,
                      commande INT,
                      sandwich INT,
                      nombre INT,
FOREIGN KEY (commande) REFERENCES Commandes(id),
FOREIGN KEY (sandwich) REFERENCES Sandwichs(id)
);

INSERT INTO Sandwichs VALUES (1,'Cheeseburger',2.0);
INSERT INTO Sandwichs VALUES (2,'Double Cheeseburger',3.50);
INSERT INTO Sandwichs VALUES (3,'Triple Cheeseburger',5.0);
INSERT INTO Sandwichs VALUES (4,'Fois gras Deluxe',10.0);

INSERT INTO Clients VALUES (1,'Chenadec Elouarn','5 rue du Port','Ploemeur','07 70 00 77 00');
INSERT INTO Clients VALUES (2,'Robic Eliaz','10 quai des bavards','Lorient','06 77 66 88 24');
INSERT INTO Clients VALUES (3,'Le Calvez Gaël','5 route de Larmor','Lorient','07 84 85 65 54');
INSERT INTO Clients VALUES (4,'Guenezan Maewenn','10 pont du bonhomme','Lanester','07 68 69 26 54');

INSERT INTO Commandes VALUES (1,'2020-12-08',1);
INSERT INTO Commandes VALUES (2,'2020-12-09',1);
INSERT INTO Commandes VALUES (3,'2020-12-09',2);
INSERT INTO Commandes VALUES (4,'2020-12-10',2);
INSERT INTO Commandes VALUES (5,'2020-12-10',3);
INSERT INTO Commandes VALUES (6,'2020-12-11',4);

INSERT INTO Lignes VALUES(1,1,1,1);
INSERT INTO Lignes VALUES(2,1,3,1);
INSERT INTO Lignes VALUES(3,2,2,2);
INSERT INTO Lignes VALUES(4,3,3,1);
INSERT INTO Lignes VALUES(5,3,4,2);
INSERT INTO Lignes VALUES(6,4,3,1);
INSERT INTO Lignes VALUES(7,4,4,3);
INSERT INTO Lignes VALUES(8,5,4,3);
INSERT INTO Lignes VALUES(9,6,1,2);
INSERT INTO Lignes VALUES(10,6,3,1);

