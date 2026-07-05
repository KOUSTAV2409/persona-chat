import sys
from pathlib import Path

from flask import Flask, jsonify, request

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.chat_logic import handle_chat_request

app = Flask(__name__)


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return ("", 204)
    body = request.get_json(force=True, silent=True) or {}
    result = handle_chat_request(body)
    if "reply" in result:
        return jsonify(result)
    status = 500 if result.get("error", "").startswith("OPENAI") else 400
    return jsonify(result), status


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5328, debug=True)
