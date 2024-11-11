DROP TABLE IF EXISTS Accolades;

CREATE TABLE Accolades (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255),
    message TEXT, 
    anonymus BOOLEAN,
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX idx_fullName ON Accolades (fullName);
CREATE INDEX idx_anonymus ON Accolades (anonymus);
CREATE INDEX idx_createdDate ON Accolades (createdDate);