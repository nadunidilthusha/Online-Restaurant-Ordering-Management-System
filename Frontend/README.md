# Restaurant Frontend (React + Vite)

## Run
```bash
npm install
cp .env.example .env     # set VITE_API_URL to your Express API
npm run dev              # http://localhost:5173
npm run build            # production build
```

## Routes
Public: `/`, `/about`, `/chefs`, `/chefs/:id`, `/order`, `/checkout`, `/order/confirmation/:orderId`, `/contact`
Admin: `/admin/login`, then (protected) `/admin`, `/admin/home`, `/admin/about`, `/admin/chefs`, `/admin/chefs/new`, `/admin/chefs/:id/edit`, `/admin/menu`, `/admin/orders`, `/admin/contact`, `/admin/images`

## Structure
- `src/routes` routing + ProtectedRoute
- `src/api` Axios calls to the Express/Prisma backend
- `src/context`, `src/hooks` Auth and Cart state
- `src/components` common (Button, Card, Input, Modal, Loader, ErrorState) and layout (Navbar, Footer)
- `src/pages` public pages, `src/admin` admin panel

## Home, About and Dashboard (implemented)
- Public: `src/pages/Home/*` (promo strip, hero, stats, offers & events, featured dishes) and `src/pages/About/*` (history, mission, gallery with viewer, location & hours with open/closed status and map).
- Admin: `src/admin/pages/Dashboard/*`, `HomeManagement/*`, `AboutManagement/*` with shared `src/admin/components/*` (ImageUpload, SaveBar, StatCard, DataTable, ...).
- Data: pages load from `GET /content/home`, `GET /content/about`, `GET /admin/dashboard` and save with `PUT /content/:page`. If the API is not running they fall back to `src/data/sampleContent.js`.
- Image upload: `POST /images` with form field `image`, expects `{ url }` back.
- Preview the admin without a backend: `VITE_DEV_BYPASS_AUTH=true` in `.env` (development only).
