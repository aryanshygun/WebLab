from passkey.passkey import  tokenAddress
import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, Application, ContextTypes, CommandHandler

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logging.getLogger("httpx").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    # Method 1 : using context
    # await context.bot.send_message(
    #     chat_id=update.effective_chat.id,
    #     text=f"Hi {update.effective_user.first_name}!"
    # )

    # method 2 : using update
    await update.effective_chat.send_message(f"Hi {update.effective_user.first_name}!")

    #method 3 : using message reply from update
    # await update.message.reply_text(f"Hi {update.effective_user.first_name}!")

if __name__ == '__main__':
    application = ApplicationBuilder().token(tokenAddress).build()

    application.add_handler(CommandHandler('start', start))
    application.run_polling()

