# Photo Transliterator

A web application that extracts text from photos and transliterates between English and Hindi scripts.

## Overview

Photo Transliterator uses OCR (Optical Character Recognition) technology to extract text from images and provides bidirectional transliteration between English (Latin script) and Hindi (Devanagari script).

## Features

- **Camera Capture & Upload**: Take photos with your device camera or upload existing images
- **Bidirectional Transliteration**: 
  - English → Hindi (Latin to Devanagari)
  - Hindi → English (Devanagari to Latin)
- **OCR Text Extraction**: Powered by Tesseract.js with support for both English and Hindi languages
- **Dark/Light Mode**: Full theme support with Material Design 3 aesthetics
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Copy Functionality**: Easily copy extracted or transliterated text

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Tesseract.js** for OCR
- **@indic-transliteration/sanscript** for transliteration
- **react-webcam** for camera access
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Multer** for file uploads
- **Vite** for development server

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── camera-upload-zone.tsx    # Camera/upload interface
│   │   │   ├── language-toggle.tsx       # Language direction selector
│   │   │   ├── text-display-card.tsx     # Text display component
│   │   │   ├── processing-status.tsx     # Status indicator
│   │   │   ├── theme-provider.tsx        # Theme context
│   │   │   └── theme-toggle.tsx          # Dark/light mode toggle
│   │   ├── lib/
│   │   │   ├── ocr.ts                    # Tesseract.js OCR logic
│   │   │   └── transliterate.ts          # Transliteration utilities
│   │   ├── pages/
│   │   │   └── home.tsx                  # Main application page
│   │   └── index.css                     # Global styles & design tokens
│   └── index.html
├── server/
│   ├── routes.ts                         # API endpoints
│   └── storage.ts                        # Storage interface
├── shared/
│   └── schema.ts                         # TypeScript types & schemas
└── design_guidelines.md                  # Design specifications
```

## Design System

The application follows Material Design 3 principles with:
- **Primary Color**: Blue (HSL: 210 100% 60% dark / 210 100% 50% light)
- **Typography**: Inter for UI, JetBrains Mono for text output
- **Components**: Card-based layout with surface elevation
- **Interactions**: Smooth transitions and micro-animations

## Key Workflows

1. **Text Extraction Flow**:
   - User selects language direction (English→Hindi or Hindi→English)
   - User captures/uploads an image
   - OCR extracts text from the image
   - Text is automatically transliterated
   - Results displayed in cards with copy functionality

2. **Camera Workflow**:
   - Click "Open Camera" to access device camera
   - Position text in frame
   - Click capture button
   - Image is processed automatically

3. **Upload Workflow**:
   - Click "Upload Photo" or upload from camera view
   - Select image from device
   - Image is processed automatically

## OCR Configuration

- **English Text**: Uses Tesseract.js with 'eng' language pack
- **Hindi Text**: Uses Tesseract.js with 'hin' language pack
- Language selection is automatic based on transliteration direction

## Transliteration

Uses the Sanscript library with ITRANS romanization scheme:
- **English→Hindi**: Converts Latin characters to Devanagari with syncope option for natural Hindi
- **Hindi→English**: Converts Devanagari to ITRANS romanization

## Running the Application

The workflow "Start application" runs:
```bash
npm run dev
```

This starts both the Express backend and Vite frontend on the same port (5000).

## Recent Changes

- October 15, 2025: Initial implementation with OCR and transliteration features
- Implemented camera capture and file upload functionality
- Added dark/light theme support
- Created responsive Material Design 3 UI
- Integrated Tesseract.js for OCR
- Integrated Sanscript for bidirectional transliteration
