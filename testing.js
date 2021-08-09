'use strict';

const Telegram = require('telegram-node-bot');

//npm install request && npm install dotenv
const request = require('request');
const dotenv = require('dotenv').config();

// console.log(process.argv[2]) //user typing data
const address = process.argv[2];

const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=${process.env.API_KEY}&units=metric`;

request(url, (error, response, body) => {
    const data = JSON.parse(body);

    // console.log(`It's currently ${data.main.temp}°C outside`);
    console.log(`------ City: ${address} ------ \n It is ${data.weather.main} day with ${data.weather.description}. \n It's currently ${data.main.temp}°C outside.`);
});