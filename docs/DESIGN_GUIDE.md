# TNV Web Design Guide for Agents

This file is the default design standard for any agent editing the TNV website. Read it before changing layouts, copy, components or CSS.

## Purpose

The site should make The Net Value feel experienced, useful, local and commercially serious. It should not look like a generic startup template. Design decisions should help a visitor understand what TNV does, why it is credible, and what to do next.

The principles below synthesise established guidance from Nielsen Norman Group, Laws of UX, Apple Human Interface Guidelines, web.dev and Refactoring UI.

## 1. Start with the user's job

Every page needs one clear primary audience and one primary action. The page hierarchy should answer, in order:

1. Am I in the right place?
2. What can TNV do for me?
3. Why should I believe it?
4. How does it work?
5. What should I do next?

Do not make visitors decode TNV's internal organisation before they can understand the offer.

## 2. Hierarchy before decoration

A visitor scanning headings, numbers, captions and buttons should understand the page without reading every paragraph.

- One H1 per page.
- Make section headings specific enough to carry meaning on their own.
- Keep paragraphs reasonably narrow, generally 45–70 characters per line.
- Use spacing to group related information before adding borders, boxes or backgrounds.
- Reserve the strongest visual emphasis for the most important content and action.
- Avoid multiple elements competing at the same visual weight.

## 3. Heroes

The first screen must establish audience, value and action quickly.

- Prefer a concrete proposition to a slogan.
- Support it with one short paragraph that explains what TNV actually does.
- Use one primary CTA. A secondary CTA is acceptable when it serves a genuinely different next step.
- Add credibility close to the hero when possible: years operating, companies supported, investments, certification, named outcomes or real people.
- Do not use an enormous sparse hero simply because it looks fashionable.
- Hero imagery must add information, identity or atmosphere. Do not use generic startup stock imagery.

## 4. Copy

Write like people at TNV speak to founders and companies.

- Concrete beats abstract.
- Evidence beats adjectives.
- Short headings are useful only when they remain meaningful.
- Avoid generic startup language such as “unlock your potential”, “innovative solutions”, “ecosystem”, “empower”, “transform your journey” unless the surrounding text makes the claim concrete.
- Explain unfamiliar programmes and acronyms.
- Prefer examples, names, outcomes and numbers to claims of excellence.
- Do not invent statistics, testimonials, partners, investment results or programme outcomes.

## 5. Evidence and trust

TNV has history and real activity. Show it.

Useful evidence includes:

- operating since 2009;
- companies supported;
- investments made;
- physical space and community;
- named founders/startups and what TNV actually did;
- certifications and institutional programmes;
- photographs of real TNV people, spaces and events;
- specific case studies.

Place proof near the claim it supports rather than collecting all credibility at the bottom of the page.

## 6. Layout and components

Do not turn every idea into a rounded card.

Use different structures according to the content: editorial split layouts, numbered processes, timelines, comparison rows, evidence bands, case studies, quotes, lists and image-led sections. Cards are appropriate for genuinely parallel items that benefit from being scanned independently.

Maintain a consistent content width, spacing scale, type scale, border treatment and button language across pages. Reuse components when the underlying information pattern is the same, not merely to make every page look identical.

## 7. Typography

The current serif/sans pairing is part of TNV's visual identity and should be used deliberately.

- Serif is appropriate for major editorial headings and distinctive statements.
- Sans serif is appropriate for navigation, body copy, labels, controls and compact data.
- Keep body text comfortably readable on desktop and mobile.
- Avoid long centred paragraphs and excessive uppercase.
- Use a small number of predictable font sizes rather than arbitrary values.

## 8. Colour

The restrained warm-paper, dark-ink, green and terracotta palette should feel confident rather than decorative.

- Accent colour should signal priority, interaction or a meaningful category.
- Do not colour everything.
- Maintain sufficient text/background contrast.
- Do not rely on colour alone to communicate state or meaning.

## 9. Calls to action

Every major page should have an obvious next step.

- Button labels should describe the action or destination.
- Use one dominant button style for primary actions.
- Do not scatter identical CTAs after every section.
- Repeat the primary action near the end of a long page when useful.
- Links that navigate should look and behave like links; controls should look like controls.

## 10. Navigation

Navigation should be predictable and task-oriented. Keep labels short and familiar. The current page must be identifiable. Mobile navigation must remain fully usable by touch and keyboard.

## 11. Responsive design

Mobile is a designed layout, not a collapsed desktop layout.

Check at minimum narrow mobile, large mobile/tablet and desktop. Ensure:

- important content remains in the right reading order;
- tap targets are comfortably sized;
- headings do not dominate the viewport;
- grids collapse intentionally;
- images crop safely;
- no horizontal scrolling occurs;
- CTAs remain visible and understandable.

## 12. Accessibility

Treat accessibility as a design requirement.

- Semantic headings in logical order.
- Meaningful alt text for informative images; empty alt for purely decorative images.
- Keyboard-accessible navigation and controls.
- Visible focus states.
- Labels for form controls.
- Sufficient colour contrast.
- Do not communicate meaning through hover alone.
- Respect reduced-motion preferences for nonessential animation.

## 13. Performance

A visually strong page that loads badly is badly designed.

- Prefer appropriately sized modern image formats.
- Avoid unnecessary JavaScript and animation libraries.
- Set image dimensions/aspect ratios to reduce layout movement.
- Lazy-load below-the-fold imagery when appropriate.
- Keep third-party fonts and scripts under control.
- Protect Core Web Vitals, especially LCP and CLS.

## 14. TNV anti-patterns

Avoid:

- generic SaaS/startup templates;
- endless rows of equal cards;
- excessive rounded corners, pills, gradients, glass effects or shadows;
- giant headlines with little information;
- huge empty vertical spaces;
- decorative animation that slows comprehension;
- generic stock photos of people pointing at laptops;
- vague claims without evidence;
- repeating the same message in several sections;
- creating new visual conventions when an existing TNV convention works.

## 15. Agent workflow

Before editing a page:

1. Read this guide and inspect the existing site-wide header, footer and CSS.
2. Identify the page's audience, primary question and primary CTA.
3. Inventory the existing facts, links, images and proof. Preserve valid content unless there is a reason to improve it.
4. Sketch the information hierarchy before styling.
5. Strengthen weak copy with concrete information, never invented claims.
6. Choose layouts according to the information rather than defaulting to cards.
7. Implement using the site's existing design tokens and components where appropriate.
8. Check desktop and mobile reading order and spacing.
9. Check semantics, keyboard behaviour, contrast and alt text.
10. Check links/assets and avoid avoidable performance regressions.
11. Compare the finished page against the checklist below.

## 16. Review checklist

### Critical

- The visitor can tell within the first screen who the page is for and what TNV offers.
- There is a clear primary action.
- Claims are factual and not invented.
- Navigation and essential controls work on mobile and keyboard.
- No broken links, missing assets, overflow or unreadable text.

### High priority

- The visual hierarchy works when scanning only headings, numbers and buttons.
- Credibility appears near important claims.
- Sections have distinct information roles rather than repeating one another.
- Layout patterns fit their content.
- Typography, spacing, colour and button treatment are consistent with the rest of TNV.
- Mobile feels intentionally composed.

### Final question

If a visual flourish disappeared, would the page become harder to understand or less recognisably TNV? If not, it probably does not need to be there.

## Reference sources

- Nielsen Norman Group, usability heuristics and UX research: https://www.nngroup.com/articles/ten-usability-heuristics/
- Laws of UX: https://lawsofux.com/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- web.dev, design/accessibility/performance guidance: https://web.dev/
- Refactoring UI: https://www.refactoringui.com/
