import os
from pathlib import Path

import streamlit as st
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

PERSONAS = {
    "Hitesh Choudhary": "personas/hitesh.txt",
    "Piyush Garg": "personas/piyush.txt",
}
MAX_MESSAGES = 20
MODEL = "gpt-4o-mini"

st.set_page_config(page_title="Persona Chat", page_icon="💬", layout="centered")

st.markdown(
    """
    <style>
    .stApp { max-width: 900px; margin: 0 auto; }
    </style>
    """,
    unsafe_allow_html=True,
)


@st.cache_data
def load_persona_prompt(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")


def get_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        st.error("Missing OPENAI_API_KEY. Add it to `.env` or Streamlit secrets.")
        st.stop()
    return OpenAI(api_key=api_key)


def init_session_state() -> None:
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "persona" not in st.session_state:
        st.session_state.persona = "Hitesh Choudhary"


def reset_chat(persona: str) -> None:
    st.session_state.messages = []
    st.session_state.persona = persona


init_session_state()

st.title("💬 Persona Chat")
st.caption("Chat with AI simulations of Hitesh Choudhary or Piyush Garg")

with st.sidebar:
    st.header("Choose Mentor")
    selected_persona = st.selectbox(
        "Persona",
        list(PERSONAS.keys()),
        index=list(PERSONAS.keys()).index(st.session_state.persona),
        label_visibility="collapsed",
    )

    if selected_persona != st.session_state.persona:
        reset_chat(selected_persona)
        st.rerun()

    if st.button("New Chat", use_container_width=True):
        reset_chat(selected_persona)
        st.rerun()

    st.divider()
    st.markdown("**About**")
    if selected_persona == "Hitesh Choudhary":
        st.write(
            "Friendly, practical educator. Hinglish tone, step-by-step explanations, "
            "motivational teaching style inspired by LearnCodeOnline / Chai aur Code."
        )
    else:
        st.write(
            "Direct, technical educator. Structured deep-dives, real-world engineering "
            "focus, founder of Teachyst — inspired by piyushgarg.dev content."
        )

    st.caption("AI simulation for learning. Not the real person.")

for msg in st.session_state.messages:
    avatar = "👨‍🏫" if msg["role"] == "assistant" else "🧑"
    with st.chat_message(msg["role"], avatar=avatar):
        st.markdown(msg["content"])

if prompt := st.chat_input(f"Ask {selected_persona} something..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar="🧑"):
        st.markdown(prompt)

    system_prompt = load_persona_prompt(PERSONAS[selected_persona])
    recent_messages = st.session_state.messages[-MAX_MESSAGES:]
    api_messages = [{"role": "system", "content": system_prompt}] + recent_messages

    with st.chat_message("assistant", avatar="👨‍🏫"):
        with st.spinner("Thinking..."):
            try:
                client = get_client()
                response = client.chat.completions.create(
                    model=MODEL,
                    messages=api_messages,
                    temperature=0.8,
                )
                reply = response.choices[0].message.content or "Sorry, I couldn't generate a reply."
            except Exception as exc:
                reply = f"Something went wrong: {exc}"
                st.error(reply)

        st.markdown(reply)

    st.session_state.messages.append({"role": "assistant", "content": reply})
