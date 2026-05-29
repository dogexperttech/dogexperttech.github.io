# Dog Expert Tech - Astro Website

A full-featured Astro website built from the original archive folder. This is a modern, responsive website with a professional design featuring dark mode support.

## Features

✨ **Modern Design**
- Clean, professional UI with dark mode support
- Responsive design that works on all devices
- Smooth animations and transitions
- Beautiful color scheme with teal and red accents

🎨 **Pages**
- **Home** - Welcome page with video content and social links
- **About** - Personal bio with device gallery
- **Contact** - Contact form with Formspree integration
- **Blog** - Blog post listing with cards
- **Gallery** - Wallpaper gallery with lightbox viewer
- **Files** - File downloads with table interface
- **Software** - Software recommendations with links

🌙 **Dark Mode**
- Toggle between light and dark themes
- Preferences saved to localStorage
- Optimized colors for both themes

📱 **Responsive**
- Mobile-first design
- Works on all screen sizes
- Touch-friendly interface

## File Structure

```
src/
├── layouts/
│   └── Layout.astro          # Main layout template with navigation
├── pages/
│   ├── index.astro           # Home page
│   ├── about.astro           # About page
│   ├── contact.astro         # Contact page
│   ├── blog.astro            # Blog page
│   ├── gallery.astro         # Gallery page
│   ├── files.astro           # Files page
│   └── software.astro        # Software page
└── assets/                    # Static assets
```

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Configuration

### Customization

- **Colors:** Edit the color variables in `src/layouts/Layout.astro`
- **Navigation:** Update the nav links in the Layout component
- **Contact Form:** Update the Formspree endpoint in `src/pages/contact.astro`
- **Social Links:** Modify the `/go/` links to your actual redirect URLs

### Assets

Place your assets in:
- `/public/assets/` - Images, logos, favicon
- `/public/gallery/assets/wallpapers/` - Wallpaper images

## Features Breakdown

### Home Page
- Announcement banner with close button
- Video section with tab switcher (Streams/Videos)
- YouTube video embeds
- Social channel links

### About Page
- Personal introduction
- Device gallery with lightbox
- Click images to view full size

### Contact Page
- Email contact form (Formspree)
- Problem category selector
- Additional details textarea
- Direct email link
- Social links section

### Blog Page
- Blog card grid layout
- Hover effects and animations
- Post date display
- Responsive grid

### Gallery Page
- Wallpaper grid gallery
- Lightbox viewer on click
- Keyboard navigation (ESC to close)
- Responsive grid layout

### Files Page
- File listing table
- Download buttons
- File categories and sizes
- Social links

### Software Page
- Software recommendation cards
- Category badges
- External links
- Hover animations

## Styling

### Color Scheme
- **Primary:** #005f73 (Teal)
- **Accent:** #ff0000 (Red)
- **Dark:** #121212 (Very dark gray)
- **Light:** #f9f9f9 (Off white)

### Theme System
The website automatically respects the user's system theme preference and allows manual toggling via the theme button in the navbar.

## Scripts

All scripts are included inline in components:
- **Theme toggle** - Saves preference to localStorage
- **Tab switching** - Used on home page for video categories
- **Gallery lightbox** - Simple JavaScript lightbox for images
- **Form handling** - Integrated with Formspree for submissions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- **Static generation** - Pages are pre-rendered as static HTML
- **Optimized images** - Support for modern image formats
- **Fast load times** - No JavaScript frameworks overhead
- **SEO friendly** - Proper HTML semantics and meta tags

## Future Enhancements

- [ ] Add RSS feed
- [ ] Implement search functionality
- [ ] Add blog post individual pages
- [ ] Create admin panel for content management
- [ ] Add comments section
- [ ] Implement analytics

## License

Built with [Astro](https://astro.build/)

## Support

For issues or questions, contact: dog.expert900@gmail.com
