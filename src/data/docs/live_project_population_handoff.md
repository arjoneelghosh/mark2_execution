# Live Project Population Handoff

## Projects populated in this pass
- AgriFore
- SignChat
- SurgeMedi
- Priority-Based CSV Sampler

## Projects intentionally skipped
- FlightFinder AI
- CropIQ
- LoanONE AI
- AQI Forecasting
- RStudio Replica Forecasting App
- Collaborative Filtering Recommendation Engine
- GitHub Contribution Scheduler
- VolunTree
- Lineage-only entries
- Excluded entries
- Portfolio-site lineage

## Fields left blank or conservative on purpose
- `links.github` was left empty for all four populated projects because the current source map does not provide a single unambiguous canonical repository URL for each safe-subset item.
- Real bundled project screenshots were not added in this pass. Existing preview-asset placeholders remain in `media.cover` and `media.preview` so the current schema stays valid without forcing unsupported asset imports.
- AgriFore is described as an active forecasting platform, not a production deployment. The copy avoids claiming stable deployment, final ownership split, or a fully confirmed LLM assistant path.
- SignChat is described as a thread-based sign-recognition prototype, not a complete multilingual translator. No accuracy, dataset, or language-coverage claims were added.
- SurgeMedi is framed as a catalog frontend with quote-request UX. The copy does not claim backend commerce, inventory sync, or verified client deployment context.
- Priority-Based CSV Sampler is framed as a Streamlit data utility. The copy keeps the business context generic because the professional usage setting is still unconfirmed.
- `year` was set to `Undated` on the four populated records to avoid inventing unsupported timeline claims in the live portfolio dataset.

## Media gaps still remaining
- AgriFore has strong real media candidates in the source repo, but those figures are not yet imported into this frontend bundle.
- SignChat still lacks a confirmed bundled screenshot of the live Streamlit transcript and webcam interface.
- SurgeMedi has local media candidates listed in the media manifest, but they were not copied or imported during this controlled data-only pass.
- Priority-Based CSV Sampler still lacks a trustworthy screenshot path; the media manifest only points to folder-level evidence.

## Minimal schema or type changes made
- No changes were made to `src/types.ts`.
- No schema changes were required.

## Recommendation for the next population pass
- Next safe candidates should be FlightFinder AI and CropIQ only if you are comfortable keeping their feature-completeness wording conservative and still leaving media sparse.
- Before a broader population pass, import real bundled media for AgriFore and SurgeMedi so the populated records stop relying on placeholder preview assets.
- If you want stricter timeline display in the UI, add a schema-safe way to represent uncertain dates before replacing the `Undated` labels.
