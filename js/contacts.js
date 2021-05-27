// =============================================================================
// Selectors:
// =============================================================================

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const getPlusButton = document.getElementById('plusButton');
const getCloseButton = document.querySelector('.close');

const getDoneButton = document.querySelector('.done-button');
const contactsTable = document.querySelector('.contacts-body');

// =============================================================================
// Event Listeners:
// =============================================================================

firstName.addEventListener('keyup', getFirstName);
lastName.addEventListener('keyup', getLastName);
email.addEventListener('keyup', getEmail);
phone.addEventListener('keyup', getPhone);

getPlusButton.addEventListener('click', plusButton);
getDoneButton.addEventListener('click', addContact);
getCloseButton.addEventListener('click', closeButton);
contactsTable.addEventListener('click', deleteRow);

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

// add contact
function addContact(e)
{
    e.preventDefault();
    document.querySelector('.bg-modal').style.display = 'none';

    if (input && input2 != (undefined || ""))
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
        profilePic.setAttribute('stroke', 'black');
        profilePic.setAttribute('stroke-width', '2');
        profilePic.setAttribute('fill', 'none');
        circle.appendChild(profilePic);
        pp.appendChild(circle);
        contactRow.appendChild(pp);

        const newInitials = document.createElement('h4');
        newInitials.innerText = firstInitial + lastInitial;
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
        newPhone.innerText = input4;
        newPhone.classList.add('phone-item');
        contactRow.appendChild(newPhone);

        const deleteButton = document.createElement('td');
        const dButton = document.createElement('button');
        deleteButton.appendChild(dButton);
        deleteButton.innerHTML = '<button class="delete-button">Delete</button>';
        deleteButton.classList.add('delete-btn');
        contactRow.appendChild(deleteButton);

        contactsTable.appendChild(contactRow);
    }
}

function deleteRow(e)
{
    const b = e.target;

    if (b.classList[0] === 'delete-button')
    {
        const contactCell = b.parentElement;
        const contactRow = contactCell.parentElement;
        contactRow.remove();
    }
}