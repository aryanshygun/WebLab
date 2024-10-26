from copyreg import constructor
from dataclasses import dataclass
from datetime import datetime
# from lib2to3.fixer_util import Comma
from typing import Final
from passkey.passkey import tokenAddress
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

BOT_TOKEN: Final = tokenAddress

HELP_COMMAND_RESPONSE = """
Greetings! Here are the commands you can use with this bot:

/start -> Begin interacting with the bot
/repeat <text> -> Have the bot repeat the provided text
/time -> Receive the current time from the bot
/help -> Display this message again
Feel free to utilize any of these commands as needed. If you require further assistance, don't hesitate to ask. Farewell for now!
"""

async def start_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="Hello, I'm a bot! Thanks for using me!",
        reply_to_message_id=update.effective_message.id
    )

async def repeat_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text[8::]
    if not text:
        return

    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=text,
        reply_to_message_id=update.effective_message.id
    )

async def time_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        reply_to_message_id=update.effective_message.id
    )

async def help_command_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=HELP_COMMAND_RESPONSE,
        reply_to_message_id=update.effective_message.id
    )

if __name__ == "__main__":
    bot = ApplicationBuilder().token(BOT_TOKEN).build()

    # adding handlers
    # add all your handlers here
    bot.add_handler(CommandHandler('start', start_command_handler))
    bot.add_handler(CommandHandler('repeat', repeat_command_handler))
    bot.add_handler(CommandHandler('time', time_command_handler))
    bot.add_handler(CommandHandler('help', help_command_handler))

    # start bot
    bot.run_polling()
