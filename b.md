# UI/UX Improvements for Quiz Arena

## High Priority
- [x] **Loading feedback on "Try API Quiz"** — disable the button and show a spinner inside it while fetching, instead of just a full-screen overlay
- [x] **Better empty states** — the home page stats vanish when there's no history; show a friendly "Complete your first quiz!" message instead
- [x] **Quiz transition polish** — animate between questions (slide out / slide in) rather than instant swap; the CSS keyframes exist but aren't applied
- [x] **Option click feedback** — brief scale pulse on option buttons when tapped

## Medium Priority
- [x] **Progress bar fix** — it currently shows `idx/total` (question index), but should show `answered/total` to reflect real progress
- [x] **Focus management** — after selecting an answer, focus should move to the Next button so keyboard users can press Enter immediately
- [x] **Filter/search for History** — the inline styles should be extracted to CSS classes for consistency
- [x] **Responsive quiz bar** — on mobile the top bar wraps awkwardly; the nav buttons and timer could collapse better
- [x] **Category card icons** — the `dangerouslySetInnerHTML` is used for icons; replaced with clean JSX wrapper (only SVG string remains)

## Low Priority / Polish
- [x] **Social meta tags** — add Open Graph tags to `index.html` for link previews
- [x] **404 page** — no route for unknown paths; added catch-all fallback with `NotFoundScreen`
- [x] **Scroll restoration** — navigating between pages doesn't reset scroll position; smooth scrolls to top on route change
- [x] **Export all results as image** — the results page has a "Export as Image" button using `html2canvas`
- [x] **Timer number animation** — the seconds digit jumps; added subtle scale transition on each tick
