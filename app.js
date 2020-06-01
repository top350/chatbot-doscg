const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => {
        var result = getData()
        res.send(result)
    }
   
    )
   
    .post('/webhook', function (req, res) {
     
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        reply(reply_token, msg)
        res.sendStatus(200)
        console.log(`Message from chat : ${ msg }`);
    })
     .listen(PORT, () => console.log(`Listening on ${ PORT }`));
    
    function reply(reply_token, msg) {
        
        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {69GpTgBkddFvBR7hH0ghIUBmBs3zPQKSxbhzTy7x5RBoBGHxS7VJlTxI5wH7BybHu9yOJ3fS5Hh9pmGnT/dBVjXeqaJfRwb/r08p5SDQtCauxh4t7VygyxRZ6EMIBCMayzoqas0TBBt3V+P1xijEZgdB04t89/1O/w1cDnyilFU=}'
        }
        let headers2 = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer BV9HXH2u3ECb5rH5Y9NwxM0UqtN2QO2ME5jaV7Un0XY'
        }
      
        let body2 ={
            message:'Help me! I could not answer'
        }
        axios.get('covid19.th-stat.com/api/open/today')
  .then(function (response) {
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: response.data
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

        request.post({
            url: 'https://notify-api.line.me/api/notify',
            headers: headers2,
            form: body2
        }, (err, res, body) => {
            console.log(err)
            console.log(body)
            console.log('status = ' + res.statusCode);
        });
       
    }
   function getData(){
       
       axios.get('covid19.th-stat.com/api/open/today')
  .then(function (response) {
    // handle success
    console.log(response.data);
    result=response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
 
   }