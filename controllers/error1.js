'use strict';

const Telegram = require('telegram-node-bot');

class Error1Controller extends Telegram.TelegramBaseController {
    handle($){
        $.sendMessage('Sorry, I don\'t understand.');
    }
}

module.exports = Error1Controller;