import os
from pathlib import Path

from flask import Flask, Response, jsonify, request
from openai import OpenAI

app = Flask(__name__)

ROOT = Path(__file__).resolve().parent
PERSONA_FILES = {
    "Hitesh Choudhary": ROOT / "personas" / "hitesh.txt",
    "Piyush Garg": ROOT / "personas" / "piyush.txt",
}
MAX_MESSAGES = 20
MODEL = "gpt-4o-mini"


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def load_index_html() -> str:
    for candidate in (ROOT / "index.html", ROOT / "public" / "index.html"):
        if candidate.exists():
            return _read(candidate)
    return "<h1>Persona Chat</h1><p>Frontend file missing.</p>"


def load_persona(name: str) -> str:
    path = PERSONA_FILES.get(name)
    if path and path.exists():
        return _read(path)
    raise ValueError(f"Unknown persona: {name}")


INDEX_HTML = load_index_html()


@app.route("/")
def index():
    return Response(INDEX_HTML, mimetype="text/html")


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        body = request.get_json(force=True)
        persona = body.get("persona", "Hitesh Choudhary")
        messages = body.get("messages", [])

        if persona not in PERSONA_FILES:
            return jsonify({"error": f"Invalid persona. Use: {list(PERSONA_FILES.keys())}"}), 400
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
