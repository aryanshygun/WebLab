from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters
from passkey.passkey import tokenAddress

async def mirror(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # text = update.message.text
    # def krazy(text):
    #     temp_list = []
    #     for i in range(len(text)):
    #         if i % 2:
    #             temp_list.append(text[i])
    #         else:
    #             temp_list.append(text[i].upper())
    #     temp_list.append('!')
    #     return ''.join(temp_list)

    # await context.bot.send_message(
    #     chat_id=update.effective_chat.id,
    #     text=krazy(text)
    # )

    await update.effective_chat.send_message(update.message.text)

# async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     await context.bot.send_message(
#         chat_id=update.effective_chat.id,
#         text="Hi, turdface 🤡!"
#     )

if __name__ == '__main__':
    application = ApplicationBuilder().token(tokenAddress).build()
    # application.add_handler(CommandHandler('start', start))
    application.add_handler(MessageHandler(filters.TEXT, mirror))
    application.run_polling()
#