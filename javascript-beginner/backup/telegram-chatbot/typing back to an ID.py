import requests
import json
from passkey.passkey import tokenAddress as token

# Here we are taking the list of messages we are getting, taking the first senders ID, and saying pong to them

api_address = f"https://api.telegram.org/bot{token}"

response = requests.get(f"{api_address}/getUpdates").json() 
# formatted_response = json.dumps(response, indent=4)
# print(formatted_response)

user_id = response['result'][0]['message']['from']['id']

answer_user = requests.post(url=f"https://api.telegram.org/bot{token}/sendMessage", data={"chat_id": user_id, "text": "pong"})