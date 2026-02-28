
The most original post:

 * [@Freeze](https://x.com/elonmusk/status/2021745508277268824) with video.

If you google "elon musk ai will skip code machine code", you may find overwhelmingly programmers disagree and criticize for various reasons. I picked a few in-depth articles which authors apparently have wide range and in-depth knowledge and understanding of computing science and software engineering.

* [Elon Wants AI to Skip Code and Spit Out Binaries. That’s Not Progress](https://hackernoon.com/elon-wants-ai-to-skip-code-and-spit-out-binaries-thats-not-progress)
* [I think Elon is wrong about ‘AI beats compilers’. What’s the actual technical steelman?](https://www.reddit.com/r/Compilers/comments/1r6561t/i_think_elon_is_wrong_about_ai_beats_compilers/)
* [Elon Says AI Will Generate Binary by 2026. Here’s Why That’s a Terrible Idea](https://adam.holter.com/elon-says-ai-will-generate-binary-by-2026-heres-why-thats-a-terrible-idea/)
* [Elon Musk Predicts AI Will Bypass Coding by 2026: Binary Generation & Future of IT Careers](https://cloudsoftsol.com/news/elon-musk-ai-bypass-coding-binary-2026-it-careers/) from Cloud Soft Solution, one of the interest groups.
* [Is the "code + compiler" approach about to disappear?](https://inf.news/en/tech/ff288e94a7a237f5c4e48f515652d754.html)
* [Elon Musk Predicts AI Will Render Coding Obsolete by 2026](https://ssojet.com/news/elon-musk-predicts-ai-will-render-coding-obsolete-by-2026#elon-musks-prediction-on-codings-future)


## My Take
I would consider what Elon said is quite feasible.

I don't have any insider news. Elon Mush means AI really generates machine code directly, rather than generating sourcecode and invoking a compiler targeting a specific type of processor. I had come up with the idea after reading the news of different narratives and before finding the most original post:

 [@Freeze](https://x.com/elonmusk/status/2021745508277268824)
> Current: Code → Compiler → Binary → Execute  
Future: Prompt → AI-generated Binary → Execute

The training of Grok Code should be fundamentally different from the trainings of other LLMs AI code agents which produce human readable source codes.

## Review of the History of Programming
Disclaimer:
* I am not a computer scientist or AI expert, but an active full-stack developer, surely a programmer as well. 

As a programmer, I am not old enough to use plugboard and switches in pre-machine code era, and punch card and paper tape for writing machine code. Somehow, I have used Fortran, Assembly and PLC in uni. as part of the course works of studying digital technologies for bachelor degree in Physics, and I have written a M68K processor emulator as a part of my Master thesis, using C++ codes to interpret M68K machine code.

Over years, I have used C++, Turbo Pascal, VB, Delphi, C# and TypeScript for day to day coding. As far as I understand, high level languages and most principles of computing science and software engineering are designed for flesh human brains:
1. High cohesion and loose coupling
1. SOLID
1. Design Patterns
1. Agile Manifesto, XP and DevOps etc.
1. Reusable libraries and frameworks

You know, no matter how conforming to those principles and how clean is your sourcecode, your sourcecode will be compiled and linked, and become spaghetti that human brains hate and computers don't care.  

Clean code can facilitate better compile‑time, link‑time, and run‑time optimizations. And the performance boost could be up to 25%. And I "think" that currently the algorithms of optimizations are written as fixed rules by programmers. Generally such rules award clean code.

In short, respective practices are to help flesh human brains to digest functional complexity and technical complexity in order to deliver a working program.

## Programming and LLMs AI Code Agents

I would presume that you have the basic idea about how those AI code agent vendors have trained the AI models. However, I am not sure what raw codes they have collected and how the label:
1. Do they simply just scan all codes in GitHub and SourceForge as well as some commercial programs and libraries?
1. Do they label with signals about code quality?

As a programmer, I have benefited a lot from AI code agents, partly because I am poor at remember trivial technical details. So far, I have found, once I ask AI code agents to code a non-trivial functional feature, no matter how detailed, how formal or how simple the prompt is, the generate sourcecode is mostly over bloating in design and coding, and the LoC is typically 3-5 times than it should be.


### AI Generated Sourcecode and mediocre though "politically correct" hand-crafted code

"3-5 times". This sounds like a magic number to me. In a few commercial programmings jobs of rewrite, and 1 rewrite of an open source tool, using the same technical stack and language:
1. My codebase is around 1/3 or 1/5 of the LoC of the legacy ones which were a few months or 1 year older than mine.
1. My designs were much simpler, with less dependencies on 3rd components, and less fancy DI/IoC, SOLID and design patterns.
1. Runtime performances are much faster from 20% to 50%.
1. Then end products are more reliable and robust.

Regarding the legacy codebases:
1. The author of the tool was fancy about SOLID and DI/IoC, however, apparently has misunderstood high cohesion and loose coupling, therefore, used DI/IoC in the wrong places.
1. The authors of those legacy commercial programs apparently had known a lot about SOLID and Design Patterns, and somehow, used them in the wrong places, apparently due to misunderstanding high cohesion and loose coupling and introduced too many advanced designs in advance.

Basically these legacy codebases looked "politically correct" regarding SOLID, but just over complicated and too lengthy. 

### How I have been writing clean and short code

I think these programmers probably just jumped into implementing the first thought of working solution and started to implement without evaluating other working solutions that could be simpler, and without spending more time in learning business contexts and technical contexts, and likely did not follow the basic Agile practices: start from basic working codes, with a lot unit testing and integration testing, actively do refactoring in each iterations along with frequent iterations. The whole purpose is not only to make the software design look elegant rather than being beautiful and impressive, more importantly, deepen the understanding of business content, business context and technical context through frequent communications with tech peers and business people.

Do I write 2-4 times more lines of code within the same time frame than average senior developers in my city?

Not really. When I lead the SDLC, I typically spend around 1/3 or 1/4 of my billable hours in coding including testing, especially in the early 1/4 or 1/3 of the SDLC, when the architectural design and the software design are coming to shape. I spend the rest of hours in thinking, studying, and having conversations with business stakeholders. Therefore, even if I produce the same amount of code or even less during a working day, the overall maintenance cost is dramatically reduced.

Let's review what Robert C. Marin said in "UML for Java Programmers":

---
1. SRP — A class should have one and only one reason to change.
1. OCP — It should be possible to change the environment of a class without changing the class.
1. LSP — Avoid making methods of derivatives illegal or degenerate. Users of base classes should not need to know about the derivatives.
1. DIP — Depend on interfaces and abstract classes instead of volatile concrete classes.
1. ISP — Give each user of an object an interface that has just the methods that user needs.

When should these principles be applied? At the first hint of pain. It is not wise to try to make all systems conform to all principles all the time, every time. You'll spend an eternity trying to imagine all the different environments to apply to the OCP, or all the different sources of change to apply to the SRP. You'll cook up dozens or hundreds of little interfaces for the ISP, and create lots of worthless abstractions for the DIP. 

The best way to apply these principles is reactively as opposed to proactively. When you first detect that there is a structural problem with the code, or when you first realize that a module is being impacted by changes in another, then you should see whether one or more of these principles can be brought to bear to address the problem.

Of course, if you take a reactive approach to applying the principles, then you also need to take a proactive approach to putting the kinds of pressure on the system that will create pain early. If you are going to react to pain, then you need to be diligent about finding the sore spots.

One of the best ways to hunt for sore spots is to write lots and lots of unit tests. It works even better if you write the tests first, before you write the code that passes them. But that's a topic for the next chapter. 

---

Do you see some possible correlations between AI code agent and some senior developers?

1. Visually both create advanced and complex SOLID structures with popular design patterns in advance.
2. When you prompt the AI code agent progressively or through a big bang, AI code agent accumulate beautiful SOLID structures, rather than take every opportunity to merge and optimize according to prompts.


## The advantages of Prompt to AI generated binary

From prompt to AI generated binary, this may avoid the over bloating codes of accumulated and complex design which other AI code agents typically generate, because essential AI with powerful hardware can handle tremendous complexity without invoking those methods that help human programmers for decades.

Likely Grok Code has its own ways to avoid code over bloating.

## One fundamental problem

This effective eliminates all chances of human intervention: review, verify and validate. 

Even if you disassemble the machine code to assembly language code, such sourcecode will be difficult to read by human, even if AI may polish the source code for example making up some symbols to improve the readability.

The entire binary is purely a black box. At best, the black box can do useful things you would expect, however you will never know what the black box may contain. For example, multiple Pandora boxes, unless you trust the review, verification and validation done by AI auditors.


## Some Areas that Grok Code may shine

* Pure math problems
* Development of another type of AI based on some match foundations.
* Some domain expert AI.
* Video games
* Time killing apps
* Advanced hacker/spam/fraud tools with or without AI assistance during runtime.
* ...

