# .NET framework‑managed code generations

I asked M365 Copilot for a list of framework‑managed code generations that .NET is capable of. The following is what M365 Copilot responded


Below is a **comprehensive, categorized list of framework‑managed code generation mechanisms that .NET is capable of**, with clear distinctions about **when** the code is generated (compile time vs runtime), **how** it is generated, and **who controls it** (framework vs developer).

This list focuses on **code generation performed by the .NET runtime or framework infrastructure itself**, not user-authored generators.

***

# Framework‑Managed Code Generation in .NET

## 1. XML Serialization (`XmlSerializer`)

**Type:** Runtime *and* Compile‑time  
**Scope:** Infrastructure-level

### What is generated

*   Strongly-typed serialization / deserialization code
*   A dedicated serializer assembly

### When

*   **Runtime (default):** Generated on first use
*   **Compile time:** Via `sgen.exe` or MSBuild integration

### Mechanism

*   Reflection + IL emission
*   Assembly loaded into the AppDomain

### Notes

*   Classic example of framework-managed code generation
*   Primary motivation: performance over pure reflection
*   Problematic for AOT unless pre-generated

✅ **True code generator**

***

## 2. Regular Expressions (`Regex`)

**Type:** Runtime *or* Compile‑time  
**Scope:** Infrastructure-level

### What is generated

*   Specialized IL that implements the regex state machine

### When

*   **Runtime:** With `RegexOptions.Compiled`
*   **Compile time:** With `[GeneratedRegex]` (C# 11 / .NET 7+)

### Mechanism

*   Emits IL optimized for the specific pattern
*   Avoids interpreter-based execution

### Notes

*   Compile-time option eliminates runtime emit
*   A major reason regex performance is high in .NET

✅ **True code generator**

***

## 3. ASP.NET / ASP.NET Core View Compilation (Razor)

**Type:** Compile‑time *and/or* Runtime  
**Scope:** Web framework

### What is generated

*   C# classes from `.cshtml` Razor views
*   Render methods

### When

*   **Compile time:** Default in ASP.NET Core
*   **Runtime:** Optional (dynamic recompilation)

### Mechanism

*   Razor engine generates C#
*   Roslyn compiles it to assemblies

### Notes

*   Historically runtime; now mostly compile-time
*   Fundamentally source-to-source generation

✅ **True code generator**

***

## 4. Dynamic Proxies (Castle, DispatchProxy, WCF proxies)

**Type:** Runtime  
**Scope:** Framework + library infrastructure

### What is generated

*   Proxy types
*   Method-forwarding stubs
*   Interception logic

### When

*   Runtime

### Mechanism

*   Reflection.Emit (or similar)
*   Generated types inherit or implement user types/interfaces

### Examples

*   `DispatchProxy`
*   WCF client proxies
*   DI interception frameworks

✅ **True code generator**

***

## 5. Expression Tree Compilation

**Type:** Runtime  
**Scope:** Runtime infrastructure

### What is generated

*   Executable IL from expression trees

### When

*   When calling `Expression.Compile()`

### Mechanism

*   Emits IL directly into dynamic methods

### Notes

*   Used heavily by LINQ providers
*   Performance approaches handwritten code

✅ **True code generator**

***

## 6. LINQ Providers (e.g., LINQ to Objects, EF Core)

**Type:** Runtime  
**Scope:** Hybrid (framework + provider)

### What is generated

*   Dynamic methods
*   Query pipelines
*   Materialization logic

### Mechanism

*   Expression trees → IL or SQL (depending on provider)

### Notes

*   For in-memory LINQ: emits delegates
*   For ORM providers: generates SQL + mapping code

✅ **Often code generation (depending on provider)**

***

## 7. COM Interop / Runtime Callable Wrappers

**Type:** Runtime / Build-time  
**Scope:** Interop infrastructure

### What is generated

*   RCWs (Runtime Callable Wrappers)
*   COM proxy stubs

### Mechanism

*   Metadata-driven code emission
*   Type libraries → IL

### Notes

*   Mostly invisible to developers
*   Essential for COM interoperability

✅ **True code generator**

***

## 8. P/Invoke and Interop Marshalling Stubs

**Type:** Runtime (JIT) *and* Compile-time optimization  
**Scope:** Runtime infrastructure

### What is generated

*   Call stubs
*   Parameter marshaling logic

### Mechanism

*   Metadata + JIT‑generated glue code

### Notes

*   New source‑generated interop exists (`LibraryImport`)
*   Historically runtime-generated

✅ **Code generation (low-level, opaque)**

***

## 9. ASP.NET Routing, Middleware, and Endpoints

**Type:** Compile‑time (modern)  
**Scope:** Web framework

### Example

*   Minimal APIs
*   Endpoint routing source generators

### What is generated

*   Fast dispatch logic
*   Request handlers

### Notes

*   Replaced reflection-heavy runtime logic
*   Improves startup and AOT compatibility

✅ **Compile-time framework-managed generation**

***

## 10. Entity Framework Core (Compiled Models & Queries)

**Type:** Runtime *and* Compile‑time  
**Scope:** ORM infrastructure

### What is generated

*   Mapping logic
*   Query materializers
*   Tracking code

### Mechanism

*   Expression trees
*   Source generation (newer versions)

### Notes

*   Earlier versions leaned heavily on runtime generation
*   Modern EF Core prefers compile-time generation

✅ **True code generator**

***

## 11. Binary / Serialization Infrastructure (Formatter-based)

**Type:** Runtime  
**Scope:** Serialization infrastructure (legacy)

### Examples

*   `BinaryFormatter` (obsolete)
*   Remoting infrastructure

### Mechanism

*   IL generation for serialization stubs

✅ **True code generator (legacy, discouraged)**

***

# Important Non‑Examples (Not Code Generation)

To avoid confusion, these are **not** code generators:

| Feature                | Why                                |
| ---------------------- | ---------------------------------- |
| C# Generics            | JIT specialization, not generation |
| Interfaces             | No emitted implementations         |
| Reflection             | No code emission                   |
| Attributes             | Metadata only                      |
| JIT compilation itself | Compilation ≠ generation           |

***

## Mental Model: How to Classify .NET Code Generation

✅ **Code generation if ALL are true:**

1.  New executable code is produced
2.  Code did not exist as source beforehand
3.  Generated programmatically
4.  Loaded or executed by the runtime

***

## One‑paragraph summary

> **.NET supports extensive framework‑managed code generation across serialization, regex, web frameworks, interop, LINQ, ORM, proxies, and expression trees—using both runtime IL emission and compile‑time source generation. These mechanisms exist to replace slow reflection with specialized code while remaining mostly invisible to the developer.**

If you want next, I can:

*   Map these features against AOT compatibility
*   Compare runtime emit vs source generators
*   Create a taxonomy diagram of all .NET generation mechanisms
*   Contrast .NET’s approach with C++ templates or JVM bytecode generation

Just say which direction you’d like to go.
