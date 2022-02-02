//ZADANIE 1

// //http://numbersapi.com/random/year?json

// const fetch = require('node-fetch');

// //Jak ustalić co wpisaliśmy? -> process.argv

// const year = process.argv[2] || Math.floor(Math.random() * 2021);
// console.log(year);

// fetch(`http://numbersapi.com/${year}/year?json`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log("eror", error))





//ZADANIE 2
// `http://numbersapi.com/${number}/${year}?json`

// const fetch = require('node-fetch');

// const arg = process.argv[2];
// let type = "";

// if(arg.indexOf('--year') === 0) {
//     console.log("szukamy roku");
//     type = "year";
// } else if (arg.indexOf("--math") === 0) {
//     console.log("szukamy liczby");
//     type = "math";
// } else if (arg.indexOf("--trivia") === 0) {
//     console.log("szukamy liczby-ciekawostki");
//     type="trivia";
// }

// const equalSign = arg.search('=');
// if(equalSign === -1) console.log('nie wpisałeś liczby!');

// const number = arg.slice(equalSign + 1);
// // if(number === "" || isNaN(Number(number))) {
// //     console.log("To nie jest liczba");
// //     process.exit();
// // }

// fetch(`http://numbersapi.com/${number}/${type}?json`)
// .then(response => {
//     if(response.ok) {
//         return response.json()
//     } else {
//         throw new Error("oooo coś nie tak", response.status);
//     }
    
// })

// .then(response => console.log(response.text))
// .catch(err => console.log("Błąd: ", err))




//ZADANIE 3 - NBP API - REQUEST
// `http://api.nbp.pl/api.exchangerates/rates/a/${code}/`

const request = require('request');
const fs = require('fs');

const validCodes = ['usd', 'eur', 'gbp', 'chf'];

const code = process.argv[2];

const isValid = validCodes.find(currency => currency === code) ? true : false;

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;

request(url, { json: true }, (err, res, body) => {
    if(err) {
        return console.log("Błąd: ", err);
    }
    if(res.statusCode !== 200) {
        return console.log("coś poszło nie tak, sprawdź url");
    }
    
    const message = `Średnia cena ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid} złotych`;

    fs.appendFile('currencies.txt', message + '\n', (err) => {
        console.log("dane dodane do pliku");
    })
    console.log(message);
})