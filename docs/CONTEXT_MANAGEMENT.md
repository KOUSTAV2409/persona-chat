# Context Management

## How Chat Memory Works

The app stores conversation history in Streamlit's **session state**:

```python
st.session_state.messages = [
    {"role": "user", "content": "Explain closures"},
    {"role": "assistant", "content": "..."},
    ...
]
```

Each browser session gets its own memory. Refreshing the page clears the chat.

## What Gets Sent to the LLM

On every user message, the app builds this payload:

```
[
  {"role": "system", "content": "<persona prompt from personas/*.txt>"},
  ... last 20 messages from session_state ...
]
```

### Why a system message every time?
The persona prompt must be included in every API call. The LLM has no memory between requests — we send the full context each time.

### Why limit to 20 messages?
LLMs have a **token limit** (max text they can read). Keeping the last 20 messages (10 back-and-forth exchanges):
- Stays within budget
- Keeps recent context for follow-up questions
- Avoids API errors on long chats

```python
MAX_MESSAGES = 20
recent_messages = st.session_state.messages[-MAX_MESSAGES:]
api_messages = [{"role": "system", "content": system_prompt}] + recent_messages
```

## Persona Switching

When the user selects a different persona in the sidebar:
1. Chat history is **cleared** (`reset_chat`)
2. New persona's system prompt is loaded
3. Page reruns with fresh state

This prevents Hitesh's style from bleeding into Piyush's conversation (and vice versa).

## New Chat Button

Clears `session_state.messages` without changing the selected persona. Useful when the user wants a fresh topic with the same mentor.

## What We Don't Persist

- No database — conversations are not saved to disk
- No cross-device sync — each browser tab is independent
- On deployment (Streamlit Cloud), session ends when the user closes the tab

## Trade-offs

| Choice | Benefit | Cost |
|--------|---------|------|
| Session state only | Simple, no backend DB | No chat history after refresh |
| Last 20 messages | Coherent follow-ups | Very old context is dropped |
| Clear on persona switch | Clean persona voice | User loses history when switching |

This approach is intentionally simple — appropriate for a demo/education project and easy to explain.
