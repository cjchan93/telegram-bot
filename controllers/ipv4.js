'use strict';

const dns = require('dns');
const Telegram = require('telegram-node-bot');

class ipv4Controller extends Telegram.TelegramBaseController {
  ipv4Handler($) {

    dns.resolve4('archive.org', (err, addresses) => {
      if (err) throw err;
    
      // console.log(`addresses: ${JSON.stringify(addresses)}`);
      $.sendMessage(`IP Address: ${JSON.stringify(addresses)}`);
    
      addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
          if (err) {
            throw err;
          }
          // console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
        });
      });
    });
  }

  get routes() {
    return {
      'ipv4Command': 'ipv4Handler'
    };
  }
}

module.exports = ipv4Controller;

