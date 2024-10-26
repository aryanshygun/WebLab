from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, filters, MessageHandler
from passkey.passkey import tokenAddress as TOKEN
import requests
from deep_translator import  GoogleTranslator

def delete_facts_job_if_exists(name: str, context: ContextTypes.DEFAULT_TYPE):
    jobs = context.job_queue.get_jobs_by_name(name)
    if not jobs:
        return False
    for job in jobs:
        job.schedule_removal()
    return True


async def facts_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    a = int(context.args[0])
    
    job_name = str(update.effective_user.id)

    context.job_queue.run_repeating(
        job_facts_handler,
        interval= a,
        chat_id=update.effective_chat.id,
        name=job_name
    )
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"you will receive a fact every {a} seconds"
        )
    
    

async def unset_facts_job_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = str(update.effective_user.id)
    users_job = context.job_queue.get_jobs_by_name(user_id)
    for i in users_job:
        i.schedule_removal()
    await update.message.reply_text('you will no more receive facts')

async def job_facts_handler(context: ContextTypes.DEFAULT_TYPE):
    data = requests.get("https://uselessfacts.jsph.pl/api/v2/facts/random").json()["text"]
    # fact = data.json()["text"]
    translator = GoogleTranslator(source='auto', target="fa")
    fact_fa = translator.translate(data)
    await context.bot.send_message(
        text=fact_fa,
        chat_id=context.job.chat_id
    )

if __name__ == "__main__":
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler("facts", facts_handler))
    application.add_handler(CommandHandler("unset", unset_facts_job_handler))

    application.run_polling()
