# Astro Website Customization Guide

This guide will help you customize the Dog Expert Tech Astro website to fit your needs.

## Quick Start Customizations

### 1. Change Site Title and Branding

**File:** `src/layouts/Layout.astro`

```astro
<a href="/" class="nav-left">Your Site Name</a>
```

And in the footer:
```astro
<p>&copy; 2024-2026 Your Company. All rights reserved.</p>
```

### 2. Update Navigation Links

**File:** `src/layouts/Layout.astro`

Edit the navbar links:
```astro
<ul class="nav-links">
  <li><a href="/" aria-current="page">Home</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="/your-new-page">New Page</a></li>
  <!-- Add or remove links as needed -->
</ul>
```

### 3. Change Colors

**File:** `src/layouts/Layout.astro`

Find the style section and update these variables:

```css
/* Primary colors */
color: #005f73;  /* Change teal accent */
background: #ff0000;  /* Change red accent */

/* Dark mode colors */
background: #121212;  /* Dark background */
color: #ddd;  /* Dark text */
```

### 4. Add a New Page

1. Create a new `.astro` file in `src/pages/`
2. Import the Layout:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Your Page Title">
  <h1>Welcome</h1>
  <p>Your content here</p>
</Layout>
```

3. The page will automatically be available at `/your-page/`

### 5. Update Social Media Links

**Multiple files:** `src/pages/index.astro`, `src/pages/contact.astro`, etc.

```astro
<a href="https://your-youtube-link/" class="icon-link">
  <img src="/assets/your-image.jpg" alt="Your Platform" />
  <span>Your Channel</span>
</a>
```

### 6. Customize Contact Form

**File:** `src/pages/contact.astro`

Update the Formspree endpoint:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

Get your form ID from [Formspree](https://formspree.io/)

## Content Customization

### Home Page Content

**File:** `src/pages/index.astro`

- **Banner:** Update the alert message
- **Videos:** Replace YouTube embed IDs
- **Social Links:** Update links and images

### About Page Content

**File:** `src/pages/about.astro`

- **Biography:** Edit the "What I do" section
- **Gallery:** Update image paths and captions

### Blog Page

**File:** `src/pages/blog.astro`

Add new blog posts by adding more blog cards:

```astro
<article class="blog-card">
  <a href="#post5" class="blog-link">
    <div class="blog-image" style="background-color: #666;"></div>
    <div class="blog-content">
      <h3>New Blog Title</h3>
      <p>Blog description here</p>
      <span class="blog-date">2024-01-20</span>
    </div>
  </a>
</article>
```

### Files Page

**File:** `src/pages/files.astro`

Edit the files array at the top:

```javascript
const files = [
  {
    name: "Your File Name",
    version: "1.0.0",
    size: "100 MB",
    date: "2024-01-15",
    type: "Category",
    link: "https://download-link.com"
  },
  // Add more files...
];
```

### Software Page

**File:** `src/pages/software.astro`

Edit the softwareItems array:

```javascript
const softwareItems = [
  {
    name: "Software Name",
    category: "Category",
    description: "Description here",
    link: "https://website.com"
  },
  // Add more software...
];
```

## Styling Customization

### Change Font

In `src/layouts/Layout.astro`, update the font-family:

```css
font-family: 'Your Font', sans-serif;
```

### Add Custom Fonts

Add to the `<head>` in Layout.astro:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

### Customize Button Styles

Find button styles and modify:

```css
.download-btn {
  background: #ff0000;  /* Change color */
  padding: 12px 24px;   /* Change size */
  border-radius: 8px;   /* Change roundness */
}
```

### Dark Mode Customization

All dark mode styles use `body.dark`:

```css
body.dark h1 {
  color: #94d2bd;  /* Light teal for dark mode */
}
```

## Adding Features

### 1. Add Search Functionality

Install a search library:
```bash
npm install fuse.js
```

Then implement in a page component.

### 2. Add Comments Section

Use a service like Disqus:
```astro
<script async src="https://comments.app/js/widget.js"></script>
<div id="comments-section" data-comments-app-id="YOUR_ID"></div>
```

### 3. Add Analytics

Add Google Analytics to `src/layouts/Layout.astro`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  // Your analytics code here
</script>
```

### 4. Add Newsletter Signup

Create a new component `src/components/Newsletter.astro`:

```astro
---
---
<section class="newsletter">
  <h2>Subscribe to Updates</h2>
  <form>
    <input type="email" placeholder="Your email" required />
    <button type="submit">Subscribe</button>
  </form>
</section>

<style>
  /* Your styles here */
</style>
```

Then import and use in pages:
```astro
import Newsletter from '../components/Newsletter.astro';
```

## Performance Tips

1. **Optimize Images**
   - Use WebP format where possible
   - Compress images before uploading
   - Use appropriate image sizes

2. **Lazy Load Images**
   - Add `loading="lazy"` to img tags
   - Consider using Astro's image component

3. **Minify CSS/JS**
   - Astro does this automatically in production

## SEO Optimization

1. **Add Meta Descriptions**
   ```astro
   <Layout title="Page Title" description="Your page description">
   ```

2. **Add Structured Data**
   ```html
   <script type="application/ld+json">
     {
       "@context": "https://schema.org",
       "@type": "Organization",
       "name": "Your Site"
     }
   </script>
   ```

3. **Add Social Meta Tags**
   ```html
   <meta property="og:title" content="Your Title">
   <meta property="og:description" content="Description">
   <meta property="og:image" content="Image URL">
   ```

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages
Update `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repository-name',
});
```

## Common Issues & Solutions

### Issue: Styles not applying
**Solution:** Clear browser cache and rebuild
```bash
npm run build
```

### Issue: Images not loading
**Solution:** Check image paths in public folder
```
/assets/image.jpg  (from public folder)
```

### Issue: Dark mode not working
**Solution:** Check localStorage in browser DevTools
```javascript
localStorage.getItem('theme')
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Formspree](https://formspree.io/) - Form handling
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Fonts

## Support

For help with Astro, visit the [Astro Community](https://astro.build/chat)
