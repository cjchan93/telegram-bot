'use strict';

const Telegram = require('telegram-node-bot');

class PingController extends Telegram.TelegramBaseController {
    pingHandler($) {
        $.sendMessage('Welcome to CJ Bot!!!');
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        };
    }
}

module.exports = PingController;
