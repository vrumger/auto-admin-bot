if (!process.env.BOT_TOKEN) {
    require('dotenv').config();
}

const {
    BOT_TOKEN,
    CHAT_ID,
} = process.env;

const Telegraf = require('telegraf');
const bot = new Telegraf(BOT_TOKEN);

bot.use((ctx, next) => ctx.chat && ctx.chat.id == CHAT_ID && next());

bot.on('new_chat_members', async ctx => {
    try {
        const botInfo = await bot.telegram.getChatMember(ctx.chat.id, ctx.botInfo.id);

        await bot.telegram.promoteChatMember(ctx.chat.id, ctx.message.new_chat_members[0].id, botInfo);
        await ctx.reply('You have been promoted!');
    } catch (err) {
        await ctx.reply('There was an error.');
        console.log(err);
    }
});

bot.launch();
