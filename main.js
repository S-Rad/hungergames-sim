
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.on('ready', () => {
        var generalChannel = client.channels.get("483264732518809690") // Replace with known channel ID
        generalChannel.send("Hello, world!")  
    })
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "Njk4MjM2ODk4MTM2ODE3Nzc1.XpC7Kg.5SAm7o0_6_QEU0TbclDfl1Y64So"



client.login(bot_secret_token)