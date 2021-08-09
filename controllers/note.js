'use strict';

const Telegram = require('telegram-node-bot');

class NoteController extends Telegram.TelegramBaseController {
    addHandler($) {
        let note = $.message.text.split(' ').slice(1).join(' ');

        if (!note) return $.sendMessage('Sorry, please add a note');

        $.getUserSession('notes').then(notes => {
            if (!Array.isArray(notes)) $.setUserSession('notes', [note]);
            else $.setUserSession('notes', notes.concat([note]));
            console.log(note);
            $.sendMessage('New Note Added!');
        });
    }

    getHandler($) {
        $.getUserSession('notes').then(notes =>{
            $.sendMessage(this._serializeList(notes), {parse_mode: 'Markdown'});
        });
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
            'viewCommand': 'viewHandler'
        };
    }

    _serializeList(noteList){
        let serialized = '*Your Notes:*\n\n';
        noteList.forEach((t, i) => {
            serialized += `*${i}* - ${t}\n`;
        });
        return serialized;
    }
}

module.exports = NoteController;