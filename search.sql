/* Generic form: userid receives an int and then firstname & lastname receives a string that can be partial */
SELECT * FROM contacts WHERE userid=? and (firstname like "%?%" or lastname like "%?%");

/* Examples: */

/* 1. This query is looking for all contacts that are owned by userid 1 and have the substring
'jose' in their last name or in the first name.
Ex: the firstnames jose, joseph, joselindo would trigger this query.
*/
SELECT * FROM contacts WHERE userid=1 and (firstname like "%jose%" or lastname like "%jose%");