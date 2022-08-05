const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    category: 'Tally',
    description: "Adds a Win to the Members score!",
    slash: true,
    testOnly: false,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    expectedArgs: "<@user>",

    options: [
        {
          name: 'member',
          description: 'Choose Member to add Win.',
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

        const totalWin = await tally.addWin(guildId, userId, number)
        let winText;

        if (totalWin === 1) {
            winText = 'win'
        } else { winText = 'wins'}

        const winEmbed = new Discord.MessageEmbed()
        .setTitle('You Won!')
        .setColor('GREEN')
        .setThumbnail(`${targ1}`)
        .setDescription(`**${targ}**, your win has been recorded! \n\n You now have ${totalWin} ${winText}.`)
        .setTimestamp()

        interaction.reply({
            embeds: [winEmbed],
            ephemeral: false,
            })  
          
    }
}