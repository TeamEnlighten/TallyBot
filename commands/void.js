const tally = require('../tally')
const Discord = require('discord.js');

module.exports = {
    category: 'Tally',
    description: "Voids a Win / Loss from the Members score!",
    slash: true,
    testOnly: false,
    minArgs: 2,
    maxArgs: 2,
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "<@user> <win or loss> <#>",

    options: [
        {
          name: 'member',
          description: 'Choose Member to Void Score.',
          required: true,
          type: Discord.Constants.ApplicationCommandOptionTypes.USER,
        },
        {
          name: 'type',
          description: "Choose Win or Loss",
          required: true,
          type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
          choices: [
            {value: 'win', name: 'Win'}, 
            {value: 'loss', name: 'Loss'},
          ],
        },
    ],

    callback: async ({ interaction, guild }) => {

        let target = interaction.options.getUser('member')
        let targ =  target.username
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })
        let type = interaction.options.getString('type') 
        let number = 1

        const guildId = guild.id
        const userId = target.id
        const wins = await tally.getWin(guildId, userId)
        const losses = await tally.getLoss(guildId, userId)

        if (type === 'win' && wins === 0) {
            interaction.reply({
                content: 'You cannot Void any more Wins. Score is now 0.',
                ephemeral: true,
            })

            return
        }

        if (type === 'loss' && losses === 0) {
            interaction.reply({
                content: 'You cannot Void any more Losses. Score is now 0.',
                ephemeral: true,
            })

            return
        }
  
            if (type === 'win') {
                number = `-${number}`
                const totalWin = await tally.addWin(guildId, userId, number)
                const winEmbed = new Discord.MessageEmbed()
                .setTitle('Win Retracted!')
                .setThumbnail(`${targ1}`)
                .setColor('BLUE')
                .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalWin} wins.`)
                .setTimestamp()
    
                interaction.reply({
                    embeds: [winEmbed],
                    ephemeral: false,
                    }) 
    
            } else if (type === 'loss') {
                number = `-${number}`
                const totalLoss = await tally.addLoss(guildId, userId, number)
                const lossEmbed = new Discord.MessageEmbed()
                .setTitle('Loss Retracted!')
                .setThumbnail(`${targ1}`)
                .setColor('PURPLE')
                .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalLoss} losses.`)
                .setTimestamp()
    
                interaction.reply({
                    embeds: [lossEmbed],
                    ephemeral: false,
                    }) 
            } else {
                interaction.reply({
                    text: 'Something went Wrong! Report to Bot Owner.',
                    ephemeral: true
                 })
            }
          
    }
}