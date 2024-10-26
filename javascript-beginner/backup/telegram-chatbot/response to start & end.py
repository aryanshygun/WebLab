from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
from passkey.passkey import tokenAddress

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="Hi!"
    )

async def end(update, context):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="Goodbye!"
    )

if __name__ == '__main__':
    application = ApplicationBuilder().token(tokenAddress).build()

    start_handler = CommandHandler('start', start)
    end_handler = CommandHandler('end', end)

    application.add_handler(start_handler)
    application.add_handler(end_handler)

    application.run_polling()
