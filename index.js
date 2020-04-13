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

  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${
        m.createdTimestamp - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ping)}ms`
    );
  }

  if (command === "add" && args.length > 0) {
    message.channel.send("Added Player " + addPlayer(args));
  }

  if (command === "showplayers") {
    const text = "Players: " + returnPlayers();
    console.log(text);
    message.channel.send(text);
  }
});

function addPlayer(playerNameArray) {
  let playerName = "";
  playerNameArray.forEach(function (player, index) {
    playerName = playerName + player + " ";
  });
  playerName = playerName.slice(0, playerName.length - 1);
  players.push(playerName);
  return playerName;
}

function returnPlayers() {
  let text = "";
  players.forEach((player) => (text = text + player + ", "));
  text = text.slice(0, text.length - 2);
  return text;
}

client.login(config.token);
