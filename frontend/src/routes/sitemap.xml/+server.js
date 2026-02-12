import { getNewses } from '$lib/utils/sanity'; // Adjust the import path

export async function GET() {
    const base = 'https://modenafilmfestival.it';
    
    // 1. Fetch dynamic news data
    const newsEntries = await getNewses();

    // 2. Static pages
    const staticPages = [
        { path: '', priority: 1.0 },
        { path: 'news', priority: 0.8 },
        { path: 'festival', priority: 0.8 },
        { path: 'festival/regolamento', priority: 0.6 },
        { path: 'about', priority: 0.8 },
        { path: 'partner', priority: 0.8 },
        { path: 'partner/sponsor', priority: 0.6 },
        { path: 'sostienici', priority: 0.8 },
        { path: 'contatti', priority: 0.8 },
        { path: 'staff', priority: 0.8 },
        { path: 'privacy', priority: 0.5 },
        { path: 'cookies', priority: 0.5 }
    ];

    // 3. Construct the XML
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(({ path, priority }) => `
    <url>
        <loc>${base}/${path}</loc>
        <priority>${priority}</priority>
    </url>`).join('')}

    ${newsEntries.map((news) => `
    <url>
        <loc>${base}/news/${news.slug.current}</loc>
        <lastmod>${new Date(news.date).toISOString().split('T')[0]}</lastmod>
        <priority>0.7</priority>
    </url>`).join('')}
</urlset>`.trim();

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
            // Optional: Cache sitemap for 1 hour to reduce Sanity API hits
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}