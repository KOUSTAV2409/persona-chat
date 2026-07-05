# Persona Chat — Hitesh Choudhary & Piyush Garg

AI-powered chat website that simulates conversations with **Hitesh Choudhary** or **Piyush Garg** using an LLM. Switch personas from the sidebar and chat in each mentor's teaching style.

## Live Demo

**GitHub:** https://github.com/KOUSTAV2409/persona-chat

Deploy live in ~2 min via [Streamlit Community Cloud](https://share.streamlit.io) — see [Deployment](#deployment-streamlit-cloud--free) below.

## Features

- LLM-powered chat (OpenAI `gpt-4o-mini`)
- Switch between Hitesh Choudhary and Piyush Garg personas
- Persona-specific system prompts loaded from `personas/`
- Context management — keeps last 20 messages for coherent long chats
- New chat button when switching mentors

## Quick Start (Local)

### 1. Clone & setup

```bash
git clone <your-repo-url>
cd persona
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Add API key

Copy `.env.example` to `.env` and add your OpenAI key:

```bash
cp .env.example .env
# Edit .env → OPENAI_API_KEY=sk-...
```

Get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### 3. Run

**Web UI (Vercel / production-style):** deploy to Vercel — see [Deployment](#deployment-vercel).

**Local Streamlit UI (optional):**

```bash
pip install streamlit
streamlit run streamlit_app.py
```

## Project Structure

```
persona/
├── streamlit_app.py                # Optional local Streamlit UI
├── api/chat.py                     # Vercel serverless API
├── public/index.html               # Vercel frontend
├── personas/
│   ├── hitesh.txt                  # Hitesh system prompt
│   └── piyush.txt                  # Piyush system prompt
├── docs/
│   ├── DATA_COLLECTION.md
│   ├── PROMPT_ENGINEERING.md
│   ├── CONTEXT_MANAGEMENT.md
│   └── SAMPLE_CONVERSATIONS.md
├── requirements.txt
├── .env.example
└── README.md
```

## Deployment (Vercel)

1. Push repo to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → Import `KOUSTAV2409/persona-chat`
3. Add environment variable: `OPENAI_API_KEY` = your key
4. Deploy — live URL will be like `https://persona-chat-xxx.vercel.app`

## Deployment (Streamlit Cloud — optional local-style UI)

1. Push this repo to **public** GitHub (do NOT commit `.env`)
2. Go to [share.streamlit.io](https://share.streamlit.io) → New app
3. Main file: `streamlit_app.py`
4. Secrets: `OPENAI_API_KEY = "sk-..."`

## Documentation

| Doc | Description |
|-----|-------------|
| [DATA_COLLECTION.md](docs/DATA_COLLECTION.md) | How persona data was researched |
| [PROMPT_ENGINEERING.md](docs/PROMPT_ENGINEERING.md) | System prompt design strategy |
| [CONTEXT_MANAGEMENT.md](docs/CONTEXT_MANAGEMENT.md) | How chat history is managed |
| [SAMPLE_CONVERSATIONS.md](docs/SAMPLE_CONVERSATIONS.md) | Example chats for both personas |

## Tech Stack

- **Python 3.10+**
- **Streamlit** — web UI (no separate frontend/backend)
- **OpenAI API** — LLM responses
- **python-dotenv** — local env vars

## Disclaimer

This is an AI simulation for educational purposes. It is not affiliated with or endorsed by Hitesh Choudhary or Piyush Garg.
