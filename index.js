'use strict';

const Telegram = require('telegram-node-bot'),
PersistenceMemoryStorage = require('./adapters/PersistenceMemoryStorage'),
storage = new PersistenceMemoryStorage(
    `${__dirname}/data/userStorage.json`,
    `${__dirname}/data/chatStorage.json`
),
tg = new Telegram.Telegram('1840819583:AAG_WRXHoDqvnDup41IWXxHWgeIbxILZt_Q', {
    workers: 1,
    storage: storage
});

const PingController = require('./controllers/ping'),
WeatherController = require('./controllers/weather'), 
ipv4Controller = require('./controllers/ipv4'),
OtherwiseController = require('./controllers/otherwise');

tg.router.when(new Telegram.TextCommand('/start', 'pingCommand'), new PingController())
.when(new Telegram.TextCommand('/weather', 'weatherCommand'), new WeatherController())
.when(new Telegram.TextCommand('/ipv4', 'ipv4Command'), new ipv4Controller())
.otherwise(new OtherwiseController());

//////////////////////////////////// note ////////////////////////////////////////////
const NoteController = require('./controllers/note')
, Error1Controller = require('./controllers/error1');

const NoteCtrl = new NoteController();

tg.router.when(new Telegram.TextCommand('/addnote', 'addCommand'), NoteCtrl)
.when(new Telegram.TextCommand('/viewnotes', 'getCommand'), NoteCtrl)
.otherwise(new Error1Controller());

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));


