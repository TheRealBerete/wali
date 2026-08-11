---
name: Wali
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#cdc7ab'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#979177'
  outline-variant: '#4b4732'
  surface-tint: '#dec800'
  primary: '#fffeff'
  on-primary: '#373100'
  primary-container: '#fce300'
  on-primary-container: '#706400'
  inverse-primary: '#6a5f00'
  secondary: '#c6c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#fdffff'
  on-tertiary: '#313030'
  tertiary-container: '#e4e1e0'
  on-tertiary-container: '#656463'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#fde403'
  primary-fixed-dim: '#dec800'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#504700'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  container-max: 1200px
---

## Brand & Style

The design system is engineered for young professionals in Guinea, balancing high-energy visual impact with the disciplined rigor required for financial management. The aesthetic is **High-Contrast Minimalism**, merging the raw intensity of West African sunlight with the sleek, clinical efficiency of modern fintech. 

The emotional response should be one of "empowered clarity." By utilizing a restricted but bold color palette and generous negative space, the interface removes cognitive load while maintaining a premium, "cool" edge that differentiates it from traditional banking institutions. The style is unapologetically bold, utilizing large typography and expansive surfaces to create an atmosphere of financial transparency and control.

## Colors

The palette is anchored by "Electric GNF Yellow" set against a deep, architectural black. This high-contrast pairing ensures maximum legibility and visibility even under direct sunlight, a critical consideration for the Guinean market.

- **Primary (Vibrant Yellow):** Used exclusively for high-priority actions, data highlights, and branding. It represents liquidity and energy.
- **Surface & Background:** The system defaults to a sophisticated **Dark Mode**. Pure black (`#000000`) is used for the base background to save battery on OLED screens, while tiered grays provide structural depth.
- **Functional Colors:** Success, Error, and Warning states should be handled through high-saturation tones that maintain the "neon-on-dark" aesthetic without breaking the minimalist harmony.

## Typography

This design system utilizes **Plus Jakarta Sans** for its modern, geometric character that feels both friendly and engineered. **Inter** is reserved for small labels and utility text to ensure maximum readability for dense financial data.

- **Financial Numerics:** All currency displays (GNF) should use `Plus Jakarta Sans` with tabular lining figures to ensure vertical alignment in lists and tables.
- **Contrast:** High-level headers should use the primary yellow or pure white against black backgrounds. Secondary information uses 60-70% opacity white.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid with Safe Zones**. We prioritize the "thumb-zone" for mobile users, keeping primary navigation and action buttons within the bottom 40% of the screen.

- **Grid:** A 12-column grid is used for desktop, collapsing to a single-column layout for mobile with 20px side margins.
- **Rhythm:** A strict 4px baseline grid ensures vertical rhythm. Spacing between cards and sections should be generous (24px or 32px) to maintain the minimalist feel.
- **Stacking:** Financial summaries should be presented in a vertical stack to allow for infinite scrolling through transaction history.

## Elevation & Depth

To maintain the "Ultra-minimalist" style, we avoid traditional shadows where possible, opting for **Tonal Layering** and **Subtle Glows**.

- **Surface Levels:** 
    - Level 0: Pure Black (`#000000`) for the canvas.
    - Level 1: Deep Grey (`#1A1A1A`) for main card backgrounds.
    - Level 2: Mid Grey (`#2C2C2C`) for interactive elements or modals.
- **Active States:** Instead of elevation, active elements use a 1px solid border of Primary Yellow or a soft 8px yellow outer glow to simulate illumination.
- **Glassmorphism:** Use sparingly for navigation bars (15px blur, 10% white opacity) to provide context of the content scrolling underneath.

## Shapes

The shape language is defined by "Squircle" aesthetics—large, friendly radii that contrast with the aggressive color palette. 

- **Cards & Containers:** Use `rounded-lg` (16px) for all main content containers to create a soft, premium feel.
- **Buttons:** Use `rounded-xl` (24px) or full pill-shape to ensure they feel tactile and distinct from content cards.
- **Inputs:** Use `rounded-lg` (16px) to match the card rhythm, providing a consistent structural language throughout the application.

## Components

### Buttons
- **Primary:** High-gloss Primary Yellow background with black text. Bold weight.
- **Secondary:** Transparent background with a 2px solid white or grey border.
- **Large Touch Targets:** All buttons must have a minimum height of 56px to accommodate mobile interaction.

### Cards
- **Financial Cards:** These are the primary unit of the UI. Background: `#1A1A1A`. No shadow. 1px border of `#2C2C2C` to define edges against the black background.

### Input Fields
- **Minimal Inputs:** Bottom-border only for a "clean" look, or fully enclosed containers with 16px corner radius. Focus state is indicated by a Primary Yellow border.

### Chips & Tags
- **Categories:** Used for budget labeling (e.g., "Food", "Rent"). Small, pill-shaped, using low-opacity versions of status colors (e.g., 10% Green background with 100% Green text).

### Transaction Lists
- Tight vertical density with high-contrast amounts. Outgoing money in White; Incoming money in Primary Yellow. Use Inter for the date stamps.

### Progress Bars
- Budget tracking uses thick (12px) bars. The "track" is dark grey, and the "progress" is Primary Yellow. When a budget is exceeded, the bar turns to a sharp "Danger Red".