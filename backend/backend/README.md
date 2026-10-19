# Saffron & Fig: Backend (Node.js + Express + Prisma + MySQL)

This is the **starter setup only**. The folders, routes and database schema are ready.


## Folder structure

```
backend/
├── prisma/
│   ├── schema.prisma        database tables (edit here, then run a migration)
│   └── seed.js              creates the first admin and sample data
├── src/
│   ├── server.js            starts the server
│   ├── app.js               express setup and route mounting (already done)
│   ├── lib/prisma.js        shared Prisma client
│   ├── config/              env and config helpers
│   ├── middleware/          auth.js, upload.js, validate.js, errorHandler.js
│   ├── routes/              one file per resource (URL list inside each file)
│   ├── controllers/         one file per resource (the logic)
│   └── utils/               small helpers
├── uploads/                 uploaded images (not committed to git)
├── .env.example             copy to .env
└── package.json
```

## Setup (every team member)

```bash
cd backend
npm install
cp .env.example .env          # on Windows: copy .env.example .env
# open .env and set DATABASE_URL, JWT_SECRET
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Check it works: open http://localhost:5000/api/health, it should show `{"status":"ok"}`.

Frontend: in `frontend/.env` set `VITE_API_URL=http://localhost:5000/api`.

## Who builds what (suggested split)

| Area | Files | Endpoints |
|---|---|---|
| Auth and security | `auth.*`, `middleware/auth.js`, `prisma/seed.js` | `POST /auth/login`, `GET /auth/me` |
| Menu | `menu.*` | `/menu` |
| Chefs | `chef.*` | `/chefs` |
| Orders | `order.*` | `/orders`, `PATCH /orders/:id/status` |
| Contact messages | `contact.*` | `/contact` |
| Page content | `content.*` | `/content/:page`, `/banners`, `/gallery` |
| Images | `image.*`, `middleware/upload.js` | `/images` |
| Dashboard and notifications | `admin.*` | `/admin/dashboard`, `/admin/notifications` |

The URL list for each area is written as `TODO` comments at the top of its `*.routes.js` file.

## What the frontend expects

- Login returns `{ token, admin: { name, email, role } }`. The frontend sends `Authorization: Bearer <token>`.
- Any `401` from an admin route sends the user back to the login page.
- Order status values: `new`, `preparing`, `on_the_way`, `completed`, `cancelled`.
- Contact message status values: `Unread`, `Replied`, `Resolved`.
- `GET /admin/dashboard` must return `kpis`, `revenue`, `statuses`, `recentOrders`, `recentMessages`, `topDishes`, `contentStatus`
  (see `SAMPLE_DASHBOARD` in `frontend/src/data/sampleContent.js`).
- `GET /content/home` and `/content/about` return the same shape as `SAMPLE_HOME` and `SAMPLE_ABOUT` in that file.
- Notifications: `[{ id, type: 'order' | 'message' | 'system', title, text, createdAt, read, link }]`.

## Rules

- Never commit `.env` or `node_modules`.
- Change the database only in `prisma/schema.prisma`, then run `npx prisma migrate dev --name <what-changed>` and commit the new `prisma/migrations` folder.
- Use PostgreSQL instead of MySQL: change `provider` in `schema.prisma` and `DATABASE_URL` in `.env`.
