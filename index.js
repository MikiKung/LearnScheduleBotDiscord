const { Client, Intents } = require('discord.js');
const dotenv = require("dotenv");
const schedule = require("./schedule.json")
const express = require("express")

const app = express()

app.get("/",(req,res)=>{
    res.send("test wake Heroku")
})
dotenv.config()

app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
    console.log("Burger Chan is Ready on Express")
    client.login(process.env.TOKEN)
})

const client = new Client(
    {
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ]
    }
);

var currentdate = new Date();
var day = currentdate.getDay()


client.on('ready', () => {
    console.log("Burger Chan is Ready on Bot")
})

client.on('messageCreate', msg => {

    if (msg.content == "$nextday") {
        msg.reply(schedule.schedule[day])
    }
    else if (msg.content == "$today") {
        msg.reply(schedule.schedule[day - 1])
    }
    else if (msg.content == "$lastday") {
        msg.reply(schedule.schedule[day - 2])
    }
    else if (msg.content == "$allday") {
        var alltext = ""
        for (let i = 0; i < schedule.schedule.length; i++) {
            alltext += schedule.schedule[i] + "\n"
        }
        msg.reply(alltext)
    }
    else if (msg.content == "$help") {
        msg.reply("$today บอกตารางเรียนวันนี้ \n $nextday บอกตารางเรียนพรุ่งนี้ \n $lastday บอกตารางเรียนเมื่อวาน \n $allday บอกตารางเรียนทั้งหมด \n $help บอก syntax ทั้งหมด")
    }
})

