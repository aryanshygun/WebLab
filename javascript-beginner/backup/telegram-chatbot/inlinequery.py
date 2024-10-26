from uuid import uuid4

import requests
from telegram import Update, InlineQueryResultPhoto
from telegram.ext import (
    Application,
    ContextTypes,
    InlineQueryHandler,
)
from passkey.passkey import tokenAddress as TOKEN

async def inline_query(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.inline_query.query
    data = requests.get("https://thronesapi.com/api/v2/Characters")
    data = data.json()
    characters = {}
    for character in data:
        characters[character["fullName"]] = character["imageUrl"]
    if not query:
        results = []

        for name, url in characters.items():
            newItem = InlineQueryResultPhoto(
                id=str(uuid4()), photo_url=url, thumbnail_url=url, caption=name
            )
            results.append(newItem)
    else:
        query = query.lower()
        results = []
        for name, url in characters.items():
            if query in name.lower():
                newItem = InlineQueryResultPhoto(
                    id=str(uuid4()), photo_url=url, thumbnail_url=url, caption=name
                )
                results.append(newItem)
    await update.inline_query.answer(results, auto_pagination=True)


if __name__ == "__main__":
    application = Application.builder().token(TOKEN).build()
    application.add_handler(InlineQueryHandler(inline_query))
    application.run_polling()
