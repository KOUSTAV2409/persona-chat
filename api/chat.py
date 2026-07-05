import json
import os
from pathlib import Path

from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI

app = Flask(__name__)

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
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


@app.route("/")
def index():
    return send_from_directory(PUBLIC, "index.html")


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        body = request.get_json(force=True)
        persona = body.get("persona", "Hitesh Choudhary")
        messages = body.get("messages", [])

        if persona not in PERSONAS:
            return jsonify({"error": f"Invalid persona. Use: {list(PERSONAS.keys())}"}), 400
        if not messages:
            return jsonify({"error": "messages required"}), 400

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return jsonify({"error": "OPENAI_API_KEY not configured on server"}), 500

        system_prompt = load_persona(persona)
        recent = messages[-MAX_MESSAGES:]
        api_messages = [{"role": "system", "content": system_prompt}] + recent

        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model=MODEL,
            messages=api_messages,
            temperature=0.8,
        )
        reply = response.choices[0].message.content or "Sorry, I couldn't generate a reply."
        return jsonify({"reply": reply})

    except Exception as exc:
        return jsonify({"error": str(exc)}), 500
