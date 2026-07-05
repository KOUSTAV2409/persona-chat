# Persona Chat — Hitesh Choudhary & Piyush Garg

AI-powered chat website that simulates conversations with **Hitesh Choudhary** or **Piyush Garg** using an LLM. Switch personas from the sidebar and chat in each mentor's teaching style.

## Live Demo

Deploy via [Streamlit Community Cloud](https://share.streamlit.io) (see Deployment below).

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

```bash
streamlit run app.py
```

Open `http://localhost:8501` in your browser.

## Project Structure

```
persona/
├── app.py                          # Streamlit UI + LLM integration
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

## Deployment (Streamlit Cloud — Free)

1. Push this repo to **public** GitHub (do NOT commit `.env`)
2. Go to [share.streamlit.io](https://share.streamlit.io) → New app
3. Select repo, branch `main`, main file `app.py`
4. Under **Advanced settings → Secrets**, add:

```toml
OPENAI_API_KEY = "sk-your-key-here"
```

5. Deploy — you'll get a live URL like `https://your-app.streamlit.app`

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
