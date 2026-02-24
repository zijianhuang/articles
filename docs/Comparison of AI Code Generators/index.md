# Comparison of AI Code Generators


(article list here)

(requirements here)

For simple functions like turning array to dictionary, simple data conversation / transformation, and common algorithms typically taught in schools, these AI engines can give highly accurate, working and elegant sourcecode quickly.

For more complex functional and technical requirements, these AI engines often will reveal their reasoning steps and deliver the answers, as well as followup questions.

You are encouraged to:
1. Use the requirements as prompt for your favorite AI code generators, and observe their reasoning steps, and check the sourcecode generated.
2. Refine the requirements.
3. Use simply "craft Web Theme Loader in TypeScript with Minimum API Surface" as prompt.
4. Write your own prompt from scratch.

in order to see AI code generators can generate production ready sourcecode with minimum API surface.

Remarks:
* When I tried with Google AI Studio, the answers include a reference to my article "[Web Theme Loader in TypeScript with Minimum API Surface](https://dev.to/zijianhuang/web-theme-loader-in-typescript-with-minimum-api-surface-4bn)" published less than 12 hours prior. Google Gemini is so diligent in learning, thanks to Google's dominant search power, I regret that I have "polluted" Gemini's mind too early.


# Analysis

I am analyzing as a consumer programmer, not an AI expert. 

As you have probably already observed:
1. AI walks through every piece of requirements, and probably aggregate some of them.
2. Then deliver answers based on well trained models and built-in knowledge base as well as historical records in different layers of the AI infrastructure.
3. If answers are not immediately available, AI will search the Web, particularly some developer oriented blogs and forums still up to date, but not those having been squeezed to death, like CodeProject.com and StackOverflow.com
4. With raw materials here, analyze, transpile, compose and structure the answers which are in general technically correct as described by software engineering textbooks and as governed by the well trained model.


Remarks:
* I am not sure if AI can weight each item of the requirements, or there are some formalized syntax of writing prompt for signaling weights.
* 


Shortfalls:
1. AI code generators do not know implicit functional contexts and technical contexts. For example, not understanding that the settings need to be loaded as early as possible, while a JSON file can be loaded only asynchronously. In almost all 



AI to generate codes according to Swagger/OpenAPI

an OpenAPI definition is already a set of restricted, formalized and normalized prompts with near zero ambiguity. And yet Microsoft and alike have provided an online AI code generator that can take a complex definition and generate codes that can be compiled and use out of the box. I guess they are working on it.

