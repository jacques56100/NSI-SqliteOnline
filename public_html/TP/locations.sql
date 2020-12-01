PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Locations;
DROP TABLE IF EXISTS Agences;
DROP TABLE IF EXISTS Vehicules;

CREATE TABLE Agences( id INT PRIMARY KEY NOT NULL,
                        nom TEXT,
                        adresse TEXT, 
                        code TEXT,
                        ville TEXT,
                        pays TEXT);

CREATE TABLE Vehicules( immatriculation TEXT PRIMARY KEY NOT NULL,
                        nom TEXT,                        
                        kilometrage INT,
                        age INT);

CREATE TABLE Locations( id INT PRIMARY KEY NOT NULL,
                        vehicule TEXT NOT NULL,
                        depart INT NOT NULL,
                        retour INT NOT NULL,
                        kilometrage int,
                        date date,
                        duree int,
FOREIGN KEY (vehicule) REFERENCES Vehicules(immatriculation),
FOREIGN KEY (depart) REFERENCES Agences(id),
FOREIGN KEY (retour) REFERENCES Agences(id)
);

INSERT INTO Agences VALUES (1,'Sépamieuayeur', '5 quai des bavards','56100','Lorient','France');
INSERT INTO Agences VALUES (2,'Moincheryapa','4 rue Parmentier','56100','Lorient','France');
INSERT INTO Agences VALUES (3,'Pacher','5 avenue du lac','56000','Vannes','France');
INSERT INTO Agences VALUES (4,'Pourcoipahici','45 boulevard Leon Blum','56100','Lorient','France');
INSERT INTO Agences VALUES (5,'Quiquanveu','45 rue de Siam','29000','Brest','France');
INSERT INTO Agences VALUES (6,'Pafameu','35 route de Lorient','35000','Rennes','France');
INSERT INTO Agences VALUES (7,'Padarnac','45 rue du Soleil','31000','Toulouse','France');
INSERT INTO Agences VALUES (8,'Assébienpourtoi','5 place de la Lune','33000','Bordeaux','France');
INSERT INTO Agences VALUES (9,'Falépa','18 boulevard des bavards','29990', 'Île de Sein','France');
INSERT INTO Agences VALUES (10,'Pacherdutou','15 boulevard des muets','75001','Paris','France');
INSERT INTO Agences VALUES (11,'Pourcoipala','18 boulevard de la mer','22300','Lannion','France');
INSERT INTO Agences VALUES (12,'Viendonc','18 route de la plage','78000','Versailles','France');

INSERT INTO Vehicules VALUES ('AB-224-BA','Renault Megane',156107,6);
INSERT INTO Vehicules VALUES ('CB-424-BC','Renault Megane',55108,3);
INSERT INTO Vehicules VALUES ('DB-566-DF','Renault Megane',165150,5);
INSERT INTO Vehicules VALUES ('CC-259-FF','Renault Twingo',61458,5);
INSERT INTO Vehicules VALUES ('DF-269-EF','Renault Twingo',134340,5);
INSERT INTO Vehicules VALUES ('DE-254-AE','Peugeot 108',215460,4);
INSERT INTO Vehicules VALUES ('ED-587-EE','Peugeot 108',155465,4);
INSERT INTO Vehicules VALUES ('AA-654-BA','Peugeot 108',115890,6);
INSERT INTO Vehicules VALUES ('EE-854-EF','Citroën C4',91105,6);
INSERT INTO Vehicules VALUES ('AE-478-DD','Citroën C5',2589,8);

INSERT INTO Locations VALUES (1,'AB-224-BA',1,1,452,'2020-05-03',1);
INSERT INTO Locations VALUES (3,'AB-224-BA',3,1,1402,'2020-07-10',1);
INSERT INTO Locations VALUES (2,'AB-224-BA',1,3,1354,'2020-06-05',2);
INSERT INTO Locations VALUES (4,'CB-424-BC',1,1,1457,'2020-05-10',1);
INSERT INTO Locations VALUES (5,'CB-424-BC',1,1,153,'2020-01-02',1);
INSERT INTO Locations VALUES (6,'DB-566-DF',2,2,457,'2020-06-24',1);
INSERT INTO Locations VALUES (7,'DB-566-DF',5,1,1584,'2020-08-30',1);
INSERT INTO Locations VALUES (8,'DF-269-EF',7,1,1358,'2020-02-19',1);
INSERT INTO Locations VALUES (9,'ED-587-EE',1,7,1587,'2020-04-11',1);
INSERT INTO Locations VALUES (10,'EE-854-EF',4,4,1333,'2020-11-08',3);
INSERT INTO Locations VALUES (11,'ED-587-EE',4,2,1248,'2020-10-01',1);
INSERT INTO Locations VALUES (12,'EE-854-EF',7,7,1387,'2020-05-05',1);
INSERT INTO Locations VALUES (13,'DF-269-EF',6,6,457,'2020-07-08',1);
INSERT INTO Locations VALUES (14,'CC-259-FF',6,6,310,'2020-09-09',1);
INSERT INTO Locations VALUES (15,'AB-224-BA',6,1,745,'2020-04-10',1);
INSERT INTO Locations VALUES (16,'DB-566-DF',7,8,387,'2020-07-11',1);
INSERT INTO Locations VALUES (17,'CC-259-FF',8,8,1159,'2020-08-20',1);
INSERT INTO Locations VALUES (18,'DF-269-EF',3,1,147,'2020-11-23',1);
INSERT INTO Locations VALUES (19,'DE-254-AE',5,5,1147,'2020-10-17',1);
INSERT INTO Locations VALUES (20,'AA-654-BA',6,6,1357,'2020-11-27',1);
INSERT INTO Locations VALUES (21,'ED-587-EE',6,6,1485,'2020-10-29',1);
INSERT INTO Locations VALUES (22,'CC-259-FF',7,7,1597,'2020-09-30',1);
INSERT INTO Locations VALUES (23,'DB-566-DF',7,8,1357,'2020-06-18',3);
INSERT INTO Locations VALUES (24,'EE-854-EF',9,9,1248,'2020-09-20',1);
INSERT INTO Locations VALUES (25,'CC-259-FF',2,2,1456,'2020-05-16',2);
INSERT INTO Locations VALUES (26,'DE-254-AE',2,3,1789,'2020-03-15',2);
INSERT INTO Locations VALUES (27,'AB-224-BA',1,1,1374,'2020-05-12',1);
INSERT INTO Locations VALUES (28,'AB-224-BA',1,5,1080,'2020-07-15',1);
INSERT INTO Locations VALUES (29,'AB-224-BA',5,5,680,'2020-07-18',1);
INSERT INTO Locations VALUES (30,'AB-224-BA',5,6,240,'2020-08-05',1);
INSERT INTO Locations VALUES (31,'AB-224-BA',6,1,168,'2020-08-08',1);
INSERT INTO Locations VALUES (32,'CB-424-BC',6,6,1457,'2020-04-09',1);
INSERT INTO Locations VALUES (33,'DF-269-EF',3,3,183,'2020-06-15',2);
INSERT INTO Locations VALUES (34,'DF-269-EF',3,1,NULL,'2020-12-24',1);
INSERT INTO Locations VALUES (35,'DE-254-AE',5,5,NULL,'2020-12-24',1);
INSERT INTO Locations VALUES (36,'AA-654-BA',7,7,NULL,'2020-12-24',1);
INSERT INTO Locations VALUES (37,'CB-424-BC',3,6,NULL,'2020-12-24',2);
INSERT INTO Locations VALUES (38,'DB-566-DF',4,8,NULL,'2020-12-24',1);
INSERT INTO Locations VALUES (39,'EE-854-EF',9,9,NULL,'2020-10-23',0);
INSERT INTO Locations VALUES (40,'AE-478-DD',1,1,NULL,'2020-06-01',0);



