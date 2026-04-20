# Hackathon Hand Gesture Triage Report

## Summary
This folder most likely contains an early hand-gesture / sign-alphabet recognition experiment: a webcam-based pipeline that collects cropped hand images for A-Z classes and runs real-time classification using a trained Keras model. It looks like a real authored ML precursor rather than a polished standalone product. The strongest portfolio treatment is to merge it into the later `SignChat` lineage instead of presenting it as a separate archive entry.

## Probable Project Identity
- Probable title: early hand gesture recognition / sign alphabet classifier
- Probable purpose: collect hand-sign image data and classify single-hand alphabet gestures in real time
- Most likely scope:
  - dataset collection for A-Z hand signs
  - per-frame hand detection and cropping
  - white-canvas normalization of the crop
  - classification with a trained Keras model
- Best interpretation: early sign-recognition precursor, not a complete assistive product by itself

## Evidence Found
- `datacollection.py` captures webcam frames, detects one hand, normalizes the hand crop onto a white square canvas, and saves images into `Data/Z` when `s` is pressed.
- `Data/` contains 26 label folders from `A` to `Z`.
- Each class folder contains a modest number of captured images, roughly 29-47 images per letter.
- `Model/keras_model.h5` is present, indicating a trained deep-learning classifier.
- `Model/labels.txt` maps indices `0-25` to letters `A-Z`.
- `test.py` uses `cvzone.HandTrackingModule.HandDetector` plus `cvzone.ClassificationModule.Classifier` to run real-time webcam classification.
- The inference loop overlays predicted labels on the frame and uses the hand detector purely for localization/cropping before classification.

## Model/Approach Assessment
### Assessment: mixed
Reasoning:
- The final classifier is clearly deep learning because it loads `keras_model.h5` through `cvzone.ClassificationModule.Classifier`.
- The full pipeline is not pure end-to-end deep learning on raw frames; it first uses `cvzone` hand detection to isolate the hand region and normalize it, then feeds the processed crop into the classifier.
- So the practical pipeline is best described as `DL classifier + CV-assisted preprocessing / detection`.

## Originality/Authorship Assessment
The folder likely reflects user-authored experimentation rather than a downloaded template.

Reasons:
- The project includes its own collected dataset organized by class folders.
- `datacollection.py` is a custom script for gathering hand-sign images into a chosen label directory.
- The code structure is minimal and personal rather than template-packaged.
- No vendor docs, marketplace packaging, or external product branding were found.

Constraints on that assessment:
- The implementation is still small and experiment-like.
- `test.py` appears cleaner and more defensive than `datacollection.py`, which may mean it was revised later.
- There is no README, report, or product framing explaining intended use beyond the code itself.

## Portfolio Recommendation
### Recommendation: merge into SignChat lineage
Reasoning:
- The folder strongly overlaps with later sign/gesture recognition work.
- It looks like a believable precursor to a more complete assistive CV project rather than a separate product.
- It has historical value because it shows the earlier stage: collecting alphabet data, training a classifier, and running webcam inference.
- It is too small and rough to stand alone as its own archive project.

## Confidence Level
High.

## What User Clarification Would Improve Confidence
- Whether this directly fed into the later `SignChat` project or was an independent hackathon experiment.
- Whether the `.h5` model was trained by you from this dataset or imported from a separate training workflow not present here.
- Whether there was ever a broader UI/demo wrapper or presentation around this folder.
- Whether this targeted sign-language alphabet recognition specifically or more general gesture recognition in the original hackathon framing.
