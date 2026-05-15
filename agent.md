# Heron Constructive Solutions (HCS) - Agent Context

## Company Overview
**Heron Constructive Solutions Ltd** is a family-owned construction business specializing in high-quality construction services with a focus on regional development and sustainability.

---

## Industry & Services
- **Industry**: Construction
- **Primary Services**:
  - Fencing
  - Paving
  - Ground works
- **Project Types**: Public sector, private residential, housing associations

---

## Client Types & Market Segments

### B2B Clients
- Housing associations
- Public sector organizations
- Corporate/commercial clients
- Regional development projects

### B2C Clients
- Individual homeowners
- Private residential projects

---

## Core Business Values & Differentiators

### 1. **Quality Over Profit**
- Prioritizes customer needs and long-term fit over profit margins
- May decline jobs if not a good fit for customer outcomes
- Commits to excellence in execution and materials

### 2. **Supply Chain Vetting**
- Rigorous vetting of all suppliers
- Compliance-focused procurement
- Quality materials only—never compromise on supply chain integrity

### 3. **Family-Owned Business**
- Personal investment in customer relationships
- Long-term business perspective
- Community-focused values

### 4. **Regional-Specific Knowledge**
- Deep expertise in regional projects
- Understanding of local market and community needs
- Local development expertise

---

## Website & Marketing Strategy

### Primary Goals
1. **Lead Generation**: "Request a Quote" as primary CTA
2. **Trust Building**: Showcase quality, vetting, family values, selective approach
3. **Market Clarity**: Communicate to both B2B (housing associations) and B2C (homeowners)

### Target Messaging
- "We choose our clients as carefully as they choose us"
- Quality materials and verified suppliers
- Regional expertise and local market knowledge
- Family-owned reliability

---

## Current Homepage Status

### Sections Present
1. **Carousel** (3 images: garden fence, leaf, pavement) — vanilla JS, not CSP-compliant
2. **"Shop by Category"** — e-commerce template (New Arrivals, Accessories, Workspace) — **NOT aligned with construction**
3. **FAQs** — Generic placeholder content (Switzerland flag joke, holy water, pterodactyl) — **NOT relevant**
4. **Testimonials** — Lorem ipsum, SavvyCal logos — **Generic, not business-specific**
5. **Trusted By** — Generic company logos (Transistor, Reform, Tuple) — **Not actual clients**

### Known Issues
- No prominent "Request a Quote" CTA button
- Carousel images don't showcase actual completed projects
- Content doesn't reflect construction industry or HCS values
- Inline JavaScript prevents CSP implementation
- No accessibility features (keyboard nav, pause-on-hover, ARIA labels)

---

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Views**: EJS templates
- **Styling**: Tailwind CSS (using official Tailwind UI component templates)
- **Static Assets**: `/public/` (CSS, images, JS)
- **Architecture**: MVC pattern (routes → controllers → services)

---

## Development Priorities

### Active Todos
1. **Implement CSP for inline JS** — Move carousel script to external file, add CSP headers to prevent XSS

### Planned Improvements
- Replace placeholder content with actual HCS business messaging
- Restructure homepage sections to reflect construction services (not e-commerce)
- Add real project photography (before/after)
- Implement proper "Request a Quote" CTA flow
- Add real testimonials from housing associations and homeowners
- Improve accessibility (keyboard navigation, ARIA labels, auto-play handling)
- Image optimization (lazy loading, compression, srcset for responsive images)

---

## Key Files
- **Homepage**: `views/pages/home.ejs`
- **Main Routes**: `routes/index.js`
- **Page Controller**: `controllers/pageController.js`
- **Styles**: `public/css/styles.css`, `src/css/main.css`
- **Tailwind Config**: (implied, present in project)

---

## Important Context for Agents

When working on HCS projects:
1. **Preserve construction industry focus** — Avoid e-commerce or generic SaaS patterns
2. **Align messaging with business values** — Quality, vetting, family-owned, regional expertise
3. **B2B and B2C dual messaging** — Different value props for housing associations vs. homeowners
4. **Security-first approach** — CSP compliance, no inline scripts, secure headers
5. **Accessibility required** — WCAG 2.1 AA standard for all interactive components
6. **Use Tailwind UI templates** as starting point, but heavily customize for construction industry
7. **Real content first** — Replace all placeholder/Lorem ipsum with actual HCS information before styling

---

## Contact & Navigation Structure
- `/` — Home (currently being redesigned)
- `/about` — About page (exists, content TBD)
- `/services` — Services page (exists, content TBD)
- `/contact` — Contact page (exists, likely includes quote request form)
- `/blog` — Blog/resources (exists)
- Additional content pages for privacy, etc.

---

## Last Updated
May 14, 2026
