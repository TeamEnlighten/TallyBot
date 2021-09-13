const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    commands: ['score', 's'],
    aliases: ['s'],
    description: "Show the Current Score!",
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<@user>",
    callback: async (message) => {

        let target = message.mentions.users.first()
        let targ =  message.mentions.users.first()
        let targ1 =  message.mentions.users.first()
    
         if (!target) { target = message.author.id
          } else { target = message.mentions.users.first().id}

         if (!targ) { targ = message.member.user.username
         } else { targ = message.mentions.members.first().user.username}

          if (!targ1) { targ1 = message.member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })
         } else { targ1 = message.mentions.members.first().user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })}

         const guildId = message.guild.id
         const userId = target

         const wins = await tally.getWin(guildId, userId)
         const losses = await tally.getLoss(guildId, userId)

            const scoreEmbed = new Discord.MessageEmbed()
            .setTitle(`Current Score!`)
            .setAuthor(`${targ}`, targ1)
            .setColor('RANDOM')
            .setDescription(`Wins: ${wins} | Losses: ${losses}`)
            .setTimestamp()

            message.channel.send(scoreEmbed)
          
    }
}