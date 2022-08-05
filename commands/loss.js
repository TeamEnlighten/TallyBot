const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    category: 'Tally',
    description: "Adds a Loss to the Members score!",
    slash: true,
    testOnly: false,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    expectedArgs: "<@user>",

    options: [
        {
          name: 'member',
          description: 'Choose Member to add Loss.',
          required: true,
          type: Discord.Constants.ApplicationCommandOptionTypes.USER,
        },
    ],

    callback: async ({ interaction, guild }) => {

        let target = interaction.options.getUser('member')

        let targ =  target.username
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guildId = guild.id
        const userId = target.id
        const number = 1

        const totalLoss = await tally.addLoss(guildId, userId, number)
        let lossText;

        if (totalLoss === 1) {
            lossText = 'loss'
        } else { lossText = 'losses'}

        const lossEmbed = new Discord.MessageEmbed()
        .setTitle('You Lost!')
        //.setAuthor({text: targ, iconURL:targ1})
        .setColor('RED')
        .setThumbnail(`${targ1}`)
        .setDescription(`**${targ}**, your loss has been recorded! \n\n You now have ${totalLoss} ${lossText}.`)
        .setTimestamp()

        interaction.reply({
            embeds: [lossEmbed],
            ephemeral: false,
            })  
          
    }
}