# Design Guidelines: Photo Transliteration App

## Design Approach
**Selected System**: Material Design 3  
**Justification**: Utility-focused application requiring clear visual feedback during OCR processing, intuitive camera controls, and strong interaction patterns for text manipulation.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**:
- Primary: 210 100% 60% (Blue - camera/action buttons)
- Surface: 220 15% 12% (Dark background)
- Surface Variant: 220 12% 18% (Cards, elevated elements)
- On Surface: 0 0% 95% (Primary text)
- On Surface Variant: 0 0% 70% (Secondary text)
- Success: 142 71% 45% (Text detected state)
- Border: 220 10% 25% (Subtle separators)

**Light Mode**:
- Primary: 210 100% 50%
- Surface: 0 0% 98%
- Surface Variant: 0 0% 93%
- On Surface: 0 0% 10%
- Success: 142 71% 40%

### B. Typography
**Font Families**: 
- Primary: 'Inter' (Google Fonts) - UI elements, buttons, labels
- Monospace: 'JetBrains Mono' (Google Fonts) - Transliterated text output

**Scale**:
- Headline: 2rem/700 - Main app title
- Title: 1.25rem/600 - Section headers
- Body: 1rem/400 - Default text, instructions
- Caption: 0.875rem/400 - Helper text, metadata
- Text Output: 1.125rem/400 (monospace) - Transliterated results

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section gaps: gap-4, gap-6
- Major spacing: mb-8, mt-12
- Container margins: mx-4, mx-6

**Grid Structure**:
- Max width: max-w-4xl mx-auto
- Mobile: Single column, full width with px-4
- Desktop: Centered container with generous side padding

### D. Component Library

**Primary Interface Components**:

1. **Camera/Upload Zone** (Hero Area):
   - Large interactive area (min-h-96) with dashed border when empty
   - Live camera preview fills the zone when active
   - Upload button overlaid on preview (bottom-right with backdrop-blur-lg bg-black/30)
   - Capture button (large, circular, primary color) centered at bottom

2. **Language Direction Selector**:
   - Segmented control toggle above camera zone
   - Two options: "English → Hindi" and "Hindi → English"
   - Active state: solid primary background
   - Inactive state: transparent with border
   - Smooth transition on toggle

3. **Text Display Cards**:
   - Extracted Text Card (top): Surface variant background, p-6
   - Transliterated Text Card (bottom): Surface background with subtle border
   - Both cards use monospace font for better text readability
   - Copy button (icon only) in top-right corner of each card

4. **Action Buttons**:
   - Primary (Camera/Capture): Filled, primary color, min-h-12
   - Secondary (Upload Photo): Outlined, border-2
   - Icon buttons: p-3 with rounded-lg
   - All buttons use Heroicons for consistency

5. **Status Indicators**:
   - Processing state: Animated spinner with "Extracting text..." label
   - Success state: Checkmark icon with green accent
   - Error state: Alert icon with red-orange accent (15 60% 55%)

6. **Empty States**:
   - Upload zone: Dashed border, camera icon, "Take photo or upload" text
   - No text detected: Info icon, helpful message about image quality

### E. Micro-interactions
- Button press: Scale down (scale-95) with 150ms transition
- Card appearance: Fade in from opacity-0 to opacity-100
- Toggle switch: Smooth background color transition (300ms)
- Success feedback: Subtle scale pulse on text extraction complete

## Layout Structure

**Main View (Single Screen)**:
1. **Header Section** (sticky top):
   - App title "Photo Transliterator" (headline typography)
   - Language direction toggle directly below
   - Background: surface with border-b

2. **Camera/Upload Section**:
   - Dominates viewport on mobile (h-64 to h-96)
   - Aspect ratio 4:3 for camera preview
   - Controls overlay with backdrop blur

3. **Results Section** (appears after processing):
   - Extracted text card (collapsible if long)
   - Transliterated text card (primary focus)
   - Cards stack vertically with gap-4
   - Sticky "New Photo" button at bottom on mobile

4. **Footer Section** (minimal):
   - Quick tips accordion: "Tips for better results"
   - Support text: Supported scripts info

## Images
**Hero Image**: No traditional hero image. The camera/upload zone IS the visual focal point, showing live preview or uploaded photo. When empty, display a subtle gradient background (210 80% 20% to 210 70% 30%) with camera icon overlay.

## Accessibility
- Camera controls: Large tap targets (min-h-12, min-w-12)
- High contrast text on all backgrounds (WCAG AAA)
- Clear focus indicators (ring-2 ring-primary ring-offset-2)
- Screen reader labels for all icon buttons
- Loading states announced via aria-live regions