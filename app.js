const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
   
    .post('/webhook', function (req, res) {
        // let replyToken = req.body.events[0].replyToken;
        // let msg = req.body.events[0].message.text;
        
        // console.log(`Message token : ${ replyToken }`);
        // console.log(`Message from chat : ${ msg }`);

        // res.json({
        //     status: 200,
        //     message: `Webhook is working!`
        // });
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        reply(reply_token, msg)
        console.log(`Message from chat : ${ msg }`);
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

    function reply(reply_token, msg) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {9960e6fa24d0a193487a68283e1898d6}'
        }
        let body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: msg
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