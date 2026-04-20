# App Py Project Triage Report

## Summary
This folder most likely contains an early authored Python desktop GUI project called `NG Motors`: a Tkinter-based car showroom / dealership-style app with a login screen, a car selection screen, several per-car customization pages, and CSV-based order capture. It is a real project, but it is rough, partially incomplete, and mixed with extra experimentation. The strongest portfolio treatment is to merge it into an `early projects` bucket rather than present it as a standalone archive entry.

## Probable Project Identity
- Probable title: `NG Motors`
- Probable purpose: early car dealership / showroom customization app
- Probable category: desktop application
- Probable subcategory: Tkinter GUI / CSV-backed prototype
- Most likely flow:
  - `project.py` collects user name and phone number into `record.csv`
  - `project2.py` shows the main catalog of cars
  - `page911.py`, `Banshee.py`, `Corquette.py`, and `Grand.py` let the user choose colors and add-ons
  - the final selection is written back to `record.csv`

## Evidence Found
- `project.py` sets the window title to `NG Motors` and uses Tkinter fullscreen GUI screens.
- `project.py` records user details into `record.csv` and then imports `project2` to continue the flow.
- `project2.py` loads a main page with car buttons for `911`, `Banshee Bravado`, `Corquette classic`, and `Grand Turismo R`.
- `page911.py` and `Banshee.py` implement customization choices such as colors, spoiler, tinted windows, and upgraded wheels, then write the chosen configuration back into `record.csv`.
- `Create database.py` initializes the CSV with columns for name, phone number, car, color, and extras.
- `record.csv` contains sample entries that match the app's dealership ordering flow.
- The `Pages`, `Cars`, and `pics` folders contain a full set of custom GUI image assets and even PSD files, which suggests real design work rather than a bare tutorial.
- The `trial` folder contains a simpler earlier page prototype, reinforcing that this was iterated on locally.

## Originality/Authorship Assessment
The evidence suggests this is likely authored by the user rather than downloaded.

Reasons:
- The code is highly specific to the folder's custom asset layout and filenames.
- The app uses bespoke screen images, button assets, logos, and car pages instead of a recognizable external template structure.
- The implementation style is consistent with an early personal project: direct Tkinter scripting, module-to-module imports for navigation, CSV storage, hardcoded geometry, and some rough edges.
- No vendor branding, packaged installer structure, marketplace docs, or template authorship traces were found.

Constraints on that assessment:
- The code quality is rough and there are spelling issues and incomplete pieces.
- `test.py` is unrelated MicroPython robot-control code, which weakens the folder's cleanliness and suggests mixed experiments.
- One catalog item (`Mustang`) appears unimplemented.

## Portfolio Recommendation
### Recommendation: merge into early projects
Reasoning:
- It is real and coherent enough to mention.
- It shows early breadth in GUI programming, asset-driven interface design, and simple state persistence.
- It is not polished or complete enough to stand alone as a separate archive project.
- The mixed contents and rough architecture make it a better fit inside a short `early desktop/Tkinter experiments` bucket.

## Confidence Level
Medium-high.

## What User Clarification Would Improve Confidence
- Whether `test.py` belongs to this project or is unrelated leftover code.
- Whether `NG Motors` was for a class/demo or a self-initiated personal project.
- Whether the missing `Mustang` page was ever completed in another folder/version.
- Whether there was a final packaged/demo version with screenshots or a video you would want to reference later.
