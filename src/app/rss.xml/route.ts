import { getBlogPostList } from "../../helpers/file-helpers";
import { BLOG_TITLE } from "../../constants.js";

interface BlogPost {
  slug: string;
  title: string;
  abstract: string;
  publishedOn: string;
}

// Function to escape XML entities
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const blogPosts = (await getBlogPostList()) as BlogPost[];

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(BLOG_TITLE)}</title>
        <link>http://localhost:3000</link>
        <description>A blog about web development, JavaScript, React, and more.</description>
        <language>en-US</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="http://localhost:3000/rss.xml" rel="self" type="application/rss+xml" />
        ${blogPosts
          .map(
            (post) => `
        <item>
        <title>${escapeXml(post.title)}</title>
        <link>http://localhost:3000/${post.slug}</link>
        <guid>http://localhost:3000/${post.slug}</guid>
        <pubDate>${new Date(post.publishedOn).toUTCString()}</pubDate>
        <description><![CDATA[${post.abstract}]]></description>
        </item>`
          )
          .join("")}
    </channel>
    </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
