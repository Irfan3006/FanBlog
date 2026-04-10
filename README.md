# FanBlog: Modern Astro SSR Blog

**FanBlog** is a high-performance, SEO-optimized blog platform built using **Astro SSR** and a file-based CMS.

## Key Features

- **Astro SSR**: Fast server-side rendering with the Vercel adapter.
- **File-based CMS**: No database required. Posts are stored as Markdown files in `/content/posts`.
- **Admin Dashboard**: Secure `/admin` panel to create, edit, and delete posts.
- **Auto OG Image**: Dynamic Open Graph images generated via Satori for every post.
- **Advanced SEO**: JSON-LD Schema.org, sitemap.xml, robots.txt, and optimized meta tags.
- **Modern UI**: Clean, minimal design with a smooth dark/light mode toggle.
- **Taxonomy**: Clickable categories, hashtags, and detailed author profiles.
- **Image Support**: Easy featured image and in-post image uploads.

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Styling**: Vanilla CSS (Modern custom properties)
- **Utilities**: Satori (OG Images), Marked (Markdown parsing), Slugify.

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```

### 3. Environment Variables
Create a `.env` file in the root:
```env
ADMIN_PASSWORD=your_password
```

## Deployment to Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add the `ADMIN_PASSWORD` environment variable in the Vercel dashboard.
4. Deploy!

---
Built by <a href="https://irfan-syarifudin.vercel.app/" target="_blank">Irfan Syarifudin</a>.
