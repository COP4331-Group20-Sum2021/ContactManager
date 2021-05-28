
/* Insert new users in the database. */
/* Used for the register API */
INSERT INTO users (firstname,lastname,login,password) VALUES ('Nate','Wilk','N8','abc123');
INSERT INTO users (firstname,lastname,login,password) VALUES ('John','Doe','jdoe','abc123');
INSERT INTO users (firstname,lastname,login,password) VALUES ('Cool','Joe','cjoe','abc123');

/* Insert new contacts in the database. */
/* Used for the add contacts API */
INSERT INTO contacts (firstname,lastname,userid,phone,email,description) VALUES ('Cool','Guy',1,'999999999','cool@cool.com','dude I met at the park');
INSERT INTO contacts (firstname,lastname,userid,phone,email,description) VALUES ('Ice','Cream',1,'888888888','ice@cream.com','Free ice cream treats');
INSERT INTO contacts (firstname,lastname,userid,phone,email,description) VALUES ('BBQ','Guy',1,'777777777','BBQ@guy.com','BBQ Social');
INSERT INTO contacts (firstname,lastname,userid,phone,email,description) VALUES ('Cool','Guy',2,'999999999','cool@cool.com','dude I met at the park');
INSERT INTO contacts (firstname,lastname,userid,phone,email,description) VALUES ('Cool','Guy',3,'999999999','cool@cool.com','dude I met at the park');