import logging
import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, filters, MessageHandler
from passkey.passkey import tokenAddress as TOKEN
from deep_translator import  GoogleTranslator

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logging.getLogger("httpx").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)

async def start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"Hi {update.effective_user.first_name}!"
    )

def delete_facts_job_if_exists(name: str, context: ContextTypes.DEFAULT_TYPE):
    jobs = context.job_queue.get_jobs_by_name(name)
    if not jobs:
        return False
    for job in jobs:
        job.schedule_removal()
    return True

# async def facts_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     try:
#         a = int(context.args[0])
#         if a < 5:
#             await context.bot.send_message(
#                 chat_id=update.effective_chat.id,
#                 text="please enter a number greater than 5"
#             )
#             return
#         job_name = str(update.effective_user.id)
#         job_exists = delete_facts_job_if_exists(job_name, context)
#         if job_exists:
#             context.job_queue.run_repeating(
#                 job_facts_handler,
#                 interval=a,
#                 chat_id=update.effective_chat.id,
#                 name=job_name
#             )
#             await context.bot.send_message(
#                 chat_id=update.effective_chat.id,
#                 text="your previous job were delete and you will receive a fact every {} seconds".format(a)
#                 )
#         else:
#             context.job_queue.run_repeating(
#                 job_facts_handler,
#                 interval=a,
#                 chat_id=update.effective_chat.id,
#                 name=job_name
#             )
#             await context.bot.send_message(
#                 chat_id=update.effective_chat.id,
#                 text="you will receive a fact every {} seconds".format(a)
#                 )
#     except (IndexError, ValueError):
#         await context.bot.send_message(
#             chat_id=update.effective_chat.id,
#             text="please enter a number greater than 10 not anything else"
#             )

async def facts_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    a = int(context.args[0])
    if a < 5:
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text="please enter a number greater than 5"
        )
        return
    job_name = str(update.effective_user.id)
    job_exists = delete_facts_job_if_exists(job_name, context)
    if job_exists:
        context.job_queue.run_repeating(
            job_facts_handler,
            interval=a,
            chat_id=update.effective_chat.id,
            name=job_name
        )
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text="your previous job were delete and you will receive a fact every {} seconds".format(a)
            )
    else:
        context.job_queue.run_repeating(
            job_facts_handler,
            interval=a,
            chat_id=update.effective_chat.id,
            name=job_name
        )
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text="you will receive a fact every {} seconds".format(a)
            )


async def unset_facts_job_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    jobs = context.job_queue.get_jobs_by_name(str(update.effective_user.id))
    for job in jobs:
        job.schedule_removal()
    await context.bot.send_message(chat_id=update.effective_chat.id, text="you will no more receive facts")

async def job_facts_handler(context: ContextTypes.DEFAULT_TYPE):
    job = context.job
    data = requests.get("https://uselessfacts.jsph.pl/api/v2/facts/random")
    fact = data.json()["text"]
    translator = GoogleTranslator(source="auto", target="fa")
    fact_fa = translator.translate(fact)
    await context.bot.send_message(
        chat_id=job.chat_id,
        text=fact_fa
    )

if __name__ == "__main__":
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start_handler))

    application.add_handler(CommandHandler("facts", facts_handler))

    application.add_handler(CommandHandler("unset", unset_facts_job_handler))

    application.run_polling()
