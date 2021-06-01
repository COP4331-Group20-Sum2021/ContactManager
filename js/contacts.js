//readCookie();

// =============================================================================
// Selectors:
// =============================================================================

const firstNameContact = document.getElementById('firstName');
const lastNameContact = document.getElementById('lastName');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');

const getPlusButton = document.getElementById('plusButton');
const getCloseButton = document.querySelector('.close');
const getEditCloseButton = document.querySelector('.edit-close');
const getConfirmCloseButton = document.querySelector('.confirm-delete-close');

const getDoneButton = document.querySelector('.done-button');
const contactsTable = document.querySelector('.contacts-body');

// =============================================================================
// Event Listeners:
// =============================================================================

firstNameContact.addEventListener('keyup', getFirstName);
lastNameContact.addEventListener('keyup', getLastName);
emailField.addEventListener('keyup', getEmail);
phoneField.addEventListener('keyup', getPhone);

getPlusButton.addEventListener('click', plusButton);
getDoneButton.addEventListener('click', addContact);
getCloseButton.addEventListener('click', closeButton);
getEditCloseButton.addEventListener('click', closeEditButton);
getConfirmCloseButton.addEventListener('click', closeConfirmButton);

contactsTable.addEventListener('click', deleteRow);
contactsTable.addEventListener('click', editRow);

// =============================================================================
// Functions:
// =============================================================================

// get first letter inputed into the 'First Name' field
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

// get first letter inputed into the 'Last Name' field
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

// get first letter inputed into the 'Last Name' field
let input3;
function getEmail(e)
{
    input3 = e.target.value;
}

// get first letter inputed into the 'Last Name' field
let input4;
function getPhone(e)
{
    input4 = e.target.value;
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

// close add contact popup with 'x' button
function closeConfirmButton()
{
    document.querySelector('.bg-modal-confirm-delete').style.display = 'none';
}

// close add contact popup with 'x' button
function closeEditButton()
{
    document.querySelector('.edit-bg-modal').style.display = 'none';
}

// add contact
function addContact(e)
{
    e.preventDefault();
    document.querySelector('.bg-modal').style.display = 'none';

    if (input || input2 != (undefined || ""))
    {
        const contactRow = document.createElement('tr');
        contactRow.classList.add('contactRow');

        const pp = document.createElement('td');
        pp.classList.add('profile-pic');

        const circle = document.createElementNS('http://www.w3.org/2000/svg','svg');
        circle.classList.add('circle-svg');
        circle.setAttribute('width', '40');
        circle.setAttribute('height', '40');
        const profilePic = document.createElementNS('http://www.w3.org/2000/svg','circle');
        profilePic.setAttribute('cx', '20');
        profilePic.setAttribute('cy', '20');
        profilePic.setAttribute('r', '15');
        profilePic.setAttribute('stroke', 'white');
        profilePic.setAttribute('stroke-width', '2');
        profilePic.setAttribute('fill', 'none');
        circle.appendChild(profilePic);
        pp.appendChild(circle);
        contactRow.appendChild(pp);

        const newInitials = document.createElement('h4');
        newInitials.innerText = firstNameContact.value.charAt(0) + lastNameContact.value.charAt(0);
        newInitials.classList.add('initials-item');
        pp.appendChild(newInitials);

        const newContact = document.createElement('td');
        newContact.innerText = input + " " + input2;
        newContact.classList.add('name-item');
        contactRow.appendChild(newContact);

        const newEmail = document.createElement('td');
        newEmail.innerText = input3;
        newEmail.classList.add('email-item');
        contactRow.appendChild(newEmail);

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

        const editButton = document.createElement('td');
        const eButton = document.createElement('button');
        editButton.appendChild(eButton);
        editButton.innerHTML = '<button class="edit-button">Edit</button>';
        editButton.classList.add('edit-btn');
        contactRow.appendChild(editButton);

        const deleteButton = document.createElement('td');
        const dButton = document.createElement('button');
        deleteButton.appendChild(dButton);
        deleteButton.innerHTML = '<button class="delete-button">Delete</button>';
        deleteButton.classList.add('delete-btn');
        contactRow.appendChild(deleteButton);

        contactsTable.appendChild(contactRow);

        sortTableByColumn(document.querySelector('.contacts-table'), 1);

        // =======================
        // Insert contact into API
        // =======================
        var fname = firstNameContact.value;
        var lname = lastNameContact.value;
        var email = emailField.value;
        var phone = phoneField.value;
        var userid = 1;
        var desc = "This is temporary";

        var jsonPayload = JSON.stringify({"firstname": fname, "lastname": lname, "phone": phone, "email": email, "userid": userid, "description": desc});
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

                    if (jsonObject.status === "error") {
                        // do something about the error
                    }
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
}

function sortTableByColumn(table, column, asc = true)
{
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) =>
    {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().split(" ");
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().split(" ");
        aColText[1] = aColText[1].toUpperCase();
        bColText[1] = bColText[1].toUpperCase();

        return aColText[1] > bColText[1] ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild)
    {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);
}

function editRow(e)
{
    e.preventDefault();
    const b = e.target;

    if (b.classList[0] === 'edit-button')
    {
        document.querySelector('.edit-bg-modal').style.display = 'flex';

        const editFirstNameContact = document.getElementById('edit-firstName');
        const editLastNameContact = document.getElementById('edit-lastName');
        const editEmailContact = document.getElementById('edit-email');
        const editPhoneContact = document.getElementById('edit-phone');
        const editInitials = document.getElementById('edit-fl');

        const editCell = b.parentElement;
        const contactRow = editCell.parentElement;
        const initialsChild = contactRow.childNodes[0].innerText;
        const nameChild = contactRow.childNodes[1].innerText;
        const emailChild = contactRow.childNodes[2].innerText;
        const phoneChild = contactRow.childNodes[3].innerText;

        const nameArr = nameChild.split(" ");
        const numPhone = phoneChild.replace(/[()-]/g, "").replace(" ", "");


        editFirstNameContact.value = nameArr[0];
        editLastNameContact.value = nameArr[1];
        editEmailContact.value = emailChild;
        editPhoneContact.value = numPhone;
        editInitials.innerText = initialsChild;

        editFirstNameContact.addEventListener('keyup', editFirstName);
        editLastNameContact.addEventListener('keyup', editLastName);
        editEmailContact.addEventListener('keyup', editEmail);
        editPhoneContact.addEventListener('keyup', editPhone);

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




        document.querySelector('.edit-done-button').onclick = function(e)
        {
            e.preventDefault();
            contactRow.querySelector("h4").innerHTML = editinput1.charAt(0) + editinput2.charAt(0);
            contactRow.childNodes[1].innerText = editinput1 + " " + editinput2;
            contactRow.childNodes[2].innerText = editinput3;

            const opar = "(";
            const cpar = ")";
            const dash = "-";
            const ac = editinput4.slice(0, 3);
            const num3 = editinput4.slice(3, 6);
            const num4 = editinput4.slice(6, 11);
            const phonenumber = opar + ac + cpar + " " + num3 + dash + num4;

            contactRow.childNodes[3].innerText = phonenumber;
            document.querySelector('.edit-bg-modal').style.display = 'none';
        }
    }
}

function deleteRow(e)
{
    e.preventDefault();
    const b = e.target;

    if (b.classList[0] === 'delete-button')
    {
        document.querySelector('.bg-modal-confirm-delete').style.display = 'flex';

        document.querySelector('.confirm-button').onclick = function()
        {
            document.querySelector('.bg-modal-confirm-delete').style.display = 'none';
            const contactCell = b.parentElement;
            const contactRow = contactCell.parentElement;
            contactRow.remove();
        }
    }
}
