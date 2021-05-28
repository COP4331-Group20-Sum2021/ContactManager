/* Generic form: id receives an integer which corresponds to the id of the *contact* (not the userid, it's the primary key contact!) */
DELETE FROM contacts WHERE id=?;

/* Example: Will delete the contact that has id=10*/
DELETE FROM contacts WHERE id=10;