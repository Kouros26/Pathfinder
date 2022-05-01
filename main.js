/*APPEL DES PREREQUIS*/
const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX} = require('./config');
const { readdirSync } = require("fs");
const fs = require("fs");
const { config } = require('process');
const distube = require('distube');
const client = new Client();
const { MessageEmbed } = require("discord.js");
const DisTube = require('distube');
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, customFilters: { "bassboost": "bass=g=20,dynaudnorm=f=200", "8d": "apulsator=hz=0.08", "vaporwave": "aresample=48000,asetrate=48000*0.8", "nightcore": "aresample=48000,asetrate=48000*1.25", "phaser": "aphaser=in_gain=0.4", "subboost": "asubboost", "bassboost": "bass=g=20,dynaudnorm=f=200", }  });
/*-----------------*/



/*INITIALISATION DU BOT*/
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Command Loaded: ${getFileName.help.name}`);
    };
  });
};

loadCommands();

client.on('ready', () => {
  
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({status: 'dnd', activity:{ name: 'Kouros code me', type: 3}});
});
/*--------------------*/



/*LECTURE DU FICHIER JSON POUR PERMETTRE AU BOT DE S'ORIENTER SUR LES SERVEURS*/
client.on('message', message => {

  channel = []
  index = []
  variable = []
  const arrayjson = (fs.readFileSync("./logserveur.json", "utf-8"));// Le bot lit le ficher logserveur.json
  arrayjson2 = [arrayjson] // Il le place dans une liste
  arrayfinal = []
  arrayfinal = arrayjson.split(`"`); // Il sépare chaque élément

  arrayfinal.forEach(element => {
    if (isNaN(element) == false) { // Si l'élément est un nombre...
      variable.push(element) //...Il le place dans une autre liste
    }
    if (element.startsWith("<")) variable.push(element.slice(2, 20)) // Si l'élément commence par un "<" (comme les id de salons sur Discord) il le découpe pour en faire 
  });
  console.log(`Nombre de serveurs : ${variable.length/2}`)  

  variable.forEach(element => {
    if (message.guild.id === element) {
      index = variable.indexOf(element);
      channel = variable[index + 1]
    }
  })
/*---------------------------------------------------------------------------*/



  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first()

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return;

  if (command.help.permissions && !message.member.hasPermission("BAN_MEMBERS")) return message.reply("Permissions missing");

  if (command.help.args && !args.length) {
    let noArgsReply = ``;

    if (command.help.usage) noArgsReply += `${message.author} The command must be send this way : \`${PREFIX}${command.help.name} ${command.help.usage}\``
    return message.channel.send(noArgsReply);
  }
  if (command.help.isUserAdmin && !user) return message.reply("Nobody is tagged");
  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply("Permissions missing");

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;
  
  if(tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if(timeNow < cdExpirationTime && !message.member.hasPermission('BAN_MEMBERS')) {
      Nombresecondes = (cdExpirationTime - timeNow) / 1000;
      Nombreminutes = Math.floor(Nombresecondes / 60);
      Nombreheures = Math.floor(Nombreminutes / 60);

      timeLeftsec = Nombresecondes % 60;
      timeLeftmin = Nombreminutes % 60;

      return message.reply(`You can't use this command before ${Nombreheures} hour(s), ${timeLeftmin} minute(s) et ${timeLeftsec.toFixed(0)} second(s).`)
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args, channel);

});

/*
client.on('voiceStateUpdate', async (oldmember, newmember, message) => {
  if (oldmember.member.user.bot) return;

  if (oldmember.channelID === null && newmember.member.id === '365530758007357441') {
    const connection = await newmember.member.voice.channel.join()
    const dispatcher = connection.play('./assets/musiques/F-_Artiste_A-Mj.mp3')
    dispatcher.on('start', () => {
      console.log('audio playing')
    })
    dispatcher.on('finish', () => {
      console.log('audio finished')
    })
    dispatcher.on('error', console.error);
  }
  else if (newmember.channelID === null) {
  }
  else {
    if (oldmember.member.id === '365530758007357441') {
      client.channels.cache.get(newmember.channelID).join()
    }
  }
})
*/


client.distube
  .on("addSong", (message, queue, song) => {
   const embed = new MessageEmbed()
      .setTitle(`:link: Added ${song.name} to the list`)
      .setColor("#7f00ff")
      .setDescription(`**Duration**: \`${song.formattedDuration}\``)
      .setTimestamp()
      .setFooter(`by : ${message.author.username}`, message.author.avatarURL())
      message.channel.send(embed)
  })
  .on("playSong", (message, queue, song) => {
   const embed = new MessageEmbed()
     .setTitle(`:musical_note: Now playing : ${song.name}`)
     .setColor("#7f00ff")
     .setDescription(`**Duration**: \`${song.formattedDuration}\``)
     message.channel.send(embed)
  })



client.on("message", async message => {
  let logserveurs = (fs.readFileSync("./logserveur.json"));
  if(!logserveurs[message.guild.id]) {
    logserveurs[message.guild.id] = {
      logserveurs: config.CHANNEL
    };
  };
});

client.login(TOKEN);