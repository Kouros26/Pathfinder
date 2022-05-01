module.exports.run = async (client, message, args) => {

  elshuffle = ['https://www.youtube.com/watch?v=OfsXPTIeOpc', 'https://www.youtube.com/watch?v=R-BiGuUU8bo', 'https://www.youtube.com/watch?v=t1V8AepW_qM', 'https://youtu.be/sqleUM1SQ1g', 'https://youtu.be/306Dxe_uLEU']
  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command')
  const music = args.join(" ");
  client.distube.play(elshuffle[Math.floor(Math.random() * 5)], music);
};

module.exports.help = {
  name: 'elcomic',
  aliases: ['el_comic'],
  category: 'Music',
  description: "Shuffle all the finished songs from the great almighty El Comic",
  cooldown: 5,
  usage: '',
  isUserAdmin: false, //si on peut utiliser la commande sur un admin, true = non
  permissions: false, //si il faut des permissions pour utiliser la commande
  args: false
};