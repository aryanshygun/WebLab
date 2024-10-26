from typing import Final

from telegram import (
    Update,
    ReplyKeyboardRemove,
)
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    ConversationHandler,
    filters,
    MessageHandler,
)

# BOT_TOKEN: Final = "<BOT_TOKEN>"
from passkey.passkey import tokenAddress as BOT_TOKEN


GENDER, PHOTO, BIO = range(3)


async def start_command_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    # write your code here
    pass


async def gender_message_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    # write your code here
    pass


async def photo_message_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    # write your code here
    pass


async def skip_photo_command_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    # write your code here
    pass


async def bio_message_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    # write your code here
    pass


async def cancel_command_handler(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    # write your code here
    pass


if __name__ == "__main__":
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(
        ConversationHandler(
            entry_points=[CommandHandler("start", start_command_handler)],
            states={
                GENDER: [
                    MessageHandler(
                        filters.TEXT & ~filters.COMMAND, gender_message_handler
                    )
                ],
                PHOTO: [
                    MessageHandler(filters.PHOTO, photo_message_handler),
                    CommandHandler("skip", skip_photo_command_handler),
                ],
                BIO: [
                    MessageHandler(filters.TEXT & ~filters.COMMAND, bio_message_handler)
                ],
            },
            fallbacks=[
                CommandHandler("cancel", cancel_command_handler),
            ],
            allow_reentry=True,
        )
    )
    app.run_polling()
