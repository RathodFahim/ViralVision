# Design System Specification: High-Fidelity Analytics

## 1. Overview & Creative North Star
### Creative North Star: "The Luminous Observer"
This design system is built to feel like a high-end command center—precise, powerful, and deeply immersive. We move beyond the "SaaS-in-a-box" aesthetic by leaning into **Atmospheric Depth**. Instead of defining space with rigid lines, we define it with light, shadow, and tonal shifts.

The system breaks the standard "grid-folder" layout through **Intentional Asymmetry**. We utilize oversized typography and overlapping "glass" containers to create a sense of editorial flow, making complex data feel like a curated story rather than a spreadsheet.

---

## 2. Colors & Atmospheric Layering
The palette is rooted in a deep, nocturnal foundation, using vibrant neon accents to draw the eye to critical insights.

### The Foundation (Tonal Range)
- **Base Surface:** `#0f131e` (`surface`). Use this as the global background.
- **Surface Tiers:** Use `surface_container_lowest` (#0a0e19) for the deepest background sections and `surface_container_highest` (#313441) for elements that need to feel closest to the user.

### The Accents (The Glow)
- **Primary (Electric Cyan):** `#dbfcff` / `#00f0ff`. Used for high-action touchpoints and "focus" states.
- **Secondary (Orchid/Violet):** `#ecb2ff` / `#cf5cff`. Reserved for secondary data streams and brand flourishes.
- **Tertiary (Deep Lavender):** `#faf3ff` / `#7213ff`. Used for supplemental highlights.

### The "No-Line" Rule
**Strict Mandate:** Prohibit 1px solid borders for sectioning. 
Structure must be achieved through:
1.  **Background Shifts:** Place a `surface_container_low` (#171b27) card on a `surface` background.
2.  **Tonal Transitions:** Use subtle 0.5px "Ghost Borders" (see Elevation section) only when accessibility requires it.
3.  **Negative Space:** Utilize the `8` (2rem) and `12` (3rem) spacing tokens to let content breathe.

---

## 3. Typography: The Editorial Edge
We pair the technical precision of **Inter** with the high-end character of **Plus Jakarta Sans**.

| Token | Font | Size | Weight | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Plus Jakarta Sans | 3.5rem | Bold | Hero stats and "Big Number" insights. |
| `headline-lg` | Plus Jakarta Sans | 2rem | Semi-Bold | Section headers and Modal titles. |
| `title-md` | Inter | 1.125rem | Medium | Card titles and Navigation items. |
| `body-md` | Inter | 0.875rem | Regular | Primary data labels and descriptions. |
| `label-sm` | Inter | 0.6875rem | Bold | All-caps metadata and overlines. |

**Hierarchy Tip:** Always pair a `display-lg` stat with a `label-sm` (all-caps) description to create the "Stripe-level" professional contrast.

---

## 4. Elevation & Depth
Depth in this system is organic, not structural.

### The Layering Principle
Stack containers to create natural hierarchy:
- **Level 0 (Floor):** `surface` (#0f131e)
- **Level 1 (Sections):** `surface_container_low` (#171b27)
- **Level 2 (Cards):** `surface_container` (#1b1f2b)
- **Level 3 (Popovers):** `surface_container_high` (#262a36)

### Ambient Shadows
Forget "Drop Shadows." We use **Ambient Blooms**. 
- **Style:** 0px 20px 40px rgba(0, 0, 0, 0.4).
- **Interactive Bloom:** On hover, apply a soft glow using a 4% opacity tint of the `primary_container` (#00f0ff) to simulate light reflecting off the surface.

### Glassmorphism & Ghost Borders
For floating navigation or top-tier modals:
- **Background:** `surface_container` at 70% opacity.
- **Effect:** 20px Backdrop Blur.
- **Border:** `outline_variant` at 15% opacity (The "Ghost Border").

---

## 5. Components & Interaction Patterns

### Buttons
- **Primary:** Linear gradient (`primary` to `primary_container`). Roundedness: `md`. 
- **Secondary:** Transparent background with a `primary` "Ghost Border."
- **Focus State:** 2px outer glow using `primary_fixed` (#7df4ff).

### Cards & Data Modules
- **Rule:** No dividers. Use `spacing-6` (1.5rem) to separate internal card elements. 
- **Header:** Use `surface_container_highest` for a subtle "header bar" background shift within the card instead of a line.

### Input Fields
- **Default:** `surface_container_lowest` background. 
- **Focus:** Border transitions to `primary_container` with a soft outer bloom.
- **Error:** Background shifts to a very faint tint of `error_container` (10% opacity).

### Specialized Analytics Components
- **The "Pulse" Indicator:** A small `primary` dot with a CSS ripple animation to indicate real-time Instagram data syncing.
- **Trend Chips:** Use `secondary_container` for positive growth and `error_container` for negative, but keep background opacities at 20% to maintain the "dark mode first" aesthetic.

---

## 6. Do's and Don'ts

### Do
- **Do** use `plusJakartaSans` for any number over 24px. It feels more premium for data.
- **Do** overlap elements. Let a glass card sit slightly over a background gradient to create 3D space.
- **Do** use wide letter-spacing (0.05em) on `label-sm` text.

### Don't
- **Don't** use pure white (#FFFFFF) for text. Use `on_surface` (#dfe2f2) to reduce eye strain in dark mode.
- **Don't** use sharp 90-degree corners. Everything must use at least the `DEFAULT` (0.5rem) radius to feel "approachable-tech."
- **Don't** use more than one "Glow" element per screen. If everything glows, nothing is important.