const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
let firstInitial;
let lastInitial;
let input;
let input2;
let email;
let phone;

// get first letter inputed into the 'First Name' field
firstName.addEventListener('keyup', (e) =>
{
    input = e.target.value;
    firstInitial = input.charAt(0);
});

// get first letter inputed into the 'Last Name' field
lastName.addEventListener('keyup', (e) =>
{
    input2 = e.target.value;
    lastInitial = input2.charAt(0);
    const fl = firstInitial + lastInitial;
    document.getElementById("fl").innerHTML = fl;
});

// open add contact popup with the plus button
document.getElementById('plusbutton').addEventListener('click', 
function()
{
    document.querySelector('.bg-modal').style.display = 'flex';
});

// close add contact popup with 'x' button
document.querySelector('.close').addEventListener('click',
function()
{
    document.querySelector('.bg-modal').style.display = 'none';
});

// save contact info when 'done' button is pressed
document.querySelector('.donebutton').addEventListener('click', 
function()
{

});