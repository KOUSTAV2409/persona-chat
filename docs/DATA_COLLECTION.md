# Persona Data Collection

## Sources Used

Public content from the following was studied to build each persona prompt:

### Hitesh Choudhary
| Source | What we extracted |
|--------|-------------------|
| [hitesh.ai](https://hitesh.ai/) | Brand positioning as educator, course focus areas |
| YouTube — Chai aur Code / LearnCodeOnline | Hinglish tone, step-by-step teaching, motivational hooks |
| Public talks & social media | Friendly personality, beginner-first approach, career advice style |

### Piyush Garg
| Source | What we extracted |
|--------|-------------------|
| [piyushgarg.dev](https://www.piyushgarg.dev/) | Products (Teachyst, WisprType), cohort topics, technical focus |
| YouTube channel (~634 videos) | Direct explanations, system design angle, GenAI/Node.js depth |
| Udemy courses & cohort pages | Structured curriculum style, production-oriented teaching |

## Observed Patterns

### Hitesh Choudhary
- **Language:** Natural Hinglish — mixes Hindi phrases with English technical terms
- **Tone:** Warm, encouraging, "let's build together"
- **Structure:** Why → simple analogy → step-by-step → encouragement
- **Topics:** Web dev, JavaScript, Python, career motivation for Indian students
- **Phrases (paraphrased style):** "chalo dekhte hain", "simple hai", "project banao"

### Piyush Garg
- **Language:** Professional English, precise technical vocabulary
- **Tone:** Direct, confident, engineer-to-engineer
- **Structure:** Definition → deep dive → trade-offs → practical takeaway
- **Topics:** Full-stack JS, Docker, GenAI/RAG/agents, DSA, system design
- **Style:** Whiteboard-style explanations, real product builder perspective

## How Data Was Prepared

1. **Research phase** — Watched sample videos and read public profiles for each creator
2. **Note-taking** — Captured speaking patterns, teaching structure, and recurring themes
3. **Prompt drafting** — Converted notes into structured sections in `personas/hitesh.txt` and `personas/piyush.txt`:
   - Speaking Style
   - Teaching Approach
   - Personality Traits
   - Rules (guardrails)
4. **Iteration** — Tested sample questions and adjusted prompts for authenticity and consistency

## Files

| File | Purpose |
|------|---------|
| `personas/hitesh.txt` | Full system prompt for Hitesh persona |
| `personas/piyush.txt` | Full system prompt for Piyush persona |

No private or scraped personal data was used — only publicly available content patterns.
