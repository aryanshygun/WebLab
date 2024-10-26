import requests
import json
from passkey.passkey import tokenAddress

token = tokenAddress

response = requests.post(url=f"https://api.telegram.org/bot{token}/sendMessage", data={"chat_id": 67927592, "text": "pjong"}).json()


# Pretty-print the JSON response
# formatted_response = json.dumps(response, indent=4)
# print(formatted_response)
print(response)