DROP TABLE IF EXISTS Events;

CREATE TABLE Events (
    id SERIAL PRIMARY KEY,
    userId INT,
    username VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    tags TEXT[],
    image VARCHAR(255),
    location VARCHAR(255),
    eventDate TIMESTAMP NOT NULL,
    description TEXT,
    organizerName VARCHAR(255) NOT NULL,
    attendeesCount INT DEFAULT 0,
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    isActive BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_userId ON Events (userId);
CREATE INDEX idx_title ON Events (title);
CREATE INDEX idx_eventDate ON Events (eventDate);
CREATE INDEX idx_location ON Events (location);
CREATE INDEX idx_isActive ON Events (isActive);