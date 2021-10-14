--Queries I used to create eaas user. App expects there to be a user named eaas with read/write privileges
CREATE USER 'eaas'@'localhost' IDENTIFIED BY 'bluefish';
GRANT ALL PRIVILEGES ON eaas.* TO 'eaas'@'localhost';
FLUSH PRIVILEGES;