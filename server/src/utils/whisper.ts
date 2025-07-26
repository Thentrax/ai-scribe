import fs from "fs";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";
import axios from "axios";

const { AUDIO_TRANSCRIBE_API } = process.env;

export const transcribeAudio = async (audioUrl: string): Promise<string> => {
  const audioRes = await fetch(audioUrl);
  if (!audioRes.ok) {
    throw new Error(`Erro ao baixar o áudio: ${audioRes.statusText}`);
  }

  const buffer = Buffer.from(await audioRes.arrayBuffer());

  const tempFilePath = path.join(tmpdir(), `${uuidv4()}.mp3`);
  fs.writeFileSync(tempFilePath, buffer);

  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(tempFilePath), {
      filename: "audio.mp3",
      contentType: "audio/mpeg",
    });

    const whisperRes = await axios.post(`${AUDIO_TRANSCRIBE_API}transcribe`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return whisperRes.data.text;
  } catch (err: any) {
    console.error("Erro ao transcrever áudio:", err.response?.data || err.message);
    throw new Error("Erro ao transcrever áudio");
  } finally {
    fs.unlinkSync(tempFilePath);
  }
};
