'use strict';

const Telegram = require('telegram-node-bot');

//npm install request && npm install dotenv
const request = require('request');
const dotenv = require('dotenv').config();

class WeatherController extends Telegram.TelegramBaseController {

    weatherHandler($) {

        const address = $.message.text.split(' ').slice(1).join(' ');
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=${process.env.API_KEY}&units=metric`;
        
        if (!address) {
            return $.sendMessage('Please enter the name of the city (e.g. /weather Kuala+Lumpur,MY)');
        }
        else{
            request(url, (error, response, body) => {
                const data = JSON.parse(body);
            
                // console.log(`It's currently ${data.main.temp}°C outside`);
                $.sendMessage(`------ City: ${address} ------ \n It's currently ${data.main.temp}°C outside.`);
            });
        }
    }

    get routes() {
        return {
            'weatherCommand': 'weatherHandler'
        };
    }
}

module.exports = WeatherController;






