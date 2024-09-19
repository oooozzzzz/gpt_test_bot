const { createUser } = require("../db");
const { startMenu } = require("../menus/startMenu");

module.exports = async (ctx) => {
	await ctx.msg.delete()
	await createUser(ctx.from.id, ctx.from.first_name);
	await ctx.reply("Добро пожаловать в презентационную версию бота с ИИ помощником. Чтобы начать диалог, просто отправьте текстовое сообщение.")
};
