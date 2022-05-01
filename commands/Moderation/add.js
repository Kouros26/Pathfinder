const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");

module.exports.run = (client, message, args, channel) => {
  
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const Bronze = new MessageAttachment('./assets/img/bronze.png');
  const Argent = new MessageAttachment('./assets/img/silver.png');
  const Or = new MessageAttachment('./assets/img/gold.png');
  const Platine = new MessageAttachment('./assets/img/platinium.png');
  const Diamant = new MessageAttachment('./assets/img/diamond.png');
  const Master = new MessageAttachment('./assets/img/master.png')
  const Predateur = new MessageAttachment('./assets/img/predatorrank.png');

  Img = ['attachment://bronze.png','attachment://silver.png','attachment://gold.png','attachment://platinium.png','attachment://diamond.png','attachment://master.png','attachment://predatorrank.png']
  var ImgAff = []

  const user = message.author;
  const user_message = message.author.username;
  args.forEach(roleName => {

    let role = message.guild.roles.cache.find(role => role.name === roleName.toString());
    let Bronzerole = message.guild.roles.cache.find(r => r.name === ("BRONZE"));
    let Argentrole = message.guild.roles.cache.find(r => r.name === ("SILVER"));
    let Orrole = message.guild.roles.cache.find(r => r.name === ("GOLD"));
    let Platinerole = message.guild.roles.cache.find(r => r.name === ("PLATINIUM"));
    let Diamantrole = message.guild.roles.cache.find(r => r.name === ("DIAMOND"));
    let Masterrole = message.guild.roles.cache.find(r => r.name === ("MASTER"));
    let Predatorrole = message.guild.roles.cache.find(r => r.name === ("PREDATOR"));
    if (!Bronzerole) {
    Bronzerole = message.guild.roles.create({
      data: {
        name: 'BRONZE',
        color: '#ae6800',
        permissions: []
      }
    });
    }
    if (!Argentrole) {
      Argentrole = message.guild.roles.create({
        data: {
          name: 'SILVER',
          color: '#c0c0c0',
          permissions: []
        }
      });
    }
    if (!Orrole) {
      Orrole = message.guild.roles.create({
        data: {
          name: 'GOLD',
          color: '#e4b400',
          permissions: []
        }
      });
    }
    if (!Platinerole) {
      Platinerole = message.guild.roles.create({
        data: {
          name: 'PLATINIUM',
          color: '#17c8f5',
          permissions: []
        }
      });
    }
    if (!Diamantrole) {
      Diamantrole = message.guild.roles.create({
        data: {
          name: 'DIAMOND',
          color: '#1e6bac',
          permissions: []
        }
      });
    }
    if (!Masterrole) {
      Masterrole = message.guild.roles.create({
        data: {
          name: 'MASTER',
          color: '#872fdd',
          permissions: []
        }
      });
    }
 
    if (!Predatorrole) {
      Predatorrole = message.guild.roles.create({
        data: {
          name: 'PREDATOR',
          color: '#86211a',
          permissions: []
        }
      });
    }    

    if (role == Bronzerole || role == Argentrole || role == Orrole || role == Platinerole || role == Diamantrole || role == Masterrole || role == Predatorrole) {
      if (message.member.roles.cache.has(Bronzerole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Bronzerole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !");
     }
      
     
      if (message.member.roles.cache.has(Argentrole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Argentrole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !"); 
      }
      
      
      if (message.member.roles.cache.has(Orrole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Orrole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !");
      }
      
      
      if (message.member.roles.cache.has(Platinerole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Platinerole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !");
      }
     
     
      if (message.member.roles.cache.has(Diamantrole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Diamantrole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !");
      }
      
      
      if (message.member.roles.cache.has(Masterrole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Masterrole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !");
      }

      if (message.member.roles.cache.has(Predatorrole.id)) {
        if (!message.member.roles.cache.has(role.id)) {
          message.member.roles.remove(Predatorrole)
        }
        if (message.member.roles.cache.has(role.id)) return message.channel.send("You already have this role !");
      }
      
      if (role.permissions.has("KICK_MEMBERS")) return message.channel.send("Sorry friend, but you can't :)");
      message.member.roles.add(role)
        .then(m => message.channel.send(`Welcome to the Apex's ${role.name} league !`))
        .then(msg => console.log(`${user_message} joined ${role.name}.`))
        .catch(e => console.log(e));
      
      if (role.id === Bronzerole.id) {
        ImgAff = Img[0]
        ImgNom = Bronze
      }      
        
      if (role.id === Argentrole.id) {
        ImgAff = Img[1]
        ImgNom = Argent
      }
      if (role.id === Orrole.id) {
        ImgAff = Img[2]
        ImgNom = Or
      }
      if (role.id === Platinerole.id) {
        ImgAff = Img[3]
        ImgNom = Platine
      }
      if (role.id === Diamantrole.id) {
        ImgAff = Img[4]
        ImgNom = Diamant
      }
      if (role.id === Masterrole.id) {
        ImgAff = Img[5]
        ImgNom = Master
      }
      if (role.id === Predatorrole.id) {
        ImgAff = Img[6]
        ImgNom = Predateur
      }

      const Embed = new MessageEmbed()
      .attachFiles(ImgNom)
      .setTitle("Bot Pathfinder")
      .setColor("#2836BA")
      .setDescription(`**Action**: League change\n**New Role**: ${role.name}`)
      .setThumbnail(ImgAff)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL()); 
      if (client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(Embed);
    } else {
      message.channel.send("You can only add these roles : BRONZE, SILVER, GOLD, PLATINIUM, DIAMOND, MASTER, PREDATOR");
    }
    
    ImgAff = []
  })
  
};

module.exports.help = {
  name: "add",
  aliases: ['add', 'rank'],
  category: 'moderation',
  description: "Change your Apex rank",
  cooldown: 60,
  usage: "<Role> (BRONZE, SILVER, GOLD, PLATINIUM, DIAMOND, MASTER, PREDATOR)",
  args: true  
};
