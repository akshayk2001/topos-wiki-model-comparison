# TOPOS Evaluation Results

The repository contains four React personal wiki prototypes generated under different model/thinking settings. Each evaluation used the same TOPOS preferences:

```bash
--preferences simple,composable,secure
```

Before final evaluation, the GitNexus dependency graph was regenerated from the repository root. The successful graph build reported:

```text
102 nodes | 134 edges | 6 clusters | 1 flows
```

This makes the composability results more defensible: the graph existed and indexed the repository, but the evaluated apps still received 0% composability because their implementations are largely concentrated in `App.tsx` with `main.tsx` acting as a thin entrypoint.

## Commands

Run from the repository root:

```bash
topos depgraph generate

# Flash Lite standard
topos evaluate wiki-flashlite-standard/src/App.tsx wiki-flashlite-standard/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure

# Flash Lite extended thinking
topos evaluate wiki-flashlite-thinking/src/App.tsx wiki-flashlite-thinking/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure

# DeepSeek low thinking
topos evaluate wiki-deepseek-low-thinking/src/App.tsx wiki-deepseek-low-thinking/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure

# DeepSeek high thinking
topos evaluate wiki-deepseek-high-thinking/src/App.tsx wiki-deepseek-high-thinking/src/main.tsx -r --language typescript --gitnexus-dir .gitnexus/ --preferences simple,composable,secure
```

## Results Table

| Output | File | Overall | Simple | Composable | Secure | File Verdict |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Flash Lite Standard | App.tsx | 60% | 79% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |
| Flash Lite Standard | main.tsx | 57% | 72% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |
| Flash Lite Thinking | App.tsx | 58% | 74% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |
| Flash Lite Thinking | main.tsx | 56% | 68% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |
| DeepSeek Low Thinking | App.tsx | 58% | 72% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |
| DeepSeek Low Thinking | main.tsx | 56% | 68% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |
| DeepSeek High Thinking | App.tsx | 45% | 35% FAIL | 0% FAIL | 100% PASS | SECURE |
| DeepSeek High Thinking | main.tsx | 56% | 70% PASS | 0% FAIL | 100% PASS | SIMPLE_SECURE |

## Directory Summary

| Output | Directory Average | Floor Verdict |
| --- | ---: | --- |
| Flash Lite Standard | 58% | SIMPLE_SECURE |
| Flash Lite Thinking | 57% | SIMPLE_SECURE |
| DeepSeek Low Thinking | 57% | SIMPLE_SECURE |
| DeepSeek High Thinking | 51% | SECURE |

## Interpretation

The strongest output by TOPOS score was Flash Lite Standard, with a 58% directory average and SIMPLE_SECURE floor verdict. Flash Lite Thinking and DeepSeek Low Thinking were close behind at 57%, with nearly identical structural profiles.

DeepSeek High Thinking scored lower overall because its `App.tsx` file failed the simplicity pillar at 35%, which pulled the directory floor verdict down to SECURE. This suggests that higher thinking did not automatically produce simpler or more maintainable code in this task.

The shared weakness across all outputs was composability. Every evaluated file scored 0% on the composable pillar. Since the GitNexus graph was rebuilt successfully before evaluation, this is best interpreted as an architectural finding rather than a tooling failure: the generated apps are functional, but they are mostly monolithic. A more composable implementation would likely extract separate components for navigation, page viewing, editing, storage, and seed data.

## What Worked

The one-shot prompt produced runnable React prototypes across all four model settings. Each app implemented the basic personal wiki workflow: users can view pages, search or navigate between topics, create new pages, edit page content, and delete pages. The apps were simple enough to run locally with standard Vite commands, which made the outputs easy to compare side by side.

The evaluation workflow also worked after regenerating the GitNexus graph from the repository root. The final graph contained 102 nodes, 134 edges, 6 clusters, and 1 flow, which gave confidence that TOPOS was evaluating against a real dependency graph rather than a stale or missing one. All four outputs received 100% on the secure pillar, suggesting the generated frontend code avoided obvious security issues in this small prototype scope.

The standardized source PDFs made the comparison more controlled. Since each model received the same source material and the same task shape, the evaluation could focus on differences in implementation quality rather than differences in input data.

## What Did Not Work

The biggest weakness was composability. Every evaluated file scored 0% on the composable pillar, even after confirming the dependency graph was valid. This indicates that the generated apps were functional but structurally shallow: most logic stayed inside a single `App.tsx` file, with little decomposition into components, hooks, or helper modules.

The results also showed that more thinking did not automatically improve the TOPOS score. DeepSeek High Thinking produced the lowest directory average and the only SECURE floor verdict because its `App.tsx` failed the simplicity threshold. This is useful because it shows that extended reasoning settings can change output style, but they do not guarantee simpler or more maintainable code.

There were also some tooling lessons. TOPOS folder-level evaluation can include boilerplate files such as `vite-env.d.ts`, which may distort the result. For that reason, the final evaluation targeted only `App.tsx` and `main.tsx` for each prototype.

## What I Would Build Next

With more time, I would turn this from a manual comparison into a repeatable evaluation pipeline. Instead of running each model by hand, the next version would save the prompt, model settings, generated app, source PDFs, and TOPOS results together for each run. That would make the experiment easier to reproduce and easier to audit.

I would also make the app requirement more demanding. The next prompt would ask each model to split the wiki into clear pieces like navigation, page viewing, page editing, storage, and source data. It would also require citations, so each wiki section shows which source PDF it came from. That would let me evaluate both code quality and whether the content is grounded in the sources.

Finally, I would add a small dashboard for the results. It would combine TOPOS scores with basic runtime checks, such as whether the app builds and whether a user can create and edit a page. I would also add a human review rubric for content quality, usability, source grounding, and maintainability. This would give a more detailed picture than a single score.

## Takeaway

The evaluation suggests that the models produced secure and mostly simple React prototypes, but they did not naturally create modular architectures for this small one-shot task. For future iterations, the prompt could explicitly require component decomposition, reusable hooks, and separated data modules to test whether models improve on the composability pillar.
