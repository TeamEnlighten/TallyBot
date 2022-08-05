const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    category: 'Tally',
    description: "Resets a Members score!",
    slash: true,
    testOnly: false,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "<@user>",

    options: [
        {
          name: 'member',
          description: 'Choose Member to Reset Score.',
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

        await tally.resetScore(guildId, userId)

        const resetEmbed = new Discord.MessageEmbed()
        .setTitle('Score Reset!')
        //.setAuthor({text: targ, iconURL:targ1})
        .setColor('YELLOW')
        .setThumbnail(`${targ1}`)
        .setDescription(`**${targ}**, your score has been reset!`)
        .setTimestamp()

        interaction.reply({
            embeds: [resetEmbed],
            ephemeral: false,
            })  
          
    }
}