# AI Scribe - Auxiliar service (Whisper API)

This is a small one endpoint API, just for transcribe the text. Using the 'base' model from Python Whisper open source lib.

## Setup

This project requires:

- Python 3.10+

- FFmpeg installed and available in your system's PATH

Whisper uses FFmpeg internally to process and convert audio files into a compatible format for transcription.

1- Install **ffmpeg**.

If you don’t have FFmpeg installed, you can install it with:

On macOS:

```
/bash
brew install ffmpeg
```
On Ubuntu/Debian:

```
/bash
sudo apt update
sudo apt install ffmpeg
```

On Windows (using winget):

```
/bash
winget install ffmpeg
```
After installation, you can verify it's working with:
```
/bash
ffmpeg -version
```
2- Then install the **requeriments.txt** (recomended to use virtualend).


(Optional) Install virtualenv.
```
python -m venv venv
```

On macOs or Linux: 

```
source venv/bin/activate
```

On Windows: 
```
.\venv\Scripts\activate
```

Then just run:


```
pip install -r requirements.txt
```

3 - To start:

```
uvicorn main:app --host 0.0.0.0 --port 8000
```