There are coding agents like Windows Copilot, GitHub Copilot, Google AI Studio and Claude AI, and OpenAI Codex etc. What are the common ways or formats to give prompts?

Claude.ai:

Great question! Here's a rundown of the common prompting formats and styles used across coding agents:

---

## 1. **Natural Language Instructions**
The most universal format — just describe what you want in plain English.

> *"Write a Python function that takes a list of integers and returns only the even ones."*

---

## 2. **Inline / Comment-Triggered Prompts**
Used heavily in editor-integrated tools (GitHub Copilot, Cursor, etc.). You write a comment and the agent completes the code below it.

```python
# Function to validate an email address using regex
```

---

## 3. **Chat / Conversational Turns**
Multi-turn dialogue where you refine iteratively. Common in Claude, ChatGPT, Gemini, and AI Studio.

> **You:** Write a REST API in Express.js for a todo app.
> **Agent:** *[generates code]*
> **You:** Now add JWT authentication to it.

---

## 4. **Fill-in-the-Middle (FIM)**
The model fills a gap between existing code. Common in Copilot and Codex under the hood.

```python
def calculate_tax(income):
    # <FILL HERE>
    return tax
```

---

## 5. **Instruction + Context (System/User Prompt Structure)**
Used in API-level interactions (OpenAI, Anthropic, Gemini APIs). You provide a **system prompt** setting the role/behavior and a **user prompt** with the task.

```
System: You are a senior Python developer. Write clean, well-documented code.
User: Create a class for managing a SQLite database connection.
```

---

## 6. **Code + Instruction (Edit Mode)**
You paste existing code and ask for changes. Supported in most tools.

> *"Here's my function — refactor it to use async/await:"*
> ```js
> function fetchData(url) { ... }
> ```

---

## 7. **Slash Commands / Shortcuts**
Tools like GitHub Copilot Chat and Cursor support structured commands:

- `/explain` — explain selected code
- `/fix` — fix a bug
- `/tests` — generate unit tests
- `/doc` — generate documentation

---

## 8. **File/Codebase Context with Instructions**
Agents like Claude Code, Copilot Workspace, and Cursor can take **entire files or repos** as context:

> *"Given these files, find where the memory leak could be occurring."*

---

## Tips for Better Prompts Across All Tools

- **Be specific** about language, framework, and constraints
- **Provide context** — paste relevant existing code
- **Specify output format** — "return only the function, no explanation"
- **Iterate** — follow up to refine rather than writing one giant prompt
- **State edge cases** — "make sure it handles null inputs"

The more context and precision you provide, the better results you get across all these tools.

---
---
How about giving prompts as natural language with User Story, Work order, Functional Requirements and Technical Requirements together?

Claude.ai:

Great approach! Combining these structured formats into a single prompt gives coding agents much richer context, leading to significantly better output. Here's how it works and how to structure it:

---

## The "Structured Natural Language" Prompt Pattern

This format mirrors how real software teams work — and coding agents respond very well to it because it eliminates ambiguity at multiple levels.

---

### Full Template

```
## User Story
As a [type of user], I want to [goal], so that [benefit/reason].

## Work Order
Build / Modify / Fix [component or feature] in [system/codebase].
Priority: [High/Medium/Low]
Deadline context: [optional]

## Functional Requirements
- FR1: [What the system must do]
- FR2: [What the system must do]
- FR3: Edge cases, validation rules, error handling

## Technical Requirements
- TR1: Language/Framework — e.g., Python 3.11, FastAPI
- TR2: Database — e.g., PostgreSQL via SQLAlchemy ORM
- TR3: Auth — e.g., JWT with refresh tokens
- TR4: Must follow [pattern] — e.g., Repository pattern, REST conventions
- TR5: Test coverage — e.g., unit tests with pytest
```

---

### Concrete Example

```
## User Story
As a registered customer, I want to reset my password via email,
so that I can regain access to my account if I forget my credentials.

## Work Order
Build the password reset flow for the existing user authentication module
in a FastAPI backend. This is a new feature; no existing code to modify.

## Functional Requirements
- FR1: User submits their email address to request a reset link
- FR2: System sends a time-limited reset token via email (expires in 30 min)
- FR3: User clicks the link and submits a new password
- FR4: System validates the token, checks expiry, and updates the password
- FR5: Token is invalidated after single use
- FR6: Return clear error messages for expired or invalid tokens

## Technical Requirements
- TR1: FastAPI with Python 3.11
- TR2: PostgreSQL database, SQLAlchemy ORM, Alembic for migrations
- TR3: Tokens generated with secrets.token_urlsafe, stored as hashed values
- TR4: Email sending via SendGrid SDK
- TR5: Follow existing Repository pattern in the codebase
- TR6: Unit tests for all endpoints using pytest and httpx
- TR7: No raw SQL — use ORM only
```

---

## Why This Works So Well

**User Story** gives the agent *intent and empathy* — it understands *who* this is for and *why*, which helps it make sensible design decisions without you specifying every detail.

**Work Order** scopes the task — it tells the agent whether to build from scratch, refactor, or fix, and where in the system this lives.

**Functional Requirements** define *behavior* — the agent uses these as implicit acceptance criteria, making the output much less likely to miss edge cases.

**Technical Requirements** constrain the *implementation* — preventing the agent from making arbitrary technology choices that conflict with your stack.

---

## Pro Tips for This Format

- **Layer your prompts** — start with this full structure, then follow up with targeted refinements like *"now add logging to FR4"*
- **Reference existing code** — add a section like `## Existing Code` and paste relevant snippets so the agent stays consistent with your patterns
- **Add a `## Out of Scope` section** — explicitly tell the agent what *not* to build, which is just as valuable as telling it what to build
- **Include a `## Acceptance Criteria` section** — list specific, testable conditions, and some agents (especially in agentic/autonomous modes) will self-check against them

---

This format is essentially a **lightweight spec document as a prompt**, and it's one of the most effective ways to use coding agents for non-trivial features.