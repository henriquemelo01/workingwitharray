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

// const currencies2 = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
//   ['BRL', 'Brazilian Real'],
// ]);

// console.log('Currencies \n\n');
// currencies2.forEach(function (cur, key, map) {
//   console.log(`${key}: ${cur}`);
// });

// Set: An data structure that contains unique values. Set data structure doesn't have index and keys.

// const currenciesUnique = new Set(['USD', 'GPB', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// let i = 0;
// currenciesUnique.forEach(function (value, _, set) {
//   i++;
//   console.log(`Currencie ${i}: ${value} `);
// });

// DOM MANIPULATION + forEach method (creating DOM elements):

// Displaying app:
const app = document.querySelector('.app');
app.style.opacity = '100';

// Criando uma função que percorre todo vetor que contem as transaões (deposito e retiradas - movements) e as exibi na lista de movements do aplicativo:

const displayMovements = function (movements) {
  // Removendo elementos usando a propriedade innerHTML como setter, esta propriedade retorna todos elementos HTMLS presentes no container:
  containerMovements.innerHTML = '';

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

    // Inserindo elemento dentro do container antes do primeiro child element(primeiro elemento que esta dentro do container): https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML . O segundo parâmetro contem uma string que apresenta o código HTML.

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// ------------------ Coding challenge #1 ------------------

/*

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]


*/

// Data 1:
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

// Data 2 :
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (ages1, ages2) {
  // Criando uma shallow copy do vetor usando o metodo slice()
  const copyDogsJulia = ages1.slice();

  // Para remover o primeiro e ultimo elemento usamos o metodo splice(0,1), e splice(-2) que remove os elementos a partir do antepenultimo elemento.

  // console.log(copyDogsJulia.splice(-2)); // REMOVING CATS
  copyDogsJulia.splice(0, 1);
  copyDogsJulia.splice(-2);

  // 2. Create an array with both Julia's (corrected) and Kate's data
  const dogsAges = [...copyDogsJulia, ...ages2]; //spread operator

  // 3. For each remaining dog, log to the console whether it's an adult or puppy

  dogsAges.forEach(function (dogAge, i) {
    const isDogAdult = dogAge >= 3 ? 'Adult' : 'Puppy';
    console.log(
      `Dog number ${i + 1} is an ${isDogAdult}, and is dog ${dogAge} years old`
    );
  });
};

console.log('--------- Data 1 ---------');
checkDogs(dogsJulia, dogsKate);
console.log('\n--------- Data 2 ---------');
checkDogs(dogsJulia2, dogsKate2);

// Data transformations **: Methods that we create a new array based on transfoming data from other arrays (map ,filter,reduce).

/*

map() é um metodo dos vetores que é bastante semalhante ao forEach, a diferença entre eles é que o map cria um novo vetor baseado no vetor original

filter() filtra elementos do vetor baseado em uma condição e cria um vetor com o resultado

reduce() reduz um vetor há um único elemento (bola de neve)

*/

// Usando map() para criar um vetor que contem o resultado da conversão (Euro -> Real) das transações:

const euroToReal = 6.49; // Cotação 04/01/2021

const movementReal = movements.map(function (mov) {
  return mov * euroToReal;
});

console.log(movements);
console.log(movementReal);

// Array function:
const movementRealArr = movements.map(mov => mov * euroToReal);
console.log(movementRealArr);

// Cria um novo vetor que contem strings:

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);

// Computing username creating a fuction that uses a string method to split the string and get the initial caracteres from first and last name  of each account owner propertie:

const computUserName = function () {
  accounts.forEach(function (account) {
    const accOwner = account.owner; // string
    const arrOwner = accOwner.split(' '); // Returns an array that contains words of string
    const firstName = arrOwner[0];
    const lastName = arrOwner[1];
    const user = (firstName[0] + lastName[0]).toLowerCase();
    console.log(user);
  });
};

computUserName();

const user = 'Henrique Moraes Santos Melo';

// Split all words from user string and create an array that contain all of these words:

const generateUserName = function () {
  let userNames = [];
  accounts.forEach(function (acc) {
    let userString = '';
    const username = acc.owner
      .toLowerCase()
      .split(' ')
      .forEach(function (word) {
        userString += word[0];
      });
    userNames.push(userString);
  });

  return userNames;
};

const userNames = generateUserName();
const jonas = userNames[0];
console.log(jonas);

//

const generateUserNames = function () {
  // userNames armazena um vetor que carrega o usuario de cada conta, para isso foi utilizada o metodo map:

  const userNames = accounts.map(function (acc) {
    let userString = '';
    const username = acc.owner
      .toLowerCase() // Coloca toda string em letra minuscula
      .split(' ') // Cria um novo vetor que contém todas palavras da string acc.owner
      .forEach(function (word) {
        userString += word[0];
      });
    return userString; // A cada iteração do vetor username armazena a operação em um elemento do novo vetor userNames
  });

  return userNames; // Retorna o vetor gerado
};

console.log(generateUserNames());

// Solução do Jonas:

// Uma string que contém o dono da conta (account.owner): Transformações:  letra minuscula .toLowerCase() -> separa palavras da string criando um vetor que armazena cada uma delas .split(" ") -> criar um novo vetor que contém a primeira letra de cada palavra .map() - juntar os elementos do novo vetor .join("")

const username = account1.owner
  .toLowerCase()
  .split(' ')
  .map(word => word[0])
  .join('');

console.log(username);

// Criar uma função que percorre todo accounts array e armazena um username criando uma propriedade user para cada um dos objetos account :

const createUsernames = function () {
  const usernamesArr = accounts.forEach(function (acc) {
    // Cria propriedade user a cada iteração do vetor que contem os objetos account
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames();
console.log(accounts);
