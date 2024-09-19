const { bot } = require("./bot");
const startHandler = require("./handlers/startHandler");
const adminHandler = require("./handlers/adminHandler");
const { toMainMenu, toAdminMenu, toOwnerMenu } = require("./routes");
const ownerHandler = require("./handlers/ownerHandler");
const { separate, getFileLink, replyOnTranscription, downloadRecord, getTranscription, getGPTanswer, answerVoiceWithGPT } = require("./services");
const { votePollHandler } = require("./handlers/votePollHandler");
const AIHandler = require("./handlers/AIHandler");
const { getAdminPassword, getOwnerPassword } = require("./password");
const photoHandler = require("./handlers/photoHandler");

bot.command("start", (ctx) => startHandler(ctx));
bot.command("chat_id", async (ctx) => {
	ctx.msg.delete();
	ctx.reply(ctx.chat.id);
});

bot.callbackQuery("toMenu", async (ctx) => {
	toMainMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toAdminMenu", async (ctx) => {
	toAdminMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toOwnerMenu", async (ctx) => {
	toOwnerMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("ok", async (ctx) => {
	ctx.answerCallbackQuery();
});
bot.callbackQuery("cancel", async (ctx) => {
	try {
		ctx.msg.delete();
	} catch (error) {}
	ctx.conversation.exit();
	ctx.answerCallbackQuery();
});

bot.on(":voice", async (ctx) => {
	ctx.api.sendChatAction(ctx.chat.id, "typing");
	const reply = await answerVoiceWithGPT(ctx)
	ctx.reply(reply)
});

bot.on(":text", async (ctx) => {
	const text = ctx.msg.text;
	switch (text) {
		case getAdminPassword():
			await adminHandler(ctx);
			break;
		case getOwnerPassword():
			await ownerHandler(ctx);
			break;
		default:
			await AIHandler(ctx);
			break;
	}
});

bot.on("message", async (ctx) => {
	console.log(ctx.chat);
});
// bot.on(":photo", async (ctx) => {
// 	let text = ctx.msg.caption
// 	if (!text) {
//     text = 'смотри'
//   }
// 	photoHandler(ctx, text);
// });

bot.callbackQuery(/-/, async (ctx) => {
	// Взаимодействие с категориями
	// try {
	// 	await ctx.msg.delete();
	// } catch (error) {}

	const { itemName, action } = separate(ctx);
	switch (action) {
		case "pref":
			try {
				votePollHandler(ctx, itemName);
			} catch (error) {}
			break;

		default:
			break;
	}
	ctx.answerCallbackQuery();
});

bot.catch(() => {
	bot.start();
});
bot.start();
