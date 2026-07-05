import json
import os
from pathlib import Path

from openai import OpenAI

ROOT = Path(__file__).resolve().parent.parent
PERSONAS = {
    "Hitesh Choudhary": ROOT / "personas" / "hitesh.txt",
    "Piyush Garg": ROOT / "personas" / "piyush.txt",
}
MAX_MESSAGES = 20
MODEL = "gpt-4o-mini"


def load_persona(name: str) -> str:
    path = PERSONAS.get(name)
    if not path or not path.exists():
        raise ValueError(f"Unknown persona: {name}")
    return path.read_text(encoding="utf-8")


def generate_reply(persona: str, messages: list[dict]) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY not configured")

    system_prompt = load_persona(persona)
    recent = messages[-MAX_MESSAGES:]
    api_messages = [{"role": "system", "content": system_prompt}] + recent

    client = OpenAI(api_key=api_key)
    response = client.chat.completions.create(
        model=MODEL,
        messages=api_messages,
        temperature=0.8,
    )
    return response.choices[0].message.content or "Sorry, I couldn't generate a reply."


def handle_chat_request(body: dict) -> dict:
    persona = body.get("persona", "Hitesh Choudhary")
    messages = body.get("messages", [])

    if persona not in PERSONAS:
        return {"error": f"Invalid persona. Use: {list(PERSONAS.keys())}"}
    if not messages:
        return {"error": "messages required"}

    try:
        reply = generate_reply(persona, messages)
        return {"reply": reply}
    except Exception as exc:
        return {"error": str(exc)}
