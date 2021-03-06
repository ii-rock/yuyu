const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const ms = require('ms');
const fs = require("fs");
const config = require('./config.json')

var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    cleverbot.configure({botapi: `${process.env.api_Key}`});


let prefix = process.env.prefix;

var bot = new Discord.Client({
    autoReconnect: true
});


const PREFIX = "d!";

var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;

const TWITCH = "https://www.twitch.tv/drugowns";

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

       var playMsg = message.channel.sendMessage(`Now playing a song in **${message.member.voiceChannel.name}**`);

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect()
            var embed = new Discord.RichEmbed()
                .setAuthor("Queue Finished")
                .setDescription(`The queue has finished, feel free to use the \`${PREFIX}play\` command to play more songs!`)
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor("#FF0000")
                .setTimestamp()
            message.channel.sendEmbed(embed);
            playMsg.delete();
    });
}

var eightBall = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "utlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];



var servers = {};

states = ["Music", "Spotify", `${PREFIX}help`];

bot.on("ready", function() {
    console.log("The bot is online and ready to be used");
    bot.user.setActivity("Spotify", {type: "LISTENING"})
    setInterval(function() {

        upSecs = upSecs + 1
        if (upSecs >= 60) {
            var userdisplay = states[Math.floor(Math.random() * states.length)];
            bot.user.setActivity(userdisplay, {type: "LISTENING"})
            
            upSecs = 0
            upMins = upMins + 1
        }
        if (upMins >= 60) {
            upMins = 0
            upHours = upHours + 1
        }
        if (upHours >= 24) {
            upHours = 0
            upDays = upDays + 1

        }


    }, 1000)
    
});


bot.on("message", function(message, connection) {
    if (!message.content.startsWith(PREFIX)) return;
    if (!message.guild) return;
    if (!message.author.equals(bot.user)) 

    
    var mentioned = message.mentions.users.first()
    var m = message.channel
    var author = message.author

    if (message.author.equals(bot.user)) return;
    
    
    console.log(`${message.author.username}#${message.author.discriminator}: ${message.content}`)
    
   
    var WholeMsg = message.content.split(" ").slice(1)
    var theMsg = WholeMsg.join(" ")
    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "serverinfo":
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Server Owner", message.guild.owner)
    .addField("Server ID", message.guild.id)
    .addField("Region", message.guild.region)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined At", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

     message.channel.send(serverembed);
     break;
        case "invite":
           var embeed = new Discord.RichEmbed()
                .setAuthor("My Invitation Link")
                .setDescription(`[Click Here](${process.env.invite})`)
                .setColor("#C94830")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
            message.channel.sendEmbed(embeed);
            break;
        case "help":
           var embeed = new Discord.RichEmbed()
                .setAuthor("Commands")
                .setDescription(`${PREFIX}userinfo - shows a few information about the mentioned user.\n${PREFIX}8ball - ask a question and the bot will reply with a random answer.`)
                .addField("Music", `${PREFIX}play <youtube link> - plays a song from youtube in your current voice channel.\n${PREFIX}stop - stops the player and leaves your current channel.\n${PREFIX}skip - skips your current song.`)
                .addField("About Bot", `${PREFIX}ping - shows the time taken for the bot to respond.\n${PREFIX}uptime - shows the time since the bot has started up.\n${PREFIX}servers - shows the servers count that the bot has joined.\n${PREFIX}invite - sends my invitation link.`)
                .setColor("#3C51C3")
                .setFooter("We will keep adding more features and commands!")
            message.channel.sendEmbed(embeed);

            break;
        case "serverinfo":
            if (message.guild) {
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined At", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

     message.channel.send(serverembed);
            } else {
                m.reply("You can't use this command in private messages.")
            }
     break;
         case "setavatar":
           if (!args[1]) {
            m.sendMessage("The avatar cannot be empty!");
          } else {
            bot.user.setAvatar(args[1]);
            var embeed = new Discord.RichEmbed()
                .setAuthor("Avatar Changed")
                .setDescription(`My profile picture has been successfully changed.`)
                .setImage(args[1])
                .setColor("#C94830")
                .setTimestamp()
            message.channel.sendEmbed(embeed);
           }
        break;
        case "setname":
           if (!theMsg) {
            m.sendMessage("The username cannot be empty!");
           } else {
            bot.user.setUsername(theMsg);
            m.sendMessage(`My name has been successfully changed to **${theMsg}**`)
           }
           break;
        case "watch":
        var embeed = new Discord.RichEmbed()
                .setAuthor("State Changed")
                .setDescription(`Now watching ${theMsg}`)
                .setColor("#C94830")
                .setTimestamp()
            message.channel.sendEmbed(embeed);
           
        bot.user.setActivity(theMsg, {type: "WATCHING"});
        break;
        case "stream":
        if (config.admins.includes(message.author.id)) {
        let embed = new Discord.RichEmbed()
            .setAuthor("State Changed")
            .setDescription(`Now streaming ${theMsg}!`)
            .setColor("#51317B")
            .setTimestamp()

            message.channel.sendEmbed(embed);
            bot.user.setGame(`${theMsg}`, `${TWITCH}`);
            } else {
            message.channel.sendMessage("You do not have permissions to perform this action.")
           }
            break;
        case "end":
        if (config.admins.includes(message.author.id)) {
        let embeds = new Discord.RichEmbed()
            .setAuthor("Logging Out")
            .setDescription(`Logged out of servers.`)
            .setColor("#00008B")
            .addField("Discord Servers", `Disconnected`)
            .setTimestamp()

            message.channel.sendEmbed(embeds);

            bot.destroy();
            } else {
            message.channel.sendMessage("You do not have permissions to perform this action.")
           }
            break;
        case "uptime":
        let embedr = new Discord.RichEmbed()
            .setAuthor("My Uptime")
            .setDescription("```Current Uptime: \n" + upDays + " Days \n" + upHours + " Hours \n" + upMins + " Minutes \n" + upSecs + " Seconds```")
            .setColor("#51317B")
            .setTimestamp()
            message.channel.sendEmbed(embedr);
            break;
        case "servers":
        let embedo = new Discord.RichEmbed()
            .setAuthor("Servers Count")
            .setDescription(`I am in ${bot.guilds.size} servers`)
            .setColor("#AE9C56")
            .setTimestamp()
            message.channel.sendEmbed(embedo);
            break;
        case "ping":
        let embedg = new Discord.RichEmbed()
            .setAuthor("My Ping")
            .setDescription(`${bot.ping.toString()}ms`)
            .setColor("#3892EF")
            .setTimestamp()
            message.channel.sendEmbed(embedg);
            break;
        case "8ball":
            if (theMsg) message.channel.sendMessage(eightBall[Math.floor(Math.random() * eightBall.length)]);
            else message.channel.sendMessage("Can't read that");
            break;
        case "restart":
        if (config.admins.includes(message.author.id)) {
           message.channel.sendMessage("Alright, i will restart asap...");
            bot.destroy()

            bot.login("NDA1NTMwNDAyMDI0MDYyOTg3.DUlvqw.WzMAsW44eKu5ve-A7ZeyE5llV7Q");

            message.channel.sendMessage("I've successfully restarted.");
            
           } else {
               message.channel.sendMessage("You do not have permissions to perform this action.")
           }
           break;
        case "play":
            if (!config.admins.includes(message.author.id)) return;
            if (!args[1]) {
                var embede = new Discord.RichEmbed()
                .setAuthor("No Link Given")
                .setDescription("Please provide a Link/URL.")
                .addField("Usage", `${PREFIX}play <youtube link>`)
                .setColor("#0000FF")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
            message.channel.sendEmbed(embede);
                return;
            }

            if (!message.member.voiceChannel) {
                var embedi = new Discord.RichEmbed()
                .setAuthor("No Voice Channel")
                .setDescription(message.author + ", please join a voice channel.")
                .setThumbnail(bot.user.displayAvatarURL)
                .setColor("#FF0000")
                .setTimestamp()
            message.channel.sendEmbed(embedi);
                return;
            }
            
            if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);

            });
            break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) {
            	server.dispatcher.end();
            } else {

            }
            break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;   
        case "resume":
          var server = servers[message.guild.id];

          

          if (!server.queue) {
           m.sendMessage(`You did not add anything to the queue! Please use \`${PREFIX}play <youtube link>\` to play a song!`);
          } else {
            server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
           server.dispatcher.resume();
          }
       
          

          break;    
        case "join":
            if (!message.member.voiceChannel) {
                m.sendMessage(`You are not connected to any voice channel!`);
            } else {
                message.member.voiceChannel.join();
                m.sendMessage(`Successfully connected to **${message.member.voiceChannel.name}**`);
            }
            break;
    }

});

bot.login(process.env.login);
