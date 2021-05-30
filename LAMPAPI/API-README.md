# PHP input and out put doccumentation
This readme will serve as doccumentation of the expected json input to, and expected json result, for the php api code. All json keys and file names are case sensitive.

# Login.php
## Input:
```json
{
    "login": "string",
    "password": "string"
}
```
 - `login` should be the raw login
 - `password` should be the md5 of the raw password

## Output:
```json
{
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "error": "string"
}
```
`id` is a number.  
On failure, `id` will be zero, `firstName` and `lastName` will be empty, and `error` will contain the error reason for failure.  
On success, `id`, `firstName` and `lastName` will be their values in the database, and `error` will be empty.

# register.php
## Input:
```json
{
    "login": "example",
    "password": "example",
    "firstname": "example",
    "lastname": "example"
}
```
 - `login` should be the raw login
 - `password` should be the md5 of the raw password
 - `firstname` should be the first name of the user
 - `lastname` should be the last name of the user 

## Output:
```json
{
    "status": "string",
    "message": "string"
}
```
 - `status` will either be `"success"` or `"failure"`.
 - `message` will contain the failure message or `"Register succeeded."` on success


# update.php
This end point requires at all fields of a contact are sent, event if they were not updated.
## Input:
```json
{
    "firstname": "example",
    "lastname": "example",
    "phone": "example",
    "email": "example",
    "description": "example",
    "id": 0
}
```
 - `firstname` is the firstname of the contact
 - `lastname`is the last name of the contact
 - `phone` is the phone number of the contact
 - `email` is the email of the contact
 - `description` is the description for the contact
 - `id` is the id of the contact record, and is a number. 

## Output:
```json
{
    "status": "string",
    "message": "string"
}
```
 - `status` will either be `"success"` or `"failure"`.
 - `message` will contain the failure message or `"Update succeeded."` on success

# search.php
## Input:
```json
{
    "userid": 1,
    "searchterm": "string"
}
```
 - `userid` is the id asociated with the currently logged in user
 - `searchterm` is the term to search by

The search willl be conducted on a wild card basis. Any contact for the provided user id that has the value of `searchterm` anywhere in the asociated first or last name fields will be treated as a match.  
To retrieve all contacts asociated with `userid`, provie `""` as the value of `searchterm`.

## Output:
```json
{
    "results": [
        {
            "id": 1,
            "firstname": "string",
            "lastname": "string",
            "phone": "string",
            "email": "string",
            "description": "string",
        },
        {
            "id": 1,
            "firstname": "string",
            "lastname": "string",
            "phone": "string",
            "email": "string",
            "description": "string",
        }
    ],
    "error": "string"
}
```
 - `results` is an array of 0 to N json obejects representing contacts that match the search query. These objects all follow the following format:
    - `id` the id of the contact
    - `firstname` the first name of the contact
    - `lastname` the last name of the contact
    - `phone` the phone number of the contact
    - `email` the email of the contact
    - `description` the description of the contact
 - `error` will be an empty string upon success, `"No Records Found."` if no records match in the databse, or an error message upon failure in the database.

# futureapi.php
## Input:
```json
{
    "example": "example"
}
```

## Output:
```json
{
    "example": "example"
}
```

# futureapi.php
## Input:
```json
{
    "example": "example"
}
```

## Output:
```json
{
    "example": "example"
}
```

# futureapi.php
## Input:
```json
{
    "example": "example"
}
```

## Output:
```json
{
    "example": "example"
}
```
this is an example for future api end points that do not yet exist