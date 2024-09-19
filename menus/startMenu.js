const { Menu } = require("@grammyjs/menu");
const { myDiscountsMenu } = require("./myDiscountsMenu");
const { createWordDocument, isChatMember } = require("../services");

const startMenu = new Menu("startMenu", { autoAnswer: false })
	.text("Train", async (ctx) => {
		ctx.menu.nav("trainMenu");
		// if (await isChatMember(-1002430837732, ctx.from.id, ctx)) {
		// await ctx.msg.delete();
		// await ctx.conversation.enter("gptCorrection");
		// } else {
		// 	await ctx.api.answerCallbackQuery(ctx.update.callback_query.id, {
		// 		text: "У вас нет доступа",
		// 		show_alert: true,
		// 	});
		// }
	})
	.row()
	.text("Vocabularly", async (ctx) => {
		// if (await isChatMember(-1002430837732, ctx.from.id, ctx)) {
		await ctx.msg.delete();
		await ctx.conversation.enter("vocabBooster");
		// } else {
		// 	await ctx.api.answerCallbackQuery(ctx.update.callback_query.id, {
		// 		text: "У вас нет доступа",
		// 		show_alert: true,
		// 	});
		// }
	})
	.row()
	.text("Upgrade", async (ctx) => {
		// if (await isChatMember(-1002430837732, ctx.from.id, ctx)) {
		await ctx.msg.delete();
		await ctx.conversation.enter("essayUpgrade");
		// } else {
		// 	await ctx.api.answerCallbackQuery(ctx.update.callback_query.id, {
		// 		text: "У вас нет доступа",
		// 		show_alert: true,
		// 	});
		// }
	});

const finishConversationMenu = new Menu("finishConversationMenu").back(
	"Продолжить работу с ботом"
);

const backToMenu = new Menu("finishConversationMenu").text(
	"Назад в меню",
	async (ctx) => {
		ctx.menu.nav("startMenu");
		await ctx.msg.editText(ctx.t("start"));
	}
);

const trainMenu = new Menu("trainMenu")
	.text("Random Themes", async (ctx) => {
		ctx.menu.nav("randomThemes");
	})
	.row()
	.text("Your Theme", async (ctx) => {
		ctx.menu.nav("yourTheme");
	})
	.row()
	.back("Back");

const randomThemes = new Menu("randomThemes")
	.text("Part 1", async (ctx) => {
		
	})
	.row()
	.text("Part 2", async (ctx) => {})
	.row()
	.text("Part 3", async (ctx) => {})
	.row()
	.text("Назад", async (ctx) =>{
		ctx.menu.nav("trainMenu")
	})

const yourTheme = new Menu("yourTheme")
	.text("Part 1", async (ctx) => {})
	.row()
	.text("Part 2", async (ctx) => {})
	.row()
	.text("Part 3", async (ctx) => {})
	.row()
	.text("Назад", async (ctx) =>{
		ctx.menu.nav("trainMenu")
	})

startMenu.register([finishConversationMenu, backToMenu, trainMenu, yourTheme, randomThemes]);

module.exports = { startMenu, finishConversationMenu };
