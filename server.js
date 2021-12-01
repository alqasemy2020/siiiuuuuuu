const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const express = require('express');
const app = express()
const router = express.Router()


const API_id = 3279385
const API_hash = '91d5127a54b0226620e0227a79959baa'
const TOKEN = "2091233729:AAF4K2cj2d62tereIpRMYz2tNTmtB-PNt6U"
const stringSession = new StringSession("");

const client = new TelegramClient(stringSession, API_id, API_hash, {
    connectionRetries: 5,
});
(async ()=>{
    await client.connect()
    await client.signInBot({apiId:API_id, apiHash:API_hash},{botAuthToken:TOKEN})
})()


router.post('/get/Entity/:username', async (req,res)=>{
    console.log('/get/Entity => ', req.params.username);
    res.send(await client.getEntity(req.params.username))
})

router.post('/get/Entity', async (req,res)=>{
    var usr;
    usr = req.body.username
        ? req.body.username
        : req.body.id
    console.log('/get/Entity => ', usr);
    res.send(await client.getEntity(usr))
})

router.post('/get/Participants', async (req,res)=>{
    console.log('/get/Participants => ', req.body.id);
    res.send(await client.getParticipants(req.body.id, {}))
})

router.post('/delete/Messages', async (req,res)=>{
    console.log('/delete/Messages => ', req.body.id);
    var messages_str = req.body.messages.split(',')
    var messages_int = []
    for (let message of messages_str){
        messages_int.push(Number(message))
    }
    console.log(messages_int);
    await client.deleteMessages(req.body.id, messages_int, {revoke:true})
    res.status(200).send()
})


app.use(express.json());
app.use('/', router);
app.listen(process.env.port || 3000, process.env.host || '0.0.0.0')
console.log("Running on port 3000...\n => 127.0.0.1:3000")

