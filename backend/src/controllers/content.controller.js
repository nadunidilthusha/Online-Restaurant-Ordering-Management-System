import prisma from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { DEFAULT_HOME, DEFAULT_ABOUT } from '../data/defaultContent.js';
import { CONTENT_SCHEMAS, firstIssue } from '../validators/content.schema.js';

const DEFAULTS = { home: DEFAULT_HOME, about: DEFAULT_ABOUT };

const checkPage = (page) => {
  if (!Object.hasOwn(DEFAULTS, page)) throw new HttpError(404, 'Unknown page. Use "home" or "about"');
  return page;
};

// ---------------------------------------------------------------
// Image links
// Uploaded images are saved as "/uploads/<file>". A page running on another address
// (the React app on port 5173) cannot load that, so:
//   - when we SEND content, "/uploads/x.jpg" becomes "http://localhost:5000/uploads/x.jpg"
//   - when we SAVE content, our own full address is turned back into "/uploads/x.jpg"
//     (so saved content still works after the server address changes)
// ---------------------------------------------------------------
const IMAGE_KEYS = new Set(['image', 'photo', 'img', 'founderPhoto']);

const mapImages = (value, fn, key) => {
  if (typeof value === 'string') return IMAGE_KEYS.has(key) ? fn(value) : value;
  if (Array.isArray(value)) return value.map((v) => mapImages(v, fn, key));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapImages(v, fn, k)]));
  }
  return value;
};

const requestBase = (req) => `${req.protocol}://${req.get('host')}`;
const apiBase = (req) => (process.env.PUBLIC_API_URL || requestBase(req)).replace(/\/+$/, '');

const toFullUrls = (data, req) => {
  const base = apiBase(req);
  return mapImages(data, (s) => (s.startsWith('/uploads/') ? base + s : s));
};

const toStoredUrls = (data, req) => {
  const ours = [apiBase(req), requestBase(req)];
  return mapImages(data, (s) => {
    for (const o of ours) if (s.startsWith(`${o}/uploads/`)) return s.slice(o.length);
    return s;
  });
};

// ---------------------------------------------------------------

// reads a page from the database; creates it from the defaults the very first time
const loadPage = async (page) => {
  const row = await prisma.content.findUnique({ where: { page } });
  if (row) return row.data;
  const created = await prisma.content.upsert({
    where: { page },
    update: {},
    create: { page, data: DEFAULTS[page] },
  });
  return created.data;
};

// GET /api/content/:page   (public: used by the customer Home and About pages)
export const getContent = async (req, res) => {
  const page = checkPage(req.params.page);
  res.json(toFullUrls(await loadPage(page), req));
};

// PUT /api/content/:page   (admin: used by Home management and About management)
export const saveContent = async (req, res) => {
  const page = checkPage(req.params.page);
  const result = CONTENT_SCHEMAS[page].safeParse(req.body);
  if (!result.success) throw new HttpError(400, firstIssue(result.error));

  const data = toStoredUrls(result.data, req);
  const saved = await prisma.content.upsert({
    where: { page },
    update: { data },
    create: { page, data },
  });
  res.json(toFullUrls(saved.data, req));
};

// GET /api/banners   (public: only the banners switched on)
export const getBanners = async (req, res) => {
  const home = toFullUrls(await loadPage('home'), req);
  res.json((home.banners || []).filter((b) => b.active !== false));
};

// GET /api/gallery   (public)
export const getGallery = async (req, res) => {
  const about = toFullUrls(await loadPage('about'), req);
  res.json(about.gallery || []);
};
