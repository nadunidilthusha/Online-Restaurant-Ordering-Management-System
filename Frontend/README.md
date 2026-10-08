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
