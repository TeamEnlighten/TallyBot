const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    commands: ['void', 'v'],
    aliases: ['v'],
    description: "Voids a Win / Loss from the Members score!",
    minArgs: 3,
    maxArgs: 3,
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "<@user> <win or loss> <#>",
    callback: async (message) => {

        let command = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);
        let arr = command.split(' ')
        let minus = arr[1].toLowerCase()
        let number = arr[2]
        number = Number(number)

            if (!Number.isInteger(number) || number <= 0) {
                message.channel.send('Please insert the number of Wins/Losses you would like to retract.')
                return
            }

        let target = message.mentions.users.first()
            if (!target) { 
                message.channel.send('Please mention the user!')
                return
            } else {target = message.mentions.members.first().user.id}

        let targ =  message.mentions.members.first().user.username
        let targ1 =  message.mentions.members.first().user.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guildId = message.guild.id
        const userId = target

        if (minus === 'win') {
            number = `-${number}`
            const totalWin = await tally.addWin(guildId, userId, number)
            const winEmbed = new Discord.MessageEmbed()
            .setTitle('Win Retracted!')
            .setAuthor(`${targ}`, targ1)
            .setColor('RANDOM')
            .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalWin} wins.`)
            .setTimestamp()

            message.channel.send(winEmbed)

        } else if (minus === 'loss') {
            number = `-${number}`
            const totalLoss = await tally.addLoss(guildId, userId, number)
            const lossEmbed = new Discord.MessageEmbed()
            .setTitle('Loss Retracted!')
            .setAuthor(`${targ}`, targ1)
            .setColor('RANDOM')
            .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalLoss} losses.`)
            .setTimestamp()

            message.channel.send(lossEmbed)
        } else {
            message.channel.send('Please enter win or loss only!')
            return
        }     
    }
}