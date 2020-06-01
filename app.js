const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
   
    .post('/webhook', function (req, res) {
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        reply(reply_token, msg)
        res.sendStatus(200)
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

    function reply(reply_token) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {9960e6fa24d0a193487a68283e1898d6}'
        }
        let body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: 'Hello'
            },
            {
                type: 'text',
                text: 'How are you?'
            }]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
    }