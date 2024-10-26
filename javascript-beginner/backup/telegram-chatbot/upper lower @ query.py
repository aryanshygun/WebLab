from telegram import InlineQueryResultArticle, InputTextMessageContent, Update
from telegram.ext import ApplicationBuilder, ContextTypes, InlineQueryHandler
from passkey.passkey import tokenAddress as token

async def inlineHandle(update:Update, context:ContextTypes.DEFAULT_TYPE):
    inline_request = update.inline_query
    if not inlineHandle:
        return
    
    query = inline_request.query
    if not query:
        return

    responses = [
        InlineQueryResultArticle(id='1', title='UpperCase', input_message_content=InputTextMessageContent(query.upper())),
        InlineQueryResultArticle(id='2', title='LowerCase', input_message_content=InputTextMessageContent(query.lower()))
    ]
    
    await inline_request.answer(responses)

if __name__ == '__main__':
    application = ApplicationBuilder().token(token).build()
    application.add_handler(InlineQueryHandler(inlineHandle))
    application.run_polling()