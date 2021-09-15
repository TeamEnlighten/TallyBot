const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    commands: ['reset', 'r'],
    aliases: ['r'],
    description: "Resets a Members score!",
    minArgs: 1,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "<@user>",
    callback: async (message) => {

        let target = message.mentions.users.first()
        
            if (!target) { 
                message.channel.send('Please mention the user!')
                return
            } else {target = message.mentions.members.first().user.id}

        let targ =  message.mentions.members.first().user.username
        let targ1 =  message.mentions.members.first().user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guildId = message.guild.id
        const userId = target
        await tally.resetScore(guildId, userId)
        const resetEmbed = new Discord.MessageEmbed()
        .setTitle('Score Reset!')
        .setAuthor(`${targ}`, targ1)
        .setColor('RANDOM')
        .setDescription(`${targ}, your score has been reset!`)
        .setTimestamp()

            message.channel.send(resetEmbed)
    }
}