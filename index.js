const { Client, Intents } = require('discord.js');
const dotenv = require("dotenv");
const schedule = require("./schedule.json")

dotenv.config()

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
    console.log("Miki Chan is Ready")
})

client.on('messageCreate', msg => {

    if (msg.content == "$nextday") {
        msg.reply(schedule.schedule[day])
    }
    else if (msg.content == "$today") {
        msg.reply(schedule.schedule[day-1])
    }
    else if (msg.content == "$lastday"){
        msg.reply(schedule.schedule[day-2])
    }
    else if (msg.content == "$allday"){
        var alltext = ""
        for (let i = 0; i < schedule.schedule.length; i++) {
            alltext += schedule.schedule[i]+"\n"
        }
        msg.reply(alltext)
    }
    else if (msg.content == "$help"){
        msg.reply("$today บอกตารางเรียนวันนี้ \n $nextday บอกตารางเรียนพรุ่งนี้ \n $lastday บอกตารางเรียนเมื่อวาน \n $allday บอกตารางเรียนทั้งหมด \n $help บอก syntax ทั้งหมด")
    }
})

client.login(process.env.TOKEN)