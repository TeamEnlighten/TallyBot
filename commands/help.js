const Discord = require('discord.js')

module.exports = {
    category: 'Tally',
    description: "Displays all commands.",
    slash: true,
    testOnly: false,
    callback: ({interaction }) => {

        const embed = new Discord.MessageEmbed()
        .setTitle('Command Menu')
        .setColor('WHITE')
        .addFields(
            { name: '__Loss__', value: '**Description:** Adds a Loss to the Members score.\n**Syntax:** <@user>', inline: false },
            { name: '__Reset__', value: '**Description:** Resets a Members score.\n**Syntax:** <@user>', inline: false },
            { name: '__Score__', value: `**Description:** Show the Current Members score.\n**Syntax:** <@user>`, inline: false},
            { name: '__Void__', value: `**Description:** Voids a Win / Loss from the Members score.\n**Syntax:** <@user> <win or loss> <#>`, inline: false },
            { name: '__Win__', value: '**Description:** Adds a Win to the Members score.\n**Syntax:** <@user>', inline: false },
        )

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        }) 
    }
}