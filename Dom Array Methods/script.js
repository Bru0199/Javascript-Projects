const main = document.getElementById('main');
const addUseBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_website');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}


//Double Money 
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    }
    );
    updateDOM();
}

//Filter only millionaries

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

//Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//Calculate the total wealth
function calculateTotal() {
    const wealth = data.reduce((acc, user) => (
        acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//Update DOM

function updateDOM(provideData = data) {
    //Clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//Format number as money

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event Listener
addUseBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateTotal);
