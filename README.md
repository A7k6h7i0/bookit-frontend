# BookIt: Experiences & Slots — Frontend

React + TypeScript + Vite + Tailwind frontend for browsing curated travel experiences, selecting available slots, and completing bookings.

## Live Links

- Frontend (Vercel): https://YOUR-VERCEL-URL
- Backend API (Render): https://YOUR-RENDER-URL/api

## What This App Does

- Lists travel experiences with image, title, location, description, and price.
- Search experiences instantly from the header.
- Shows details page with large banner, About, date and time slot selection, and a booking sidebar.
- Checkout form collects user info and supports promo codes:
  - SAVE10 → 10% discount
  - FLAT100 → flat ₹100 off
- Result page shows confirmation with green checkmark, total paid, and booking reference.
- UI matches Figma: clean spacing, yellow CTA buttons, white cards, responsive grid, and states (loading, empty, sold‑out, error).

## Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- React Router v6
- Axios

## Project Structure

src/
components/
Header.tsx
Footer.tsx
ExperienceCard.tsx
SlotSelector.tsx
BookingSummary.tsx
pages/
HomePage.tsx
DetailsPage.tsx
CheckoutPage.tsx
ResultPage.tsx
services/
api.ts
types/
index.ts
utils/
helpers.ts
App.tsx
main.tsx
vite-env.d.ts



## Environment Variables

Create an `.env` for local dev:

VITE_API_URL=http://localhost:5000/api

On Vercel set:
- `VITE_API_URL=https://YOUR-RENDER-URL/api`

## Local Development

git clone https://github.com/A7k6h7i0/bookit-frontend
cd bookit-frontend
npm install
cp .env.example .env # create and set VITE_API_URL
npm run dev # http://localhost:3000


## Build & Preview

npm run build
npm run preview

## Deployment (Vercel)

1. Push repo to GitHub.
2. Import into Vercel → Framework: Vite.
3. Set Environment Variable: `VITE_API_URL=https://YOUR-RENDER-URL/api`.
4. Deploy.

## Notes on Design Fidelity

- Header logo recreated using SVG to match the Figma brand: pin marker with yellow “hd”, vertical guide, and smile.
- Card spacing, typography, button styling, and sidebar totals match the provided screens.
- Result screen matches the minimal design: centered icon, title, ref ID, outlined button.

## Common Issues

- 404 on /experiences: Ensure `VITE_API_URL` ends with `/api`.
- CORS error: Add your Vercel URL to CORS origins on the backend.
- Images not loading: Update experience `image` URLs in MongoDB to valid Unsplash/Pexels links.
