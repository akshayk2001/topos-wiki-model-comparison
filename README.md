# TOPOS Wiki Model Comparison

This project compares four AI-generated React personal wiki prototypes using the TOPOS evaluation framework. Each model was given the same source materials and asked to build a simple personal wiki, then the generated code was evaluated for simplicity, composability, and security.

## Prototypes

- `wiki-flashlite-standard`: Gemini 3.1 Flash Lite with standard thinking
- `wiki-flashlite-thinking`: Gemini 3.1 Flash Lite with extended thinking
- `wiki-deepseek-low-thinking`: DeepSeek V4 Flash with low thinking
- `wiki-deepseek-high-thinking`: DeepSeek V4 Flash with high thinking

## Architecture

This repository is organized as four separate Vite + React prototypes rather than one shared application. Each folder is a standalone generated output with its own `package.json`, source files, and source PDFs. This keeps the comparison fair: each model output can be installed, run, inspected, and evaluated independently without accidentally sharing code or dependencies with another result.

The apps use React with TypeScript because the generated prototypes are small frontend applications and TypeScript makes the evaluated source files explicit for TOPOS. The core files evaluated are `src/App.tsx` and `src/main.tsx`: `App.tsx` contains the wiki behavior and UI, while `main.tsx` is the React entrypoint. Vite was used because it is lightweight, fast to run locally, and adds minimal framework overhead.

The source material is stored inside each prototype's `wiki-sources/` folder. Keeping the PDFs with each output makes the experiment reproducible: reviewers can see the standardized inputs used to generate the personal wiki content, and each model output remains self-contained.

TOPOS evaluation is run from the repository root using a shared GitNexus dependency graph in `.gitnexus/`. This design choice makes the dependency graph reflect the full comparison repository while still evaluating each prototype's app files separately. The evaluation commands target only `App.tsx` and `main.tsx` to avoid counting Vite boilerplate such as `vite-env.d.ts` in the score.

The main tradeoff is that the generated apps are intentionally simple. That makes them easy to compare, but it also means the outputs are mostly monolithic: most behavior lives in `App.tsx` instead of being split into components, hooks, and data modules. This tradeoff is visible in the TOPOS results, where all four outputs scored well on security but poorly on composability.

## Evaluation Summary

| Output | Directory Avg. | Floor Verdict | App.tsx | main.tsx | Notes |
| --- | ---: | --- | ---: | ---: | --- |
| Flash Lite Standard | 58% | SIMPLE_SECURE | 60% | 57% | Highest overall score; simple and secure, but not composable. |
| Flash Lite Thinking | 57% | SIMPLE_SECURE | 58% | 56% | Similar to standard, with slightly lower simplicity scores. |
| DeepSeek Low Thinking | 57% | SIMPLE_SECURE | 58% | 56% | Nearly identical TOPOS profile to Flash Lite Thinking. |
| DeepSeek High Thinking | 51% | SECURE | 45% | 56% | App.tsx failed simplicity, lowering the floor verdict. |

All four outputs scored 100% on the secure pillar. All four scored 0% on composability after regenerating a valid GitNexus dependency graph, suggesting the generated apps were mostly monolithic React implementations rather than modular component systems.

See [TOPOS_EVALUATION.md](TOPOS_EVALUATION.md) for commands, detailed scores, and interpretation.

## Running An App

Each prototype is an independent Vite + React app. After cloning the repository, run commands from the repository root unless the command explicitly changes folders.

First, clone the repository and move into it:

```bash
git clone <repository-url>
cd topos-comparison-project
```

Choose one prototype folder:

| Prototype | Folder |
| --- | --- |
| Flash Lite Standard | `wiki-flashlite-standard` |
| Flash Lite Extended Thinking | `wiki-flashlite-thinking` |
| DeepSeek Low Thinking | `wiki-deepseek-low-thinking` |
| DeepSeek High Thinking | `wiki-deepseek-high-thinking` |

Install dependencies and start one app:

```bash
cd wiki-flashlite-standard
npm install
npm run dev
```

Vite will print a local URL, usually something like:

```text
http://localhost:5173/
```

Open that URL in the browser to view the wiki. To stop the dev server, return to the terminal running Vite and press `Ctrl + C`.

To run a different prototype after stopping the current dev server, go back to the repository root and choose another folder:

```bash
cd ..
cd wiki-flashlite-thinking
npm install
npm run dev
```

If one app is already running, Vite may choose the next available port, such as `5174`. Use the exact URL printed by the terminal for that app.

## Running TOPOS

TOPOS evaluates the generated source code using three preferences used in this project:

```text
simple, composable, secure
```

For setup details, see the official [TOPOS installation guide](https://docs.krv.ai/topos/installation.html). The guide recommends the binary CLI install for most users:

```bash
curl -fsSL https://docs.krv.ai/topos/install.sh | sh
```

After installation, verify TOPOS is available:

```bash
topos --help
```

This project also uses GitNexus because the TOPOS installation guide explains that GitNexus builds the dependency graph used by the `COMPOSABLE` pillar. The binary installer may prompt to install GitNexus; if it is missing, install it once with npm:

```bash
npm install -g gitnexus
```

Generate the GitNexus dependency graph from the repository root before running evaluations:

```bash
topos depgraph generate
```

A successful graph generation should write a `.gitnexus/` directory in the repository root. Re-run `topos depgraph generate` after changing imports, module names, or the directory structure. In the final evaluation run, GitNexus reported:

```text
102 nodes | 134 edges | 6 clusters | 1 flows
```

The evaluation commands intentionally target only `App.tsx` and `main.tsx`. This avoids including Vite boilerplate such as `vite-env.d.ts`, which can distort the directory-level result.

Run the four evaluations from the repository root:

```bash
# Flash Lite standard
topos evaluate wiki-flashlite-standard/src/App.tsx wiki-flashlite-standard/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure

# Flash Lite extended thinking
topos evaluate wiki-flashlite-thinking/src/App.tsx wiki-flashlite-thinking/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure

# DeepSeek low thinking
topos evaluate wiki-deepseek-low-thinking/src/App.tsx wiki-deepseek-low-thinking/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure

# DeepSeek high thinking
topos evaluate wiki-deepseek-high-thinking/src/App.tsx wiki-deepseek-high-thinking/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure
```

You can also run an evaluation from inside an individual prototype folder. In that case, point `--gitnexus-dir` back to the repository-level graph:

```bash
cd wiki-flashlite-standard
topos evaluate src/App.tsx src/main.tsx -r --language typescript --gitnexus-dir ../.gitnexus/ --preferences simple,composable,secure
```

If you change imports, rename files, move folders, or get suspicious graph/evaluation output, remove the generated graph and rebuild it from the repository root:

```bash
rm -rf .gitnexus
topos depgraph generate
```
