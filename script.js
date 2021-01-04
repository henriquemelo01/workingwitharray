'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Arrays Methods

/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice Method: Returns an arrays that contains the elements which was extracted. The paramether of slice method represents the begin of extraction
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // the last paramether is not include into output -> OUTPUT 2 & 3
console.log(arr.slice(-1)); //last element of array
console.log(arr.slice(1, -2));
console.log(arr.slice()); //shallow copy;

// SPLICE: The splice method has the same functionality of slice method, the difference between this methods is the splice method change the original array and slice not change.
arr.splice(2); // extract element 0 e 1 from arr and remove the others/ returns the array that was removed
console.log(arr); // ["a", "b"]
arr.splice(1, 1); // Remove "b" - ("element that we wanna remove", number of elements);
console.log(arr);

// Remove the last element;
const arr2 = ['a', 'b', 'c', 'd', 'e'];
arr2.splice(-1);
console.log(arr2);

// Reverse array: mutate the array
const arr3 = ['j', 'i', 'h', 'g', 'f'];
arr3.reverse();
console.log(arr3);

// CONCAT:
const letters = arr.concat(arr3);
console.log(letters);

// or

const lett = [...arr, ...arr3];
console.log(lett);

// Join(separator): join all elements from array and separate them using an separator, ex:
console.log(letters.join(' - '));

*/

// forEach() method ** X for of

/*
const acMov = account3.movements;
console.log(acMov.entries); // [ current element,index];

console.log('---------- FOR OF ----------\n');
for (const [index, movement] of acMov.entries()) {
  if (movement > 0) {
    console.log(`MOVEMENT ${index + 1}: You deposited $${movement}`);
  } else {
    console.log(`MOVEMENT ${index + 1}: You withdrew $${movement}`);
  }
}
// Ex: Accont movement history:
console.log('\n\n---------- FOR EACH ----------\n\n');
acMov.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`MOVEMENT ${index + 1}: You deposited $${movement}`);
  } else {
    console.log(`MOVEMENT ${index + 1}: You withdrew $${movement}`);
  }
});

// obs: forEach returns current element, current index, and the array that calls for each method

// OBS 2: We can't use continue and break in for each callback function ******

*/

// forEach() working with Maps and Sets

const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['BRL', 'Brazilian Real'],
]);

console.log('Currencies \n\n');
currencies2.forEach(function (cur, key, map) {
  console.log(`${key}: ${cur}`);
});

// Set: An data structure that contains unique values. Set data structure doesn't have index and keys.

const currenciesUnique = new Set(['USD', 'GPB', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

let i = 0;
currenciesUnique.forEach(function (value, _, set) {
  i++;
  console.log(`Currencie ${i}: ${value} `);
});

// DOM MANIPULATION + forEach method (creating DOM elements):

// Displaying app:
const app = document.querySelector('.app');
app.style.opacity = '100';

// Criando uma função que percorre todo vetor que contem as transaões (deposito e retiradas - movements) e as exibi na lista de movements do aplicativo:

const displayMovements = function (movements) {
  // Para percorrer o vetor utilizamos o metodo forEach (itineration) que executa uma determinada função para cada elemento do vetor que chamou o metodo.

  movements.forEach(function (movement, index, movements) {
    // Criar um elemento HTML para cada iteração do vetor:

    // Testando se a transação foi um deposito ou retirada
    let movType = '';
    if (movement > 0) {
      movType = 'deposit';
    } else if (movement < 0) {
      movType = 'withdrawal';
    }

    // Criando o elemento HTML
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${movType}">2 ${movType}</div>
          <div class="movements__value">${movement}€</div>
    </div>
    `;

    // Inserindo elemento dentro do container antes do primeiro child element(primeiro elemento que esta dentro do container): https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
