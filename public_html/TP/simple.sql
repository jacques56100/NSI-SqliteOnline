PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Agences;

CREATE TABLE Agences( id INT PRIMARY KEY NOT NULL,
                        nom TEXT,
                        adresse TEXT, 
                        code TEXT,
                        ville TEXT,
                        pays TEXT);

INSERT INTO Agences VALUES (1,'Saipamieuayeur', '5 quai des bavards','56100','Lorient','France');
INSERT INTO Agences VALUES (2,'Moincheryapa','4 rue Parmentier','56100','Lorient','France');
INSERT INTO Agences VALUES (3,'Pacher','5 avenue du lac','56000','Vannes','France');
INSERT INTO Agences VALUES (4,'Pourcoipahici','45 boulevard Leon Blum','56100','Lorient','France');
INSERT INTO Agences VALUES (5,'Quiquanveu','45 rue de Siam','29000','Brest','France');
INSERT INTO Agences VALUES (6,'Pafameu','35 route de Lorient','35000','Rennes','France');
INSERT INTO Agences VALUES (7,'Padarnac','45 rue du Soleil','31000','Toulouse','France');
INSERT INTO Agences VALUES (8,'Assaibienpourtoi','5 place de la Lune','33000','Bordeaux','France');
INSERT INTO Agences VALUES (9,'Falaipa','18 boulevard des bavards','29990', 'Ile de Sein','France');
INSERT INTO Agences VALUES (10,'Pacherdutou','15 boulevard des muets','75001','Paris','France');
INSERT INTO Agences VALUES (11,'Pourcoipala','18 boulevard de la mer','22300','Lannion','France');
INSERT INTO Agences VALUES (12,'Viendonc','18 route de la plage','78000','Versailles','France');

