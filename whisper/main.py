from fastapi import FastAPI, File, UploadFile
import whisper
import tempfile
import shutil
import warnings

warnings.filterwarnings("ignore", category=UserWarning)

app = FastAPI()
model = whisper.load_model("base")

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    content = await file.read(10)
    await file.seek(0)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    result = model.transcribe(tmp_path)
    return {"text": result["text"]}

