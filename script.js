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
// app.style.opacity = '100';

// Criando uma função que gera um username baseado nas primeiras letras de cada palavra do nome:

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

// Criando uma função que percorre todo vetor que contem as transaões (deposito e retiradas - movements) e as exibi na lista de movements do aplicativo:

const displayMovements = function (movements, sort = false) {
  // Removendo elementos usando a propriedade innerHTML como setter, esta propriedade retorna todos elementos HTMLS presentes no container:
  containerMovements.innerHTML = '';

  // sort = true, criar uma shallow copy usando slice() e ordena-la usando sort

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // Para percorrer o vetor utilizamos o metodo forEach (itineration) que executa uma determinada função para cada elemento do vetor que chamou o metodo.

  movs.forEach(function (movement, index, movements) {
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

// displayMovements(account1.movements);

// Calc and print balance:
let balance;

const calcPrintBalance = function (acc) {
  // Como a  função ira receber um vetor como parâmetro e vamos somar os valores de cada elemento do mesmo, pode-se utilizar .reduce();

  balance = acc.reduce(function (accumulator, mov) {
    return accumulator + mov;
  }, 0);

  labelBalance.textContent = `${balance}€`;
};

// calcPrintBalance(account1.movements);

// Display Income, Outcome, Interest:

const calcDisplaySummary = function (acc) {
  const interestRate = acc.interestRate / 100;
  const movements = acc.movements;

  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, dep) => acc + dep, 0);

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, wit) => acc + wit, 0);

  // const interest = incomes * interestRate;

  // Calc interest using map + reduce;
  const interest = movements
    .filter(mov => mov > 0) // filtrar pelos depositos
    .map(dep => dep * interestRate) // criar um vetor que contem todos interrest
    .filter(int => int > 1) // banco só considera os interests maiores que 1
    .reduce((acc, int) => acc + int, 0); // somar todos os interrest restantes de cada movement

  // Displaying In , Out , Interest:
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1);

// update UI:

const updateUI = function (acc) {
  // Calc Balance + Display
  calcPrintBalance(acc.movements);

  // Display Movements:
  displayMovements(acc.movements);

  // Calc Summary + Display
  calcDisplaySummary(acc);
};

// Login:

let currentAccount;

// Criando uma variável de estado o botão sort:
let sorted = false;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  // Pegando valores das caixas de texto do login
  const user = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  // Usando find para retornar no array o elemento que satisfaz a condição, ou seja, se as credenciais forem preenchidas corretamente find retorna o objeto correspondente (account), caso contrario retorna undefinied

  currentAccount = accounts.find(
    acc => acc.username === user && acc.pin === pin
  );

  if (currentAccount) {
    sorted = false;

    // Display UI + Welcome Mensage:
    app.style.opacity = '100';
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Limpando caixas de Login
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // Limpar efeito de foco:
    inputLoginPin.blur();

    // Display UI
    updateUI(currentAccount);

    // // Calc Balance + Display
    // calcPrintBalance(movements);

    // // Display Movements:
    // displayMovements(movements);

    // // Calc Summary + Display
    // calcDisplaySummary(currentAccount);
  }
});

// Transfer Function:

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // metodo para tirar reset do navegador ao pressionar o botão, comportamento padrão dos formularios.

  // Pegar os valores da caixa de texto da transferencia

  const transferTo = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const currentAccMovs = currentAccount.movements;

  // Limpar campos de transfência:
  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  // Verificar se a transferencia é valida: P/ isso será necessário verificar se o usuario que vai receber a transferência esta cadastrado no sistema. Além disso a transferência só será valida se a quantia a ser transferida for menor que o saldo da conta que esta transferindo.

  // O metodo find será responsável por localizar a conta no array accounts cujo valor do usuario foi digitado no campo transferTo e retornar o objeto que contém o valor desta propriedade caso seja encontrado.

  const transferAcc = accounts.find(acc => acc.username === transferTo);

  // Verificando e trantando a existencia ou não da conta digitada no campo transferTo

  const hasTransferAcc = transferAcc
    ? transferAcc.username !== currentAccount.username
    : false;

  // or: transferAcc?.username !== currentAccount.username

  // Condições para efetuação da transferência:

  if (hasTransferAcc && transferAmount <= balance) {
    // Adicionar Retirada na conta que efetuou a transferencia:
    currentAccMovs.push(-transferAmount);

    // Adicionar Deposito na conta que recebeu a transferência:
    transferAcc.movements.push(transferAmount);

    // Calculo + Exibir novo Balanço
    // Exibir retirada na lista de movimentaçoes:
    // Calcular + Exbir novo Summary:
    updateUI(currentAccount);
  } else if (transferAcc === undefined) {
    alert('Transferência Invalida: Conta não registrada no sistema');
  } else {
    alert('Operação Invalida');
  }
});

// Using findIndex Method to find index of element that we wanna to delete usig close account functionality:

console.log(accounts.findIndex(acc => acc.username === 'js'));

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // Getting input fields:
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  // Cleaning input fields:
  inputCloseUsername.value = '';
  inputClosePin.value = '';

  // Checking credentials:

  if (user === currentAccount.username && pin === currentAccount.pin) {
    // Find index of element that we wanna to delete
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Removendo Conta do array
    accounts.splice(index, 1);

    // Logout:
    app.style.opacity = '0';
    labelWelcome.textContent = ' Log in to get started';
  }
});

// Regra banco: Solicitação de emprestimo só é valida se a conta possuir algum deposito cujo valor é de pelo menos 10 % do valor solicitado no emprestimo:

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmout = Number(inputLoanAmount.value);
  const regraAtendida = currentAccount.movements.some(
    mov => mov >= 0.1 * loanAmout
  );

  if (loanAmout > 0 && regraAtendida) {
    // SetTimeout simula espera de solicitação pelo banco:
    setTimeout(function () {
      // Add Movement
      currentAccount.movements.push(loanAmout);
      updateUI(currentAccount);
    }, 2000);
  } else {
    alert(
      '🚨 Pedido de Emprestimo Negado . O emprestimo só será validado se tiver pelo menos um único deposito de 10% do valor solicitado'
    );
  }

  inputLoanAmount.value = '';
});

// Criando uma variável de estado o botão sort:

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

// Filter Method: Filter an element that satisfied a certain condition and create a new array. We specified the condition using callback functions, this functions always return a boolean value.

// Using filter method for create an array that contains all deposits:
const depositos = movements.filter(function (mov) {
  return mov > 0;
});
console.log(depositos);

// Using for of
const depositosForOf = [];
for (const mov of movements) if (mov > 0) depositosForOf.push(mov);
console.log(depositosForOf);

// Obs: O metodo filter dos vetores é utilizado no paradigma funcional da programação. A principal vantagem de se utiliza-lo é a possibilidade de criarmos valores juntando diferentes metodos como fizemos na função que cria um usuario, onde juntou-se metodos de strings e arrays.

// Using filter method for create an array that contains all withdrawal:
const retiradas = movements.filter(mov => mov < 0);
console.log(retiradas);

// Reduce Method: We use reduce method to get all elements from an array and reduce  all to one single value. reduce(function (accumulator,currentValue, index, Arr), accStartValue );

// Getting balance:
// accumulator  (acc) -> Snowball

const balanceMov = movements.reduce(function (acc, cur, i, arr) {
  // console.log(`Itineration ${i}: ${acc}`);
  return acc + cur; // updating acumulator: acc = acc + cur;
}, 0);

console.log(balance);

// or

let balanceFor = 0;
movements.forEach(function (mov) {
  balanceFor += mov;
});

console.log(balanceFor);

// Maximum value of movements: Também podemos usar reduce para resolver este problema, uma vez que este metodo reduz o vetor em um unico valor:

const maxMovValue = movements.reduce(function (acc, currentValue, i) {
  // Acumulador será responsável por rastrear o nosso valor maximo:
  console.log(acc, i);
  if (acc > currentValue) return acc;
  else return currentValue; // currentValue será o novo acc (atualiza o valor do acumulador)
}, movements[0]);

console.log(maxMovValue);

// ------------------ Coding challenge #2 ------------------

/*

Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4 - map 
2. Exclude all dogs that are less than 18 human years old (which is the same as - keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages �) - reduce 

4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]



*/

const juliaDogs = [5, 2, 4, 1, 15, 8, 3];
const kateDogs = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogsAges) {
  //  1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4

  // Obs: Como vamos precisar excluir os cachorros que não são adultos, vamos criar um  novo vetor que armazena todas as médias calculadas e usar o metodo filter();

  const humansAges = dogsAges.map(function (dogAge, index) {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + dogAge * 4;
    }
  });

  // 2. Excluindo os cachorros que não são adultos:
  const adults = humansAges.filter(humansAge => humansAge >= 18);

  // 3. Calculo Media das Idade dos cães adultos: Usando reduce para somar todos os valores do vetor adults, .length para calcular o seu de número de elementos -> Media = somaElementos/nº elementos

  // const averageAge =
  //   adults.reduce(function (acc, adult) {
  //     return acc + adult; // atualiza accumulator
  //   }, 0) / adults.length;

  // Outra Solução
  const averageAge = adults.reduce(function (acc, adult, i, arr) {
    return acc + adult / arr.length;
  }, 0);

  return averageAge;
};

console.log('\n\n------------- Chalenge #2 -------------');
console.log(`Average 1: ${calcAverageHumanAge(juliaDogs)}`);
console.log(`Average 1: ${calcAverageHumanAge(kateDogs)}`);

// Chaining Methods: Escrever todos os metodos em  uma única expressão para resolver um problema.

// OBS: Não é uma boa prática usarmos esta tecnica, uma vez que ela prejudica a performace da aplicação, sobretudo, se for de larga escala. Além disso não é uma boa prática apalicar a tecnica quando trabalhamos com metodos que modificam o vetor como o splice ou reverse.

console.log('\n\nChaining Methods');

// Movements deposits -> Conversão de Euro para Dolar -> Add todos os valores, quanto foi deposito em dolares.

// Inicialmente, utiliza-se o metodo filter para criar um novo vetor com os elementos filtrados, no caso que satisfazem a condicional mov > 0 (depositos). Em seguida com este mesmo vetor cria-se um novo usando map () que armazena o calculo da callback function cada vez que o vetor filtrado for percorrido. Por fim, utiliza-se o metodo reduce() para percorrer o vetor que contém os valores convertidos e soma-los armazenando em uma única variável.

const eurToUsd = 1.21;

// PipeLine
const depositUSD = movements
  .filter(mov => mov > 0)
  .map(deposit => deposit * eurToUsd)
  .reduce((acc, depositDolar) => acc + depositDolar, 0);

console.log(`Deposito em dolares: $${depositUSD}`);

// ------------------ Coding challenge #3 ------------------

/* Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!


const calcAverageHumanAge = function (dogsAges) {
  //  1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4

  // Obs: Como vamos precisar excluir os cachorros que não são adultos, vamos criar um  novo vetor que armazena todas as médias calculadas e usar o metodo filter();

  const humansAges = dogsAges.map(function (dogAge, index) {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + dogAge * 4;
    }
  });

  // 2. Excluindo os cachorros que não são adultos:
  const adults = humansAges.filter(humansAge => humansAge >= 18);

  // 3. Calculo Media das Idade dos cães adultos: Usando reduce para somar todos os valores do vetor adults, .length para calcular o seu de número de elementos -> Media = somaElementos/nº elementos

  // const averageAge =
  //   adults.reduce(function (acc, adult) {
  //     return acc + adult; // atualiza accumulator
  //   }, 0) / adults.length;

  // Outra Solução
  const averageAge = adults.reduce(function (acc, adult, i, arr) {
    return acc + adult / arr.length;
  }, 0);

  return averageAge;
};




*/

console.log('\n\n------------ Coding Chalenge #3 ------------');

const calcAverageHumanAge2 = dogsAges =>
  dogsAges
    .map(dogHumanAge =>
      dogHumanAge <= 2 ? 2 * dogHumanAge : 16 + dogHumanAge * 4
    )
    .filter(dogHumanAge => dogHumanAge >= 18)
    .reduce(
      (acc, dogAdult, i, dogsAdults) => acc + dogAdult / dogsAdults.length,
      0
    );
const avgJulia = calcAverageHumanAge2(dogsJulia);
const avgKate = calcAverageHumanAge2(dogsKate);
console.log(avgJulia, avgKate);

// Find Method: Percorre o vetor e retorna o primeiro elemento que satisfaz uma condição estabelecida na call back function (retorna valor booleano)
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// Usando o metodo find podemos encontrar um objeto em um vetor baseado no valor de sua propriedade.

const accountJonas = accounts.find(acc => acc.username === 'js');
console.log(accountJonas);

// Some and every Methods

// .includes() : Search for specific element and return true or false:
console.log(movements.includes(-130));

// .some() : Run an array searching for specific condition and return true or false:
const hasDeposits = movements.some(mov => mov > 0);
console.log(hasDeposits);

// .every() : If every element of array satisfies a callback function condition then the method return true otherwise the method will return false
const onlyDeposit = movements.every(mov => mov > 0);
console.log(onlyDeposit);

// .flat() Method: Foi introduzido no ES2019. The Method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

const arr4 = [[1, 2, 3], 4, 5, 6, 7, [8, 9, 10]];
const newArr = arr4.flat();
console.log(newArr);

// Obs.flat(depth) The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
const arrDeep = [[[1, 2], 3], 4, 5, 6, 7, [[8, 9], 10]];
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2));

// Calcular balanço total de todas as contas usando flat

// Creating a new array that contains all movements arrays using map() + flat(2) + sum all elements using reduce():

// map return -> newArr = [account1.mov,account2.mov...].

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

// .flat(2) retorna a união de todos elementos do array criado pelo metodo map

const allMovements = accountMovements.flat(2);
console.log(allMovements);

const balanceOveral = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(balanceOveral);

// Joining all elements in a new array
console.log(`Balance Overal: $${balanceOveral}`);

//  solving using flatMap():
const balanceOveral2 = accounts
  .flatMap(acc => acc.movements) // So acessa o primeiro nível de profundidade
  .reduce((acc, mov) => acc + mov);

console.log(`Balance Overal: $${balanceOveral2}`);

// Strings: Ordena um array que contem strings baseado na ordem alfabetica :

const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort()); // Muda o array original

// Numbers: Converte todos os elementos em strings e os organiza, assim o metodo .sort() não organiza os números em ordem númerica.
console.log(movements);
console.log(movements.sort());

// Using compareFunction inside sort. Specifies a function that defines the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value.

// a: The first element for comparison / b: The second element for comparison.

// Se retorno da comparação for negativo, A,B
console.log('Sort + callBackFunction');
console.log(movements);

// Ordem Crescente:
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1; // Se return > 0 , B,A (switch order)
//   } else {
//     return -1; //Se return < 0 , A,B (keep order)
//   }
// });

// Se o a for maior que b , inverter ordem
movements.sort((a, b) => a - b);
console.log(movements);

// Ordem Decrescente:
movements.sort((a, b) => {
  if (a > b) {
    return -1; // Se return > 0 , B,A (switch order)
  } else {
    return 1; //Se return < 0 , A,B (keep order)
  }
});

console.log(movements);

// How to programmatically create and fill arrays:

// Using Array constructor function:

// Quando passamos como parâmetro um número, por padrao a função cria um array com X elementos vazios:
const x = new Array(5); // Empty array just accept fill method

console.log(x);

x.fill(5);
console.log(x);

// .fill (value,start,end)
x.fill(1, 1, 3); // prenche todo array com o valor passado como parâmetro
console.log(x);

// Array.from(ObjCaractArray, map function); - Metodo do array constructor function -> Creating an array from other things, doing it we can use array methods in other elements.

// Obs: CallBack function: Retorna 1 a cada iteração, assim não precisamos inserir nenhum argumento:

// Array() : Function object
let y = Array.from({ length: 7 }, () => 1);
console.log(y);

// Um comando equivalente seria se aplicassemos o metodo map() em um array vazio de 7 elementos:
const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

// Usando o metodo from do construtor Array para criar um array que armazena 100 números aleatorios:
const dice = Array.from({ length: 100 }, cur =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(dice);

// Ex: Nodelist -> Array: Imagine se nós tivessemos os valores das movimentações apenas na interface, assim usamos Array.from() para criar um array com estes valores:

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // Or
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2.map(el => Number(el.textContent.replace('€', ''))));
});

// Resumo: Principais metodos dos arrays: forEach(), map(), filter(), reduce(), find(), findIndex() e Array.from()

/* Quando usar cada um dos metodos estudados (Aula 162):

http://prntscr.com/wij741

*/
