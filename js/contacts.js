readCookie();

// =============================================================================
// Selectors:
// =============================================================================

const firstNameContact = document.getElementById('firstName');
const lastNameContact = document.getElementById('lastName');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const descriptionField = document.getElementById('description');
const getDescriptionText = document.querySelector('.description-text');

const getPlusButton = document.getElementById('plusButton');
const getCloseButton = document.querySelector('.close');
const getEditCloseButton = document.querySelector('.edit-close');
const getConfirmCloseButton = document.querySelector('.confirm-delete-close');

const getDoneButton = document.querySelector('.done-button');
const contactsTable = document.querySelector('.contacts-body');

const getSearchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

// =============================================================================
// Event Listeners:
// =============================================================================

firstNameContact.addEventListener('input', getFirstName);
lastNameContact.addEventListener('input', getLastName);
emailField.addEventListener('input', getEmail);
phoneField.addEventListener('input', getPhone);
descriptionField.addEventListener('input', getDescription);

getPlusButton.addEventListener('click', plusButton);
getDoneButton.addEventListener('click', addContact);
getCloseButton.addEventListener('click', closeButton);
getEditCloseButton.addEventListener('click', closeEditButton);
getConfirmCloseButton.addEventListener('click', closeConfirmButton);

contactsTable.addEventListener('click', deleteRow);
contactsTable.addEventListener('click', editRow);
contactsTable.addEventListener('click', descriptionDisplay);

searchButton.addEventListener('click', runSearch);

// =============================================================================
// Functions:
// =============================================================================

// get first name and first letter inputed into the 'First Name' field
let input;
let firstInitial;
function getFirstName(e)
{
    input = e.target.value;
    firstInitial = input.charAt(0);
    let fl = firstInitial + lastInitial;

    if (input2 != undefined)
        printInitials(fl);
    else
        printInitials(firstInitial);
}

// get last name and first letter inputed into the 'Last Name' field
let input2;
let lastInitial;
function getLastName(e)
{
    input2 = e.target.value;
    lastInitial = input2.charAt(0);
    let fl = firstInitial + lastInitial;

    printInitials(fl);
}

// print initials
function printInitials(i)
{
    document.getElementById("fl").innerHTML = i;
}

// get email
let input3;
function getEmail(e)
{
    input3 = e.target.value;
}

// get phone number
let input4;
function getPhone(e)
{
    input4 = e.target.value;
}

// get description
let input5;
function getDescription(e)
{
    input5 = e.target.value;
}

// display description when clicking on name
function descriptionDisplay(e)
{
    e.preventDefault();
    const b = e.target;

    if (b.classList[0] === 'name-description')
    {
        document.querySelector('.bg-modal-description').style.display = 'flex';

        let nameCell = b.parentElement;
        if (b.nodeName === 'SPAN') 
        {
            nameCell = nameCell.parentElement;
        }

        const desc = nameCell.querySelector('.description-text');
        const description = desc.innerText;
        
        getDescriptionText.innerText = description;
    }
}

// close description when clicking the 'x' button
function descriptionClose()
{
    document.querySelector('.bg-modal-description').style.display = 'none';
}

// open add contact popup with the plus button
function plusButton()
{
    document.querySelector('.bg-modal').style.display = 'flex';
}

// close add contact popup with 'x' button
function closeButton()
{
    document.querySelector('.bg-modal').style.display = 'none';
}

// close delete contact popup with 'x' button
function closeConfirmButton()
{
    document.querySelector('.bg-modal-confirm-delete').style.display = 'none';
}

// close edit contact popup with 'x' button
function closeEditButton()
{
    document.querySelector('.edit-bg-modal').style.display = 'none';
}

// add contact
function addContact(e)
{
    e.preventDefault();

    document.getElementById("search-error").style.display = 'none';

    // creates new <tr> element
    const contactRow = document.createElement('tr');
    contactRow.classList.add('contactRow');

    // creates new <td> element
    const pp = document.createElement('td');
    pp.classList.add('profile-pic');

    // = = = = = START CIRCLE CREATION = = = = =
    const parentSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    parentSvg.classList.add('circle-svg');
    parentSvg.setAttribute('width', '60');
    parentSvg.setAttribute('height', '60');
    pp.appendChild(parentSvg);

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    parentSvg.appendChild(group);

    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', '30');
    circle.setAttribute('cy', '30');
    circle.setAttribute('r', '20');
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('fill', 'none');
    group.appendChild(circle);

    const newInitials = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    newInitials.innerHTML = firstNameContact.value.charAt(0) + lastNameContact.value.charAt(0);
    newInitials.classList.add('initials-item');
    newInitials.setAttribute('x', '50%');
    newInitials.setAttribute('y', '50%');
    newInitials.setAttribute('text-anchor', 'middle');
    newInitials.setAttribute('fill', 'white');
    newInitials.setAttribute('stroke', 'none');
    newInitials.setAttribute('dy', '0.3em');
    group.appendChild(newInitials);
    contactRow.appendChild(pp);
    // = = = = = END CIRCLE CREATION = = = = =

    const newContact = document.createElement('td');

    newContact.innerHTML = '<a class="name-description">' + input + " " + 
        '<span class="name-description">' + input2 + '</span></a>';

    newContact.classList.add('name-item');
    contactRow.appendChild(newContact);

    // description
    const descriptionInsert = document.createElement('p');
    descriptionInsert.classList.add("description-text");
    descriptionInsert.innerHTML = input5;
    newContact.appendChild(descriptionInsert);

    // email
    const newEmail = document.createElement('td');
    newEmail.innerText = input3;
    newEmail.classList.add('email-item');
    contactRow.appendChild(newEmail);

    // phone
    const newPhone = document.createElement('td');
    const opar = "(";
    const cpar = ")";
    const dash = "-";
    const ac = input4.slice(0, 3);
    const num3 = input4.slice(3, 6);
    const num4 = input4.slice(6, 11);
    const phonenumber = opar + ac + cpar + " " + num3 + dash + num4;
    newPhone.innerText = phonenumber;
    newPhone.classList.add('phone-item');
    contactRow.appendChild(newPhone);

    // create edit button
    const editButton = document.createElement('td');
    editButton.innerHTML = '<button class="edit-button"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>';
    editButton.classList.add('edit-btn');
    contactRow.appendChild(editButton);

    // create delete button
    const deleteButton = document.createElement('td');
    deleteButton.innerHTML = '<button class="delete-button"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>';
    deleteButton.classList.add('delete-btn');
    contactRow.appendChild(deleteButton);

    // =======================
    // Insert contact into API
    // =======================
    var fname = firstNameContact.value;
    var lname = lastNameContact.value;
    var email = emailField.value;
    var phone = phoneField.value;
    var userid = userId;
    var desc = descriptionField.value;

    var jsonPayload = JSON.stringify({
        "firstname": fname.trim(),
        "lastname": lname.trim(),
        "phone": phone.trim(),
        "email": email.trim(),
        "userid": userid,
        "description": desc.trim()
    });

    console.log(jsonPayload);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://cop4331-group20.ddns.net/LAMPAPI/insertcontact.php", true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var jsonObject = JSON.parse(xhr.responseText);
                console.log(jsonObject);
                //alert(xhr.responseText);
                if (jsonObject.status === "error")
                {
                    // Insert ID of error box div into the quotes.
                    document.getElementById("add-error").innerHTML = jsonObject.message;
                    return;
                }
                
                var contactId = jsonObject.id;
                
                deleteButton.dataset.id = contactId;
                editButton.dataset.id = contactId;

                contactsTable.appendChild(contactRow);
        
                sortTableByColumn(document.querySelector('.contacts-table'), 1);

                document.querySelector('.bg-modal').style.display = 'none';
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("add-error").innerHTML = err.message;
        console.log(err.message);
    }
}

// sort table on the front end
function sortTableByColumn(table, column, asc = true)
{
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) =>
    {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`)
        .querySelector('.name-description').textContent.trim().split(" ");
        
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`)
        .querySelector('.name-description').textContent.trim().split(" ");

        aColText[1] = aColText[1].toUpperCase();
        bColText[1] = bColText[1].toUpperCase();

        console.log(aColText[1]);

        if(aColText[1] == bColText[1])
        {
            aColText[0] = aColText[0].toUpperCase();
            bColText[0] = bColText[0].toUpperCase();

            return aColText[0] > bColText[0] ? (1 * dirModifier) : (-1 * dirModifier);
        }

        return aColText[1] > bColText[1] ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild)
    {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);
}

// edit contact
function editRow(e)
{
    e.preventDefault();
    const b = e.target;

    if (b.classList[0] === 'edit-button')
    {
        document.getElementById("search-error").style.display = 'none';

        var contactId = b.parentElement.dataset.id;

        // show dialog
        document.querySelector('.edit-bg-modal').style.display = 'flex';

        const editFirstNameContact = document.getElementById('edit-firstName');
        const editLastNameContact = document.getElementById('edit-lastName');
        const editEmailContact = document.getElementById('edit-email');
        const editPhoneContact = document.getElementById('edit-phone');
        const editInitials = document.getElementById('edit-fl');
        const editDescriptionContact = document.getElementById('edit-description');

        // get original info
        const editCell = b.parentElement;
        const contactRow = editCell.parentElement;
        const initialsChild = contactRow.childNodes[0].innerText;
        const nameChild = contactRow.childNodes[1].innerText;
        const emailChild = contactRow.childNodes[2].innerText;
        const phoneChild = contactRow.childNodes[3].innerText;
        const descChild = contactRow.childNodes[1].querySelector('.description-text').innerHTML;

        const nameArr = nameChild.split(" ");
        const numPhone = phoneChild.replace(/[()-]/g, "").replace(" ", "");


        editFirstNameContact.value = nameArr[0];
        editLastNameContact.value = nameArr[1];
        editEmailContact.value = emailChild;
        editPhoneContact.value = numPhone;
        editInitials.innerHTML = initialsChild;
        editDescriptionContact.value = descChild;

        editFirstNameContact.addEventListener('keyup', editFirstName);
        editLastNameContact.addEventListener('keyup', editLastName);
        editEmailContact.addEventListener('keyup', editEmail);
        editPhoneContact.addEventListener('keyup', editPhone);
        editDescriptionContact.addEventListener('keyup', editDescription);

        let editinput1 = nameArr[0];
        function editFirstName(e)
        {
            editinput1 = e.target.value;
            firstInitial = editinput1.charAt(0);
            let fl = firstInitial + lastInitial;

            if (editinput2 != undefined)
                editprintInitials(fl);
            else
                editprintInitials(firstInitial);
        }

        let editinput2 = nameArr[1];
        function editLastName(e)
        {
            editinput2 = e.target.value;
            lastInitial = editinput2.charAt(0);
            let fl = firstInitial + lastInitial;

            editprintInitials(fl);
        }

        function editprintInitials(i)
        {
            document.getElementById("edit-fl").innerHTML = i;
        }

        let editinput3 = emailChild;
        function editEmail(e)
        {
            editinput3 = e.target.value;
        }

        let editinput4 = numPhone;
        function editPhone(e)
        {
            editinput4 = e.target.value;
        }

        let editinput5 = descChild;
        function editDescription(e)
        {
            editinput5 = e.target.value;
        }


        document.querySelector('.edit-done-button').onclick = function(e)
        {
            e.preventDefault();

            // =======================
            // Edit contact in API
            // =======================
            var jsonPayload = JSON.stringify({
                "firstname": editinput1.trim(),
                "lastname": editinput2.trim(),
                "phone": editinput4.trim(),
                "email": editinput3.trim(),
                "id": contactId, 
                "description": editinput5.trim()
            });

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://cop4331-group20.ddns.net/LAMPAPI/update.php", true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

            try
            {
                xhr.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                    {
                        var jsonObject = JSON.parse(xhr.responseText);
                        console.log(jsonObject);
                        //alert(xhr.responseText);
                        
                        if (jsonObject.status === "error")
                        {
                            // Insert ID of error box div into the quotes.
                            document.getElementById("edit-error").innerHTML = jsonObject.message;
                            return;
                        }

                        // edit initials
                        contactRow.querySelector("text").innerHTML = editinput1.charAt(0) + 
                            editinput2.charAt(0);
            
                        // edit name
                        contactRow.childNodes[1].innerHTML = '<a class="name-description">' 
                            + editinput1 + " " + '<span class="name-description">' + editinput2 + '</span></a>';
            
                        // edit email
                        contactRow.childNodes[2].innerText = editinput3;

                        // edit description
                        const descriptionInsert = document.createElement('p');
                        descriptionInsert.classList.add("description-text");
                        descriptionInsert.innerHTML = editinput5;
                        contactRow.childNodes[1].appendChild(descriptionInsert);
            
                        // edit phone number
                        const opar = "(";
                        const cpar = ")";
                        const dash = "-";
                        const ac = editinput4.slice(0, 3);
                        const num3 = editinput4.slice(3, 6);
                        const num4 = editinput4.slice(6, 11);
                        const phonenumber = opar + ac + cpar + " " + num3 + dash + num4;
                        contactRow.childNodes[3].innerText = phonenumber;
            
                        // sort table and close dialog
                        sortTableByColumn(document.querySelector('.contacts-table'), 1);
                        document.querySelector('.edit-bg-modal').style.display = 'none';
                    }
                };
                xhr.send(jsonPayload);
            }
            catch(err)
            {
                // Insert ID of error box div into the quotes.
                document.getElementById("edit-error").innerHTML = err.message;
                console.log(err.message);
            }
            
        }
    }
}

// delete contact
function deleteRow(e)
{
    e.preventDefault();
    const b = e.target;

    if (b.classList[0] === 'delete-button')
    {
        document.getElementById("search-error").style.display = 'none';
        
        var contactId = b.parentElement.dataset.id;

        // show confirm dialog
        document.querySelector('.bg-modal-confirm-delete').style.display = 'flex';

        document.querySelector('.confirm-button').onclick = function()
        {
            // =======================
            // Delete contact in API
            // =======================

            var jsonPayload = JSON.stringify({"id": contactId});

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://cop4331-group20.ddns.net/LAMPAPI/deletecontact.php", true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

            try
            {
                xhr.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                    {
                        var jsonObject = JSON.parse(xhr.responseText);
                        console.log(jsonObject);
                        //alert(xhr.responseText);

                        if (jsonObject.status === "error")
                        {
                            // Insert ID of error box div into the quotes.
                            document.getElementById("delete-error").innerHTML = jsonObject.message;
                            return;
                        }
                        
                        // hide dialog
                        document.querySelector('.bg-modal-confirm-delete').style.display = 'none';
                        const contactCell = b.parentElement;
                        const contactRow = contactCell.parentElement;
                        contactRow.remove();
                    }
                };
                xhr.send(jsonPayload);
            }
            catch(err)
            {
                // Insert ID of error box div into the quotes.
                document.getElementById("delete-error").innerHTML = err.message;
                console.log(err.message);
            }
        }
    }
}

// run search in API
function runSearch()
{
    let searchTerm = getSearchInput.value;

    var jsonPayload = JSON.stringify({"userid": userId, "searchterm": searchTerm});
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://cop4331-group20.ddns.net/LAMPAPI/search.php", true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var jsonObject = JSON.parse(xhr.responseText);
                console.log(jsonObject);
                //alert(xhr.responseText);

                if (jsonObject.error !== "")
                {
                    // Insert ID of error box div into the quotes.
                    document.getElementById("search-error").style.display = 'flex';
                    document.getElementById("search-error").innerHTML = "! " + jsonObject.message;
                    addResultsToTable(jsonObject.results);
                    return;
                }
                document.getElementById("search-error").style.display = 'none';
                addResultsToTable(jsonObject.results);
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        // Insert ID of error box div into the quotes.
        document.getElementById("search-error").style.display = 'flex';
        document.getElementById("search-error").innerHTML = "! " + err.message;
        console.log(err.message);
    }
}

// removes the whole table after search
function addResultsToTable(results)
{
    // nukes the current table
    contactsTable.innerHTML = "";

    for (var i = 0; i < results.length; i++) {
        var fname = results[i].firstname;
        var lname = results[i].lastname;
        var phone = results[i].phone;
        var email = results[i].email;
        var descr = results[i].description;
        var contactId = results[i].id;

        // creates new <tr> element
        const contactRow = document.createElement('tr');
        contactRow.classList.add('contactRow');

        // creates new <td> element
        const pp = document.createElement('td');
        pp.classList.add('profile-pic');

        // = = = = = START CIRCLE CREATION = = = = =
        const parentSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        parentSvg.classList.add('circle-svg');
        parentSvg.setAttribute('width', '60');
        parentSvg.setAttribute('height', '60');
        pp.appendChild(parentSvg);

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        parentSvg.appendChild(group);

        const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttribute('cx', '30');
        circle.setAttribute('cy', '30');
        circle.setAttribute('r', '20');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'none');
        group.appendChild(circle);

        const newInitials = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newInitials.innerHTML = fname.charAt(0) + lname.charAt(0);
        newInitials.classList.add('initials-item');
        newInitials.setAttribute('x', '50%');
        newInitials.setAttribute('y', '50%');
        newInitials.setAttribute('text-anchor', 'middle');
        newInitials.setAttribute('fill', 'white');
        newInitials.setAttribute('stroke', 'none');
        newInitials.setAttribute('dy', '0.3em');
        group.appendChild(newInitials);
        contactRow.appendChild(pp);
        // = = = = = END CIRCLE CREATION = = = = =

        const newContact = document.createElement('td');

        newContact.innerHTML = '<a class="name-description">' + fname + " " + 
            '<span class="name-description">' + lname + '</span></a>';

        newContact.classList.add('name-item');
        contactRow.appendChild(newContact);

        // description
        const descriptionInsert = document.createElement('p');
        descriptionInsert.classList.add("description-text");
        descriptionInsert.innerHTML = descr;
        newContact.appendChild(descriptionInsert);

        // email
        const newEmail = document.createElement('td');
        newEmail.innerText = email;
        newEmail.classList.add('email-item');
        contactRow.appendChild(newEmail);

        // phone
        const newPhone = document.createElement('td');
        const opar = "(";
        const cpar = ")";
        const dash = "-";
        const ac = phone.slice(0, 3);
        const num3 = phone.slice(3, 6);
        const num4 = phone.slice(6, 11);
        const phonenumber = opar + ac + cpar + " " + num3 + dash + num4;
        newPhone.innerText = phonenumber;
        newPhone.classList.add('phone-item');
        contactRow.appendChild(newPhone);

        const editButton = document.createElement('td');
        editButton.innerHTML = '<button class="edit-button"> <i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>';
        editButton.classList.add('edit-btn');
        editButton.dataset.id = contactId;
        contactRow.appendChild(editButton);

        const deleteButton = document.createElement('td');
        deleteButton.innerHTML = '<button class="delete-button"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>';
        deleteButton.classList.add('delete-btn');
        deleteButton.dataset.id = contactId;
        contactRow.appendChild(deleteButton);
        
        contactsTable.appendChild(contactRow);
    }
}
