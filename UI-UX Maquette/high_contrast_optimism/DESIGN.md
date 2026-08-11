---
name: High-Contrast Optimism
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4b4732'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7c775f'
  outline-variant: '#cdc7ab'
  surface-tint: '#6a5f00'
  primary: '#6a5f00'
  on-primary: '#ffffff'
  primary-container: '#fce300'
  on-primary-container: '#706400'
  inverse-primary: '#dec800'
  secondary: '#695f13'
  on-secondary: '#ffffff'
  secondary-container: '#f3e48a'
  on-secondary-container: '#6f6519'
  tertiary: '#00696c'
  on-tertiary: '#ffffff'
  tertiary-container: '#04faff'
  on-tertiary-container: '#006f72'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fde403'
  primary-fixed-dim: '#dec800'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#504700'
  secondary-fixed: '#f3e48a'
  secondary-fixed-dim: '#d6c872'
  on-secondary-fixed: '#201c00'
  on-secondary-fixed-variant: '#504700'
  tertiary-fixed: '#2dfaff'
  tertiary-fixed-dim: '#00dce1'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f51'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system centers on a high-contrast, modern aesthetic that feels approachable yet structurally rigorous. By combining a stark, minimalist foundation with bold, saturated accents, it creates an atmosphere of clarity and energy. 

The visual style is **Corporate Modern with a Minimalist edge**, emphasizing heavy whitespace and large, friendly radius values to soften the high-contrast color palette. The primary goal is to provide a UI that feels reliable and professional while maintaining a youthful, optimistic character through vibrant pops of color and rounded geometric shapes.

## Colors
The palette is built on a "Stark Light" philosophy. 
- **Foundation:** The background and primary surface containers are pure white (#FFFFFF), creating an expansive, clean canvas.
- **Typography & Details:** All primary text, icons, and structural borders utilize pure black (#000000) or high-density grey (#1A1A1A) to ensure maximum legibility and a sharp, sophisticated look.
- **Primary Accent:** Yellow (#FCE300) is used exclusively for calls to action, active states, and key brand moments. It acts as a beacon against the monochromatic base.
- **Functional Greys:** Use a subtle grey (#F2F2F2) for secondary backgrounds or disabled states to maintain depth without sacrificing the light theme's integrity.

## Typography
The typography system uses **Plus Jakarta Sans** across all levels to maintain a cohesive, soft-geometric feel. 

Headlines should utilize the "ExtraBold" weight to create a strong visual anchor against the white background. Body copy should remain at "Regular" weight to ensure breathability and ease of reading. For interactive labels and captions, use "SemiBold" or "Bold" to distinguish them from static content. Optical kerning should be tight for large headings and slightly loose for small labels.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous internal margins. 
- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile.
- **Rhythm:** All spacing (padding, margins, gaps) must be multiples of the 8px base unit. 
- **Structure:** Content should be grouped in high-contrast blocks. Use the 24px container padding as a standard for internal card spacing to mirror the outer radius of the components. On mobile, reduce side margins to 16px to maximize screen real estate while maintaining the 24px corner aesthetic for cards.

## Elevation & Depth
In this light-themed system, depth is conveyed through **Low-contrast outlines** and **Ambient shadows** rather than heavy color shifts.
- **Level 0 (Background):** Pure White (#FFFFFF).
- **Level 1 (Cards/Containers):** Pure White (#FFFFFF) with a 1px solid border (#E6E6E6) or a very soft, highly diffused black shadow (0px 4px 20px, 4% opacity).
- **Level 2 (Modals/Popovers):** Pure White (#FFFFFF) with a more pronounced ambient shadow (0px 10px 30px, 8% opacity) to signify floating interaction.
Avoid heavy shadows; the "pop" should come from the primary yellow accents and the crispness of the black text on white.

## Shapes
The shape language is defined by extremely large, friendly curves. 
- **Components:** Buttons, cards, and input fields all utilize a **24px (1.5rem)** corner radius.
- **Consistency:** This 24px radius is the signature of the design system. Even small elements like chips should favor a fully pill-shaped (rounded-full) appearance to maintain the soft, welcoming geometry.
- **Icons:** Use icons with rounded terminals and a consistent stroke weight (1.5px or 2px) to match the typography's visual weight.

## Components
- **Buttons:** Primary buttons use a solid Yellow (#FCE300) fill with Black (#000000) text. Use the 24px radius. Secondary buttons should be transparent with a 1.5px black border.
- **Input Fields:** Use a 1.5px black border for the rest state and a solid yellow glow or thicker border for the active state. Background remains white.
- **Cards:** White background with a 1px soft grey border and 24px rounded corners. Content inside should be padded at 24px.
- **Chips:** Pill-shaped with a light grey (#F2F2F2) background and black text. Active chips should flip to Yellow (#FCE300).
- **Checkboxes/Radios:** When checked, these should be solid Yellow (#FCE300) with a black checkmark/indicator.
- **Lists:** Separate list items with thin, light-grey horizontal rules (#F2F2F2) and use generous vertical padding (16px-24px) to emphasize the minimalist aesthetic.