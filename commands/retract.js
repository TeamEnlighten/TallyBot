const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    commands: ['retract', 'r'],
    aliases: ['r'],
    description: "Adds a Win to the Members score!",
    minArgs: 3,
    maxArgs: 3,
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "<@user> <win or loss> <#>",
    callback: async (message) => {

        let command = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);

        let minus = command[2].toLowerCase()

        console.log(minus)

            if (minus !== 'win' || minus !== 'loss') {
                message.channel.send('Please enter win or loss only!')
                return
            } else {

        let number = command[3]

            if (number === NaN) {
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

        } 

        if (minus === 'loss') {
            number = `-${number}`
            const totalLoss = await tally.addLoss(guildId, userId, number)

            const lossEmbed = new Discord.MessageEmbed()
            .setTitle('Loss Retracted!')
            .setAuthor(`${targ}`, targ1)
            .setColor('RANDOM')
            .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalLoss} losses.`)
            .setTimestamp()

            message.channel.send(lossEmbed)
        }
    }
          
    }
}