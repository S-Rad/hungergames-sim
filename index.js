const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const players = [];

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", (guild) => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", (guild) => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log("This is the args");
  console.log(args);

  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${
        m.createdTimestamp - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ping)}ms`
    );
  }

  if (command === "add" && args.length > 0) {
    addPlayer(args);
  }
  console.log(players);
});

function addPlayer(playerNameArray) {
  let playerName = "";
  playerNameArray.forEach(function (player, index) {
    playerName = playerName + player + " ";
  });
  playerName = playerName.slice(0, playerName.length - 1);
  players.push(playerName);
  console.log("Added Player " + playerName);
}

client.login(config.token);
