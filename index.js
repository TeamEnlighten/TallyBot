const Discord = require('discord.js')
const { Intents } = Discord
const client = new Discord.Client({
  intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ]
})
const config = require('./config.json')
const WOKCommands = require('wokcommands')
const path = require('path')
const tally = require('./tally')

client.on('ready', async () => {
    console.log(`${client.user.tag} is keeping score!`)

    tally(client)

    new WOKCommands(client, {
      commandsDir: path.join(__dirname, 'commands'),
      testServers: ['862258527689900052'],
      botOwners: ['471026063498018823'],
      ignoreBots: true,
      dbOptions: {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
      },
      disabledDefaultCommands: [
           //'help',
           'command',
           'language',
           'prefix',
           //'slash',
           //'requiredrole',
           //'channelonly'
      ],

      mongoUri: config.mongoPath,
  })   
  
    client.user.setActivity(config.activity.game, {
      type:'WATCHING'
    });  //WATCHING (3), PLAYING (1), LISTENING (2)
 
})

client.login(config.token)
