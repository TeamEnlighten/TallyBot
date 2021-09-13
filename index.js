const Discord = require('discord.js')
const client = new Discord.Client()
const mongo = require('./schema/mongo')
const loadCommands = require('./commands/load-commands')

client.on('ready', async () => {
    console.log(`${client.user.tag} is keeping score!`)

    await mongo()
    loadCommands(client) 
  
    client.user.setActivity(config.activity.game, {
      type:'WATCHING'
    });  //WATCHING (3), PLAYING (1), LISTENING (2)
 
})

client.login(process.env.TOKEN)
