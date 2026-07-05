# Persona Chat

AI-powered chat with **Hitesh Choudhary** and **Piyush Garg** persona simulations.

- **Frontend:** Next.js 15 + shadcn/ui + Tailwind
- **Backend:** Python serverless API (`api/chat.py`) on Vercel
- **LLM:** OpenAI `gpt-4o-mini`

## Live

- GitHub: https://github.com/KOUSTAV2409/persona-chat
- Deploy on Vercel (connect repo + add `OPENAI_API_KEY`)

## Run locally

### 1. Install dependencies

```bash
# Frontend
npm install

# Python backend (one-time)
python3 -m venv venv
source venv/bin/activate
pip install openai flask
```

### 2. Environment

```bash
cp .env.example .env
# Add OPENAI_API_KEY=sk-...
```

### 3. Start both servers (two terminals)

```bash
# Terminal 1 — Python API on :5328
source venv/bin/activate
python backend/dev_server.py

# Terminal 2 — Next.js on :3000
npm run dev
```

Open http://localhost:3000

## Project structure

```
persona-chat/
├── app/                    # Next.js pages
├── components/             # UI (shadcn-style)
├── api/chat.py             # Vercel Python serverless (production)
├── backend/
│   ├── chat_logic.py       # Shared OpenAI + persona logic
│   └── dev_server.py       # Local Flask server
├── personas/               # System prompts
└── docs/                   # Documentation
```

## Deploy (Vercel)

1. Import GitHub repo on [vercel.com](https://vercel.com)
2. Framework: **Next.js** (auto-detected)
3. Add env var: `OPENAI_API_KEY`
4. Deploy — Next.js serves UI, Python handles `/api/chat`

## Documentation

| File | Description |
|------|-------------|
| [DATA_COLLECTION.md](docs/DATA_COLLECTION.md) | Persona research |
| [PROMPT_ENGINEERING.md](docs/PROMPT_ENGINEERING.md) | Prompt strategy |
| [CONTEXT_MANAGEMENT.md](docs/CONTEXT_MANAGEMENT.md) | Chat memory |
| [SAMPLE_CONVERSATIONS.md](docs/SAMPLE_CONVERSATIONS.md) | Examples |

## Disclaimer

AI simulation for education. Not affiliated with Hitesh Choudhary or Piyush Garg.
