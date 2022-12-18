const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays all commands.'),
	async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle('Command Menu')
        .setColor('FFFFFF')
        .addFields(
            { name: '__Loss__', value: '**Description:** Adds a Loss to the Members score.\n**Syntax:** <@user>', inline: false },
            { name: '__Reset__', value: '**Description:** Resets a Members score.\n**Syntax:** <@user>', inline: false },
            { name: '__Score__', value: `**Description:** Show the Current Members score.\n**Syntax:** <@user>`, inline: false},
            { name: '__Void__', value: `**Description:** Voids a Win / Loss from the Members score.\n**Syntax:** <@user> <win or loss> <#>`, inline: false },
            { name: '__Win__', value: '**Description:** Adds a Win to the Members score.\n**Syntax:** <@user>', inline: false },
            { name: '__Leaderboard__', value: '**Description:** Shows the Top 10 in your guild!\n**Syntax:** N/A', inline: false },
            { name: '__Set__', value: '**Description:** Sets the Wins/Losses for a Member.\n**Syntax:** N/A', inline: false },
        )

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        }) 
    }
}
