const stream = require('stream')

const 
  SMSNotificator = require('./SMSNotificator'),
  log = require('../common/Logger')

class SMSNotificatorWritableStream extends stream.Writable {
  constructor() {
    super({
      objectMode: true,
      highWaterMark: 100
    })

    this._sms = new SMSNotificator()
  }

  _write(ga, encoding, callback) {
    if(ga.didWin === true){
      this._sms.send(`Won: ${ga.title}, Image:${ga.productImageURL}`)
      log.info(`Sent winning notification: amazonID: ${ga.amazonID}, Title: ${ga.title}`)
    }else
      log.debug(`Did not send sms for unwon giveaway: amazonID: ${ga.amazonID}, Title: ${ga.title}`)

    callback()
  }
}

module.exports = SMSNotificatorWritableStream