const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
var firstInitial;
var lastInitial;

firstName.addEventListener('keyup', (e) =>
{
    const input = e.target.value;
    firstInitial = input.charAt(0);
    
});

lastName.addEventListener('keyup', (f) =>
{
    const input2 = f.target.value;
    lastInitial = input2.charAt(0);
    const fl = firstInitial + lastInitial;

    document.getElementById("fl").innerHTML = fl;
});

document.getElementById('button').addEventListener('click', 
function()
{
    document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click',
function()
{
    document.querySelector('.bg-modal').style.display = 'none';
});