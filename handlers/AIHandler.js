const { clearGPTContext } = require("../context");
const { getDirective } = require("../directives");
const { getGPTAnswerWithContext } = require("../services");

module.exports = async (ctx) => {
	const text = ctx.msg.text;
	if (text === "!!") {
		clearGPTContext(ctx.from.id);
		return await ctx.reply("История диалога с ботом очищена")
	}

	console.log(ctx.from.first_name + " " + text);

	ctx.api.sendChatAction(ctx.from.id, "typing");

	const response = await getGPTAnswerWithContext(ctx.from.id, text, getDirective('part1'));
	console.log("АССИСТЕНТ " + response);
	ctx.reply(response);
};
