# Prompt to AI-generated binary is feasible. And is doomsday for programmers near?

The most original post:

* [@Freeze](https://x.com/elonmusk/status/2021745508277268824) with video.

If you google “elon musk ai will skip code machine code,” you may find that an overwhelming number of software developers disagree with and criticize this idea for various reasons. I picked a few in-depth articles whose authors apparently have a wide range of knowledge and a deep understanding of computing science and software engineering.

* [Elon Wants AI to Skip Code and Spit Out Binaries. That’s Not Progress](https://hackernoon.com/elon-wants-ai-to-skip-code-and-spit-out-binaries-thats-not-progress)
* [I think Elon is wrong about ‘AI beats compilers’. What’s the actual technical steelman?](https://www.reddit.com/r/Compilers/comments/1r6561t/i_think_elon_is_wrong_about_ai_beats_compilers/)
* [Elon Says AI Will Generate Binary by 2026. Here’s Why That’s a Terrible Idea](https://adam.holter.com/elon-says-ai-will-generate-binary-by-2026-heres-why-thats-a-terrible-idea/)
* [Elon Musk Predicts AI Will Bypass Coding by 2026: Binary Generation & Future of IT Careers](https://cloudsoftsol.com/news/elon-musk-ai-bypass-coding-binary-2026-it-careers/) from Cloud Soft Solution, one of the interest groups.
* [Is the "code + compiler" approach about to disappear?](https://inf.news/en/tech/ff288e94a7a237f5c4e48f515652d754.html)
* [Elon Musk Predicts AI Will Render Coding Obsolete by 2026](https://ssojet.com/news/elon-musk-predicts-ai-will-render-coding-obsolete-by-2026#elon-musks-prediction-on-codings-future)

## My Take
I would consider what Elon said to be quite feasible.

I don’t have any insider information. Elon Musk means that AI would generate machine code directly, rather than generating source code and invoking a compiler targeting a specific type of processor:

[@Freeze](https://x.com/elonmusk/status/2021745508277268824)

> Current: Code → Compiler → Binary → Execute  
> Future: Prompt → AI-generated Binary → Execute

The training of Grok Code should be fundamentally different from the training of other LLM AI code agents that produce human-readable source code.

## Review of the History of Programming

**Disclaimer:**
* I am not a computer scientist or an AI expert, but an active full-stack developer—surely a programmer as well.

As a programmer, I am not old enough to have used plugboards and switches in the pre-machine-code era, nor punch cards and paper tape for writing machine code. However, I have used Fortran, Assembly, and PLC at university as part of coursework while studying digital technologies for a bachelor’s degree in Physics. I also wrote an M68K processor emulator as part of my master’s thesis, using C++ code to interpret M68K machine code.

Over the years, I have used C / C++, Turbo Pascal, VB, Delphi, C#, and TypeScript for day-to-day coding. As far as I understand, high-level languages and most principles of computer science and software engineering are designed for flesh-and-blood human brains, like the following:

1. High cohesion and loose coupling  
1. SOLID  
1. Design Patterns  
1. Agile Manifesto, XP, and DevOps, etc.  
1. Reusable libraries and frameworks  

No matter how well you conform to those principles or how clean your source code is, it will eventually be compiled and linked into something resembling spaghetti—something human brains hate but computers do not care about.

Clean code can facilitate better compile-time, link-time, and run-time optimizations, and the performance boost could be up to 25%. I *think* that current optimization algorithms are largely written as fixed rules by programmers, and generally such rules reward clean code.

In short, these practices exist to help human brains digest functional and technical complexity in order to deliver a working program.

## Programming and LLM AI Code Agents

I presume you have a basic idea of how AI code agent vendors train their models. However, I am not sure what raw code they collect or how they label it:

1. Do they simply scan all code on GitHub and SourceForge, as well as some commercial programs and libraries?
1. Do they label code with signals about code quality?

As a programmer, I have benefited greatly from AI code agents, partly because I am poor at remembering trivial technical details. So far, I have found that once I ask AI code agents to implement a non-trivial feature—no matter how detailed, formal, or simple the prompt—the generated source code is usually over-bloated in design and implementation, and the line count is typically 3–5 times what it should be.

### AI-Generated Source Code and Mediocre but “Politically Correct” Hand-Crafted Code

“3–5 times” sounds like a magic number to me. In several commercial rewrite projects and one rewrite of an open-source tool—using the same technical stack and language:

1. My codebase was around 1/3 to 1/5 the LoC of the legacy versions, which were only a few months or a year older.
1. My designs were much simpler, with fewer dependencies on third-party components and less fancy DI/IoC, SOLID, and design patterns.
1. Runtime performance was 20% to 50% faster.
1. The end products were more reliable and robust.

Regarding the legacy codebases:

1. The author of one tool was enthusiastic about SOLID and DI/IoC but apparently misunderstood high cohesion and loose coupling, using DI/IoC in the wrong places.
1. The authors of the legacy commercial programs knew SOLID and design patterns well, but still applied them in the wrong places—likely due to misunderstanding cohesion and coupling and introducing overly advanced designs too early.

Basically, these legacy codebases looked “politically correct” with respect to SOLID, but were simply over-complicated and too lengthy.

### How I Have Been Writing Clean and Short Code

I believe these programmers jumped directly into implementing their first workable idea without evaluating simpler alternatives, without spending enough time understanding business and technical contexts, and without following basic Agile practices: starting with basic working code, writing plenty of unit and integration tests, and actively refactoring in each iteration.

The purpose is not to make the design look elegant or impressive, but to deepen understanding of business and technical contexts through frequent communication with technical peers and business stakeholders.

Do I write 2–4 times more lines of code than average senior developers in my city?

Not really. When I lead the SDLC, I typically spend around 1/3 to 1/4 of my billable hours coding (including testing), especially during the early 1/4 to 1/3 of the SDLC, when architecture and software design are taking shape. I spend the remaining time thinking, studying, and communicating with stakeholders. Even if I produce the same amount of code—or less—the overall maintenance cost is dramatically reduced.

Let’s review what Robert C. Martin said in "UML for Java Programmers": 

---
1. **SRP** — A class should have one and only one reason to change.
1. **OCP** — It should be possible to change the environment of a class without changing the class.
1. **LSP** — Avoid making methods of derivatives illegal or degenerate. Users of base classes should not need to know about the derivatives.
1. **DIP** — Depend on interfaces and abstract classes instead of volatile concrete classes.
1. **ISP** — Give each user of an object an interface that has just the methods that user needs.

When should these principles be applied? At the first hint of pain. It is not wise to make all systems conform to all principles all the time. You will spend an eternity imagining possible environments for OCP or sources of change for SRP, create dozens of little interfaces for ISP, and invent many worthless abstractions for DIP.

The best way to apply these principles is reactively rather than proactively. When you detect a structural problem or notice a module being affected by changes elsewhere, then consider whether one or more of these principles can help.

A reactive approach also requires a proactive effort to create pressure early. If you want to react to pain, you must diligently search for sore spots.

One of the best ways to do this is to write lots of unit tests—ideally before writing the code itself. But that is a topic for another chapter.

---

Do you see possible correlations between AI code agents and some senior developers?

1. Both tend to create advanced and complex SOLID structures with popular design patterns in advance.
2. When prompted progressively or via a big-bang request, AI code agents accumulate SOLID structures rather than continuously merging and simplifying based on new prompts.

## Advantages of Prompt-to-AI-Generated Binary

From prompt to AI-generated binary, this approach may avoid the code bloat caused by accumulated and complex designs that other AI code agents typically produce. A sufficiently powerful AI with strong hardware can handle enormous complexity without relying on CS and SE techniques developed to aid human programmers.

Grok Code likely has its own mechanisms to avoid code bloat, and SOLID and design patterns likely play near zero role.

## One Fundamental Problem of Prompt to AI-generated Binary

This approach effectively eliminates human intervention: review, verification, and validation regarding to product quality.

Even if you disassemble machine code into assembly code, the resulting code is extremely difficult for humans to read, even if AI attempts to polish it by adding symbolic names.

The entire binary becomes a black box. At best, it behaves as expected but with more than you have bargained for; at worst, it may contain multiple Pandora’s boxes—unless you fully trust AI-based review, verification, and validation.

## Areas Where Grok Code May Shine

* Pure mathematics problems and algorithms.
* Development of other AI systems based on mathematical foundations
* Domain-expert AI
* Video games
* Time-killing apps
* Advanced hacking, spam, or fraud tools, with or without AI assistance at runtime
* ...

For example, as a mathematician, you may use Grok Code to generate the whole Matlab-like libraries. 

## My Usual Challenge to AI Code Generators

Given a complex Swagger/OpenAPI definition—such as those used by Medicare Online, can an AI code generator produce usable code in C#, TypeScript, Java, and other languages?

Apparently, ChatGPT and Copilot cannot. Otherwise, Microsoft would have released an online AI‑based code generator to handle this task, instead of delivering Microsoft Kiota.

I’ll be interested to see whether, by the end of the year, Grok Code can generate a client library in machine code—based on the Medicare Online OpenAPI definitions—running on Windows 11 and an Intel processor.