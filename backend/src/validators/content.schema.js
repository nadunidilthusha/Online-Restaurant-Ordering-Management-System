import { z } from 'zod';

// ---------- small building blocks ----------
const text = (max = 2000) => z.string().max(max, `Must be at most ${max} characters`);
const id = z.union([z.string(), z.number()]);

// links used in <a href>: only site paths, http(s), mailto, tel or "#" (blocks javascript: links)
const link = z
  .string()
  .max(500)
  .refine((v) => v === '' || /^(\/|#|https?:\/\/|mailto:|tel:)/i.test(v), 'Link must start with /, http://, https://, mailto: or tel:');

// image urls: empty, a site path, or http(s). blob: urls (local previews) are refused
const image = z
  .string()
  .max(2000)
  .refine((v) => !/^blob:/i.test(v), 'Image was not uploaded to the server. Please upload it again')
  .refine((v) => v === '' || /^(\/|https?:\/\/)/i.test(v), 'Image must be an uploaded file or an http(s) link');

const year = z
  .union([z.string(), z.number()])
  .transform(String)
  .refine((v) => /^\d{0,4}$/.test(v), 'Year must be up to 4 digits');

const emailOrEmpty = z
  .string()
  .max(200)
  .refine((v) => v === '' || /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v), 'Enter a valid email address');

const phoneOrEmpty = z
  .string()
  .max(30)
  .refine((v) => v === '' || /^\+?[\d\s-]{7,25}$/.test(v), 'Phone must contain 7 or more digits (numbers, spaces, one + at the start)');

const num = (min, max, label) =>
  z.preprocess(
    (v) => (v === '' || v === null ? undefined : v),
    z.coerce.number({ error: `${label} must be a number` }).min(min, `${label} must be at least ${min}`).max(max, `${label} must be at most ${max}`)
  );

const time = z.string().refine((v) => v === '' || /^([01]\d|2[0-3]):[0-5]\d$/.test(v), 'Time must look like 09:30');

// ---------- HOME ----------
export const homeSchema = z.looseObject({
  promo: z.looseObject({ text: text(200), visible: z.boolean() }),
  hero: z.looseObject({
    headline: text(200).min(1, 'Headline is required'),
    highlight: text(200),
    subtext: text(600),
    primaryLabel: text(40),
    primaryLink: link,
    secondaryLabel: text(40),
    secondaryLink: link,
    image,
  }),
  stats: z.looseObject({
    years: num(0, 1000, 'Years'),
    dishes: num(0, 100000, 'Dishes'),
    diners: num(0, 100000000, 'Diners'),
    rating: num(0, 5, 'Rating'),
  }),
  banners: z
    .array(
      z.looseObject({
        id,
        title: text(120).min(1, 'Banner title is required'),
        description: text(400),
        link,
        active: z.boolean(),
        image,
      })
    )
    .max(20, 'At most 20 banners'),
  featured: z
    .array(
      z.looseObject({
        id,
        name: text(120).min(1, 'Dish name is required'),
        price: num(0, 10000000, 'Price'),
        category: text(60).optional(),
        tag: text(40).optional(),
        description: text(400).optional(),
        image,
        visible: z.boolean(),
      })
    )
    .max(100, 'At most 100 featured dishes'),
});

// ---------- ABOUT ----------
export const aboutSchema = z.looseObject({
  header: z.looseObject({ title: text(200).min(1, 'Title is required'), intro: text(600) }),
  history: z.looseObject({
    photo: image,
    foundedYear: year,
    items: z
      .array(z.looseObject({ id, year, title: text(120), text: text(500) }))
      .max(30, 'At most 30 milestones'),
  }),
  mission: z.looseObject({
    quote: text(400),
    story: text(3000),
    photo: image,
    founderName: text(120),
    founderTitle: text(120),
    founderPhoto: image,
    values: z
      .array(z.looseObject({ id, icon: text(16), title: text(120), text: text(500) }))
      .max(12, 'At most 12 values'),
  }),
  visit: z.looseObject({
    address: text(300),
    phone: phoneOrEmpty,
    email: emailOrEmpty,
    lat: num(-90, 90, 'Latitude'),
    lng: num(-180, 180, 'Longitude'),
    hours: z
      .array(z.looseObject({ day: text(20), open: time, close: time, closed: z.boolean() }))
      .max(7, 'At most 7 days'),
  }),
  gallery: z
    .array(z.looseObject({ id, img: image, caption: text(200) }))
    .max(60, 'At most 60 gallery photos'),
});

export const CONTENT_SCHEMAS = { home: homeSchema, about: aboutSchema };

// turns a zod error into one readable sentence, e.g. "visit.email: Enter a valid email address"
export const firstIssue = (error) => {
  const i = error.issues[0];
  const where = i.path.length ? `${i.path.join('.')}: ` : '';
  return `${where}${i.message}`;
};
