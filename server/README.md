# AI Scribe - Server

This is the backend service for the AI Scribe project. It handles audio transcription using Whisper, generates OASIS Section G notes using an AI model (Ollama), and manages storage via PostgreSQL.

## Features

- Upload audio files and transcribe them
- Generate structured OASIS Section G responses from transcripts
- Store and retrieve patient notes and transcripts
- Integrated with AWS S3 and Ollama (local LLM)

## Project Structure

```
server/
├── src/
│ ├── controllers/
│ ├── lib/
│ ├── middleware/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.ts
├── prisma/
│ └── schema.prisma
```

## Setup

1. **Install dependencies**

```bash
npm install
```
Run locally
bash
```
npm run dev
```

Start database
bash
```
docker-compose up --build
```

Seed database
bash
```
npm run seed
```
Environment variables

Create a .env file with:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
S3_BUCKET_NAME=...
```


Available Endpoints:
GET /patients - Get all patients
GET /notes/:patientId – Get all notes for a given patient
POST /notes – Upload and transcribe audio, generate and save Section G

Make sure the Whisper API and Ollama (mistral) are running locally before using this service.

to run mistral just make shure you have Ollama installed then run:

```
ollama run mistral
```