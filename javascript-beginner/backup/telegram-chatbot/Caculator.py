from typing import Final

from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
)

from passkey.passkey import tokenAddress as BOT_TOKEN
# BOT_TOKEN: Final = "<BOT_TOKEN>"


async def start_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="Hello, I'm a bot! Thanks for using me!",
        reply_to_message_id=update.effective_message.id,
    )


async def add_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # write your code here
    num1 = int(context.args[0])
    num2 = int(context.args[1])
    sum_ans = num1 + num2
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"{num1} + {num2} = {sum_ans}",
        reply_to_message_id=update.effective_message.id
    )


async def multiplication_command_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
):
    num1 = int(context.args[0])
    num2 = int(context.args[1])
    mult_ans = num1 * num2
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"{num1} * {num2} = {mult_ans}",
        reply_to_message_id=update.effective_message.id
    )

async def calculate_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    expression = update.message.text.split(' ', 1)[1]
    result = eval(expression)
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"{expression} = {result}",
        reply_to_message_id=update.effective_message.id,
    )



if __name__ == "__main__":
    bot = ApplicationBuilder().token(BOT_TOKEN).build()

    # adding handlers
    bot.add_handler(CommandHandler("start", start_command_handler))
    # add all your handlers here
    bot.add_handler(CommandHandler("add", add_command_handler))
    bot.add_handler(CommandHandler('mult', multiplication_command_handler))
    bot.add_handler(CommandHandler("calc", calculate_command_handler))


    # start bot
    bot.run_polling()
