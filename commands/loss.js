const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    commands: ['loss', 'l'],
    aliases: ['l'],
    description: "Adds a Loss to the Members score!",
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    expectedArgs: "<@user>",
    callback: async (message) => {

        let target = message.mentions.users.first()
            if (!target) { 
                message.channel.send('Please mention the Loser!')
                return
            } else {target = message.mentions.members.first().user.id}

        let targ =  message.mentions.members.first().user.username
        let targ1 =  message.mentions.members.first().user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guildId = message.guild.id
        const userId = target
        const number = 1

        const totalLoss = await tally.addLoss(guildId, userId, number)

            const lossEmbed = new Discord.MessageEmbed()
            .setTitle('You Lost!')
            .setAuthor(`${targ}`, targ1)
            .setColor('RANDOM')
            .setDescription(`${targ}, your loss has been recorded! \n\n You now have ${totalLoss} losses.`)
            .setTimestamp()

            message.channel.send(lossEmbed)
          
    }
}