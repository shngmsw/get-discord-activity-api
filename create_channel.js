const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    PermissionsBitField
} = require('discord.js');
const ROLE_CHANNEL_CREATED = '1124959342739865601';
const CATEGORY_TIME_LINE = '1124953384840077424';
module.exports.createChannelButton = (message) => {
    try {
        if (message.content === '!createButton') {
            const buttons = new ActionRowBuilder();
            buttons.addComponents([new ButtonBuilder().setCustomId('create_channel').setLabel('タイムラインを作成する').setStyle(ButtonStyle.Success)]);
            message.channel.send({
                components: [buttons],
            });
        }
    } catch (error) {
        console.error(error);
        message.delete();
    }
};

module.exports.createChannel = async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId == 'create_channel') {
            // memberのロールを確認
            const member = interaction.member;
            const roles = member.roles.cache;
            const roleIds = roles.map((role) => role.id);
            if (!roleIds.includes(ROLE_CHANNEL_CREATED)) {
                // チャンネルを作成する
                const member = interaction.member;
                const channelName = `${member.user.username}-channel`;
                const guild = interaction.guild;
                const newChannel = await guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildAnnouncement,
                    parent: CATEGORY_TIME_LINE,
                    permissionOverwrites: [
                        {
                            id: member.user.id,
                            allow: [PermissionsBitField.Flags.ManageChannels]
                        }
                    ]
                });
                // memberにロール付与
                const role = guild.roles.cache.find((role) => role.id === ROLE_CHANNEL_CREATED);
                member.roles.add(role);
                    // ボタンを押したユーザーにチャンネルを表示する
                interaction.reply({
                    content: `<@${member.user.id}> のタイムライン ${newChannel} が作成されました！`,
                    ephemeral: true,
                });
            } else {
                // ボタンを押したユーザーにチャンネルを表示する
                interaction.reply({
                    content: `すでに作成済みです`,
                    ephemeral: true,
                });
            }
        }
    }
};
