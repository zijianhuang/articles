There are coding agents like Windows Copilot, GitHub Copilot, Google AI Studio and Claude AI, and OpenAI Codex etc. What are the common way or format to give prompts?
----
----
Great question! Although each coding assistant has its own UI and features (Windows Copilot, GitHub Copilot, Google AI Studio, Claude, OpenAI models, etc.), the **best-performing prompts share a common structure and style**.

Below is a practical, tool-agnostic guide you can copy/paste and adapt. I’ll show the **common format**, explain **why it works**, and give **ready-to-use templates** for popular coding tasks.

***

## The Common Prompt Format (works across agents)

> **Instruction + Context + Constraints + Examples + I/O Schema + Output Format**

1.  **Instruction (Goal)**
    *   Be direct: what do you want (generate, refactor, explain, test, debug)?
2.  **Context (Scope)**
    *   Include language, framework, files, function signatures, environment, and any relevant code snippets.
3.  **Constraints**
    *   Style guides, performance/memory limits, security requirements, library versions, time/space complexity, etc.
4.  **Examples (Few-shot)**
    *   Good/bad examples, target patterns, sample inputs/outputs.
5.  **I/O Schema**
    *   Define function signatures, JSON schemas, or CLI usage precisely.
6.  **Output Format**
    *   Ask for **single code block**, **diff patch**, **unit test file**, **steps**, or **bullet summary**.

> **Tip:** Use **delimiters** (triple backticks, `<sections>`), and ask for **only what you need** (e.g., “Return only a unified diff”).

***

## Swiss‑Army Prompt Template

````text
Task:
- [What you want the model to do in one sentence.]

Context:
- Language: [e.g., Python 3.11]
- Runtime/OS: [e.g., Linux, Node 20]
- Dependencies: [e.g., numpy 2.x, fastapi 0.110]
- Codebase/Files: [list relevant filenames and brief role]
- Current code:
```lang
[Paste only the relevant functions/snippets]
````

Requirements/Constraints:

*   Correctness: \[e.g., must pass given unit tests]
*   Performance: \[e.g., O(n log n), under 200ms for 10^5 items]
*   Style: \[e.g., PEP8, docstrings w/ Args/Returns]
*   Security: \[e.g., sanitize input, no eval]
*   Compatibility: \[e.g., Python 3.9+, Windows/Linux]
*   Edge cases: \[list key edge cases]

I/O Contract:

*   Function signature or API shape:

```lang
def foo(bar: list[int]) -> dict[str, int]:
    ...
```

*   Input validation rules:
*   Error handling behavior:

Examples:

*   Input → Output pairs:
    *   \[example 1]
    *   \[example 2]

Deliverable:

*   Output format: \[e.g., “return only the full, runnable code in one code block”]
*   No extra commentary.

````

---

## Common Patterns by Task

### 1) **Generate a Function / Module**
```text
Write a pure Python function to compute rolling median with window k.

Context:
- Python 3.11. No 3rd-party packages.
- Must handle up to 10^6 items.

Requirements:
- Time complexity close to O(n log k).
- Stable for even window size (average of the two middle values).
- Include docstring and type hints.
- Add simple doctests.

I/O:
```python
from collections.abc import Iterable

def rolling_median(nums: Iterable[float], k: int) -> list[float]:
    ...
````

Deliverable:

*   Return only the complete function in one \`\`\`python block, with doctests.

````

---

### 2) **Refactor with Constraints**
```text
Refactor the function below to eliminate quadratic behavior on large inputs.
Maintain exact behavior and public API.

Constraints:
- Keep Python 3.10 compatibility.
- No external packages.
- Add a brief comment explaining the new algorithm.

Code:
```python
def dedupe_stable(items):
    out = []
    for i, x in enumerate(items):
        if x not in out:  # O(n)
            out.append(x)
    return out
````

Deliverable:

*   Provide only the refactored function in a \`\`\`python block.

````

---

### 3) **Bug Reproduction + Fix**
```text
Task: Find and fix the bug causing incorrect UTF-8 decoding in the log parser.

Context:
- Node.js 20, TypeScript.
- Logs may contain invalid byte sequences.

Code (snippet):
```ts
export function parseLog(buf: Buffer): string {
  return buf.toString('utf8'); // suspected issue
}
````

Requirements:

*   Don’t throw. Replace invalid sequences with U+FFFD.
*   Add unit tests (Vitest).
*   Keep API the same.

Deliverable:

*   A unified diff (git patch) only, touching .ts and .test.ts files.

````

---

### 4) **Test-First (TDD)**
```text
Write unit tests (pytest) for the following function before we implement it.

Requirements:
- Cover typical, boundary, and error cases.
- Use parameterized tests where appropriate.
- No external IO.

Function contract:
```python
def parse_iso8601(dt: str) -> datetime:
    """Parses date-time strings with timezone offsets."""
````

Deliverable:

*   Only the test file content in \`\`\`python, named test\_parse\_iso8601.py.

````

---

### 5) **Explain Code / Add Comments**
```text
Explain the following function for a junior developer and add inline comments.
Keep the code behavior unchanged.

Code:
```go
func KthSmallest(root *TreeNode, k int) int { ... }
````

Deliverable:

*   First: 5-bullet explanation (plain text).
*   Then: the commented code in \`\`\`go.

````

---

### 6) **Code Review**
```text
Perform a code review focusing on correctness, complexity, concurrency safety, and memory usage.
List findings by severity (High/Med/Low) with actionable suggestions.

Code:
```rust
pub fn process(batch: Vec<Item>) -> Result<Stats> { ... }
````

Deliverable:

*   Bulleted review only. No code edits.

````

---

### 7) **API Design (JSON Schema & Contract)**
```text
Design a JSON request/response schema for creating a project.

Constraints:
- Backward-compatible optional fields.
- Explicit error codes and messages.

Deliverable:
```json
{
  "request": { ... },
  "response": { ... },
  "errors": [
    {"code": "VALIDATION_ERROR", "http": 400, "message": "..." }
  ]
}
````

````

---

## Style Techniques That Help Across Tools

- **Be explicit about format**: “Return a *unified diff only*” or “One ```python code block with no prose.”
- **Use delimiters**: Triple backticks around code and **named sections** (e.g., `Context:`, `Constraints:`).
- **Constrain the scope**: Specify files, functions, or components instead of asking for “the system.”
- **Give real data**: Include small, representative snippets or test vectors.
- **Few-shot examples**: Provide one or two *good* samples to set the pattern.
- **Define success**: Tests to pass, metrics, or acceptance criteria.
- **Avoid hidden chain-of-thought**: Ask for *final reasoning artifacts* (e.g., “list of assumptions,” “complexity analysis”) rather than step-by-step inner thoughts.
- **Iterate**: Multi-turn refinement is normal—ask for diffs, then tests, then docs.

---

## Small Differences by Platform (How to Phrase Prompts)

> You can mostly reuse the same structure; here’s how each tends to flow in practice:

- **GitHub Copilot (in-editor)**
  - Uses **inline comments**, **docstrings**, and **function signatures** to infer intent.
  - Prompts to try:
    - `# Implement a streaming CSV parser with backpressure, no external libs.`
    - Docstring-first stubs with explicit types.
  - For chat panels: paste the Swiss‑Army template with file paths and code blocks.

- **Claude / OpenAI-style chat**
  - Embrace the **sectioned structure** (Task/Context/Constraints/I-O/Deliverable).
  - Request strict output formats (e.g., diff-only or code-only).
  - Provide few-shot examples if you need a specific pattern.

- **Google AI Studio**
  - Similar to chat style. If you need structured output for tooling, include a **JSON schema** and say:
    - “Respond *valid JSON* only (no markdown), exactly matching this schema.”

- **Windows Copilot / IDE-embedded assistants**
  - Keep prompts concise and **local to the file/selection**.
  - Use comments above code to direct changes:
    - `// Refactor for O(n log n). Keep public API. Explain approach briefly.`

---

## Quick Prompt Cheat Sheet

- **Generate**: “Write `function X` in [lang], given [context]. Must [constraints]. Return only [format].”
- **Refactor**: “Refactor [snippet] to [goal], keep behavior and signature. Constraints: [list]. Return only code.”
- **Fix**: “Given failing test [snippet], fix [function]. No API changes. Provide unified diff.”
- **Explain**: “Explain in 5 bullets for a junior dev, then return commented code only.”
- **Test**: “Create unit tests covering [cases], using [framework], file name [x]. Output only test code.”
- **Design**: “Propose JSON schema for [API]. Include examples and error model. JSON only.”

---

## Common Pitfalls to Avoid

- **Vague goals** (“improve performance”) → replace with concrete targets.
- **Missing context** (framework versions, input size).
- **Oversize dumps** → paste only *relevant* code.
- **Unspecified output** → always state “code only,” “diff only,” or schema.
- **Hidden requirements** → list security, compliance, or compatibility up front.

---

If you tell me which agent you use most (e.g., GitHub Copilot in VS Code vs Claude desktop), your language/framework, and your typical tasks, I can tailor a few **drop-in prompt templates** for your workflow.
````

Good. How about natural language with User Story, Workorder, Functional Requirements and Technical Requirements together?
----
----
Absolutely — when you’re working with **User Stories, Work Orders, Functional Requirements (FRs), and Technical Requirements (TRs)** together in **natural language**, the key is to follow a **consistent structure** and use formatting that all coding agents understand well.

Below is a **universal prompt format** you can use across Copilot, Claude, OpenAI, Google AI Studio, etc. It’s designed to turn natural language specs into predictable, high‑quality code outputs.

***

# ✅ **Unified Natural-Language Specification Format**

This format lets you combine:

*   **User Story** (business value)
*   **Work Order / Task** (the job to be done)
*   **Functional Requirements** (what the system must do)
*   **Technical Requirements** (constraints on how it must be done)

Agents perform best when you use **clear section headers**, straight natural language, and optional examples.

***

# 🌟 **Template (Copy‑Ready)**

Here’s a universal structure:

```text
User Story:
As a [user type], I want to [goal], so that [business value].

Work Order / Task:
Describe the work that needs to be completed:
- [Task 1]
- [Task 2]
- [Task 3]

Functional Requirements:
1. [System behavior requirement]
2. [Input/output requirements]
3. [Edge-case or validation rules]
4. [Acceptance criteria]

Technical Requirements:
- Programming language: [e.g., Python 3.11]
- Framework: [FastAPI / React / .NET / Node]
- Architecture constraints: [stateless, REST, microservice, etc.]
- Performance: [e.g., response ≤ 200ms]
- Security: [e.g., sanitize inputs, no eval()]
- API/Protocol: [OpenAPI, JSON, gRPC]
- Data structures: [must use dicts, must use streams]
- Dependencies allowed: [list or none]

Non-Functional Requirements (optional):
- Logging
- Monitoring
- Tracing
- Error handling format
- Testing expectations

Input/Output Contract:
Describe the expected I/O:
- Request shape:
  { ... }
- Response shape:
  { ... }

Examples:
- Input → Output examples (recommended)
- Edge cases

Deliverable:
Describe EXACTLY what the AI should return:
- “Return a single code block with the full implementation.”
- “Provide only a unified diff patch.”
- “Generate unit tests only.”
- “Output JSON only, no explanations.”

```

***

# 🧩 **Example Filled-In Version**

Here’s a complete example showing how natural language fits with all components.

````text
User Story:
As a logged-in user, I want to upload a profile picture so that my account looks personalised.

Work Order:
- Add an API endpoint to upload images.
- Validate file type and size.
- Store image in cloud storage.
- Update user profile record.

Functional Requirements:
1. Endpoint must accept a multipart/form-data upload.
2. Accept only PNG or JPG files.
3. Max file size: 2 MB.
4. Return error on invalid file type/size.
5. Store the uploaded file under /users/{id}/profile-image.
6. Update database field user.profileImageUrl.
7. Return JSON containing the final URL.

Technical Requirements:
- Language: Node.js 20 + TypeScript
- Framework: Express.js
- Storage: AWS S3 (use official SDK v3)
- Response time: < 300ms for files < 2MB
- Do NOT use any local file system write operations.
- Add input sanitization.
- Use async/await only.
- Include JSDoc on the endpoint.

Non-Functional Requirements:
- Log upload start and finish.
- Log error reasons without exposing internal stack traces.
- Write 3 Jest unit tests and 1 integration test.

Input/Output Contract:
Request:
- POST /api/user/profile-image
- multipart/form-data with field "file"

Response (success):
{
  "url": "https://s3.amazonaws.com/.../profile.jpg"
}

Response (error):
{
  "error": "INVALID_FILE_TYPE"
}

Examples:
Input: upload file profile.png (1.1 MB)
Output: returns URL

Deliverable:
Return the complete Express route handler + S3 upload helper + tests in a single ```ts code block.
````

***

# 🔍 **Why this works across all coding agents**

Because all coding models respond best when you provide:

✔ **Section headers** (clear intent)  
✔ **Natural language in short statements**  
✔ **Structured bullet lists** (makes constraints obvious)  
✔ **I/O contracts** (models behave deterministically)  
✔ **Examples** (teaches the pattern)  
✔ **Precise deliverable instructions** (controls output format)

This format is compatible with:

*   GitHub Copilot Chat
*   Windows Copilot
*   Claude
*   OpenAI ChatGPT / Codex
*   Google AI Studio / Gemini
*   Cursor.sh
*   Replit Agents
*   AWS Q Developer

***

# 🚀 Want me to generate a full reusable template?

If you'd like, I can create:

✅ A general template  
or  
🎯 A template customized for your domain (backend, frontend, mobile, data engineering, DevOps, AI/ML, etc.)

Just tell me:

*   What kind of projects you build?
*   What languages or frameworks you mostly use?

I can tailor a perfect version for your workflow.

----
So I see the format is basically YAML rather than markdown with headings?
----
Great eye! The structure I showed **can be written as either Markdown with headings *or* YAML**. The key is the *sections* (User Story, Work Order, FRs, TRs, etc.)—not the markup syntax. Different assistants handle both well, but there are trade‑offs.

Here’s how to choose:

***

## When to use **Markdown with headings**

**Best for:** Chat-style prompts, readability, and mixed prose + code.

*   Human-friendly, easy to edit.
*   Works well in Copilot/Claude/ChatGPT chats and IDE sidebars.
*   Lets you include code blocks, diffs, and examples inline.

**Template (Markdown):**

````markdown
## User Story
As a [user type], I want to [goal], so that [value].

## Work Order
- [Task 1]
- [Task 2]

## Functional Requirements
1. [Behavior]
2. [Validation]
3. [Edge cases]
4. [Acceptance criteria]

## Technical Requirements
- Language: [e.g., Python 3.11]
- Framework: [FastAPI]
- Performance: [e.g., p95 < 200ms]
- Security: [e.g., sanitize inputs]
- Dependencies: [allowed list]

## I/O Contract
**Request**
```json
{ ... }
````

**Response**

```json
{ ... }
```

## Examples

*   Input → Output pairs

## Deliverable

Return \[exact format], e.g., **one code block only**, no extra text.

````

---

## When to use **YAML**
**Best for:** Machine‑parseable specs, tool integration, and enforcing structure.

- Easy for the model to reason over as a **single schema-like object**.
- Great when you’ll **pipe the output** to tools, or want consistent keys.
- Good for “respond in JSON only” workflows (AI Studio, function-calling, etc.).

**Template (YAML):**
```yaml
user_story: "As a [user], I want to [goal], so that [value]."

work_order:
  - [task 1]
  - [task 2]

functional_requirements:
  - id: FR-1
    text: "[System behavior]"
  - id: FR-2
    text: "[Validation rules]"

technical_requirements:
  language: "Python 3.11"
  framework: "FastAPI"
  performance: "p95 < 200ms"
  security:
    - "sanitize inputs"
    - "no eval"
  dependencies: ["pydantic", "uvicorn"]

io_contract:
  request_schema:
    type: object
    properties: { ... }
    required: [ ... ]
  response_schema:
    type: object
    properties: { ... }

examples:
  - input: { ... }
    output: { ... }

deliverable:
  format: "code_block"
  notes: "Return only runnable code, no commentary."
````

> Tip: If you choose YAML, ask the model to **echo back a confirmation in YAML** or to **generate output matching specific YAML/JSON schemas**. This reduces ambiguity.

***

## Or use **JSON** if you need strict schemas

If you’re integrating with tools or validators, JSON is safest.

```json
{
  "user_story": "As a user, I want to upload a profile picture so that my account looks personalised.",
  "work_order": ["Create upload endpoint", "Validate image type and size", "Store to S3", "Update profile URL"],
  "functional_requirements": [
    {"id": "FR-1", "text": "Accept multipart/form-data"},
    {"id": "FR-2", "text": "Accept only PNG/JPG up to 2MB"}
  ],
  "technical_requirements": {
    "language": "Node 20 + TypeScript",
    "framework": "Express",
    "storage": "AWS S3 SDK v3",
    "performance": "Response < 300ms for <2MB",
    "security": ["sanitize inputs", "no local FS writes"]
  },
  "io_contract": {
    "request": {"method": "POST", "path": "/api/user/profile-image"},
    "response_success": {"url": "string"},
    "response_error": {"error": "string"}
  },
  "examples": [{"input": "profile.png (1.1MB)", "output": {"url": "https://.../profile.jpg"}}],
  "deliverable": {"format": "unified_diff", "files": ["route.ts", "s3.ts", "route.test.ts"]}
}
```

***

## Practical guidance by assistant

*   **GitHub Copilot (in-editor/chat)** → Markdown with headings works great; include code blocks and file paths.
*   **Claude / ChatGPT / Cursor** → Either format; Markdown is easiest for iterative refinement.
*   **Google AI Studio / function-calling / tool pipelines** → Prefer **JSON/YAML** with explicit schema; ask for “valid JSON only.”
*   **Windows Copilot / inline comments in code** → Short **Markdown sections** or line comments right above the code you want changed.

***

## Hybrid approach (my recommendation)

Use **Markdown for readability** and embed **strict parts as YAML/JSON blocks**:

````markdown
## User Story
As a data analyst, I want to export filtered results to CSV so that I can share reports.

## Requirements (YAML)
```yaml
functional_requirements:
  - id: FR-1
    text: "Filter by date range and status"
  - id: FR-2
    text: "Export to CSV with header row"
technical_requirements:
  language: "Python 3.11"
  framework: "FastAPI"
  performance: "Export 100k rows under 2s"
io_contract:
  request:
    query: ["start_date", "end_date", "status"]
  response:
    content_type: "text/csv"
deliverable:
  format: "code_only"
  language: "python"
````

## Deliverable

Return **one \`\`\`python** block with FastAPI endpoint + unit tests (pytest). No extra text.

```

This gives you the **clarity of Markdown** and the **rigor of structured YAML** for the parts that matter.

---

## Bottom line

- **Both are valid**. Use **Markdown** for human collaboration and **YAML/JSON** when you want machine-enforceable structure or to integrate with tools.
- What matters most is **clear sections**, **explicit constraints**, a **concrete I/O contract**, and **precise deliverable instructions**.

If you tell me which assistant you use most and your tech stack, I can package a **ready-to-paste template** in your preferred format (Markdown, YAML, or JSON).
```
