INSERT INTO movieortvtable ( bewertungs_wert, erscheinungs_jahr, ex_data_id, name)
VALUES (3,'2020-10-27',23,'Test');

INSERT INTO movieortvtable ( bewertungs_wert, erscheinungs_jahr, ex_data_id, name)
VALUES (4,'2040-11-27',53,'Testerone');

INSERT INTO movieortvtable ( bewertungs_wert, erscheinungs_jahr, ex_data_id, name)
VALUES (5,'2010-01-12',27,'Testus');

INSERT INTO movieortvtable ( bewertungs_wert, erscheinungs_jahr, ex_data_id, name)
VALUES (5, '1993-10-15',6, 'Judgment Night');


UPDATE movieortvtable SET bewertungs_wert = 5 WHERE name = 'Testerone';
DELETE FROM movieortvtable WHERE name = 'Testus'