import os
import yt_dlp

OUTPUT_DIR = "downloads"
os.makedirs(OUTPUT_DIR, exist_ok=True)

url = input("Enter Instagram Post/Reel URL: ").strip()

if not url.startswith("http"):
    print("❌ Invalid URL. Please enter a valid Instagram link.")
    exit()

ydl_opts = {
    'outtmpl': f'{OUTPUT_DIR}/%(title)s.%(ext)s',
    'format': 'best',
    'cookiesfrombrowser': ('chrome',),  # ✅ Correct way
}

try:
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    print(f"✅ Download complete! Check '{OUTPUT_DIR}' folder.")
except Exception as e:
    print(f"❌ Error: {e}")
