const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    commands: ['win', 'w'],
    aliases: ['w'],
    description: "Adds a Win to the Members score!",
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<@user>",
    callback: async (message) => {

        let target = message.mentions.users.first()
            if (!target) { 
                message.channel.send('Please mention the Winner!')
                return
            } else {target = message.mentions.members.first().user.id}

        let targ =  message.mentions.members.first().user.username
        let targ1 =  message.mentions.members.first().user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guildId = message.guild.id
        const userId = target

        const totalWin = await tally.addWin(guildId, userId)

            const winEmbed = new Discord.MessageEmbed()
            .setTitle('You Won!')
            .setAuthor(`${targ}`, targ1)
            .setColor('RANDOM')
            .setDescription(`${targ}, your win has been recorded! \n\nYou now have ${totalWin} wins.`)
            .setTimestamp()

            message.channel.send(winEmbed)
          
    }
}