import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPostData {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
}

const blogPosts: Record<string, BlogPostData> = {
  "understanding-redirect-chains": {
    id: 1,
    title: "Understanding Redirect Chains and Their Impact on SEO",
    description: "Learn how redirect chains can affect your website's SEO performance and how to identify and fix them.",
    category: "SEO",
    date: "Jan 25, 2026",
    readTime: "5 min read",
    author: "WebTools Team",
    content: [
      "## What Are Redirect Chains?",
      "A redirect chain occurs when there are multiple redirects between the initial URL and the final destination. For example, if URL A redirects to URL B, which then redirects to URL C, you have a redirect chain with two hops. While a single redirect is often necessary and harmless, chains of multiple redirects can cause significant problems for both users and search engines.",
      "Redirect chains commonly form over time as websites evolve. A page might be moved once, creating a redirect. Later, it's moved again, and instead of updating the original redirect, a new one is added. Before you know it, you have a chain of three, four, or even more redirects.",
      "## Why Redirect Chains Hurt SEO",
      "### 1. PageRank Dilution",
      "Each redirect in a chain causes a small loss of PageRank (link equity). While Google has stated that 301 redirects pass most PageRank, 'most' isn't 'all.' When you have multiple redirects, these small losses compound. A chain of four redirects could result in noticeable ranking power loss.",
      "### 2. Slower Page Load Times",
      "Every redirect adds latency. Each hop requires a new HTTP request, DNS lookup, and server response. For users on slow connections or mobile devices, this delay is magnified. Since page speed is a ranking factor, slow redirects can indirectly hurt your rankings.",
      "### 3. Crawl Budget Waste",
      "Search engine bots have a limited 'crawl budget' for each site. When Googlebot encounters a redirect chain, it must follow each hop, using up valuable crawl resources. This means fewer of your important pages get crawled and indexed.",
      "### 4. User Experience Issues",
      "Long redirect chains increase the chance of errors. If any link in the chain breaks, users hit a dead end. Mobile users and those with unstable connections may experience timeouts before reaching the final destination.",
      "## How to Identify Redirect Chains",
      "Use our Redirect Checker tool to trace the complete path any URL takes. Simply enter a URL, and we'll show you every hop in the chain, including the HTTP status codes at each step. Look for:",
      "- **Multiple 301/302 responses** before reaching a 200 OK",
      "- **Mixed redirect types** (301s mixed with 302s or 307s)",
      "- **HTTP to HTTPS hops** that could be consolidated",
      "- **WWW to non-WWW redirects** (or vice versa)",
      "## How to Fix Redirect Chains",
      "### Step 1: Map Your Redirects",
      "Before making changes, document all your current redirects. Create a spreadsheet with the source URL, destination URL, and redirect type for each rule.",
      "### Step 2: Update to Point Directly to Final Destination",
      "For each redirect in a chain, update it to point directly to the final destination URL. If A → B → C, change A to redirect directly to C, then remove or update the B → C redirect.",
      "### Step 3: Use 301 for Permanent Moves",
      "Ensure all permanent URL changes use 301 redirects. Reserve 302s only for genuinely temporary redirects (like during A/B testing or maintenance).",
      "### Step 4: Consolidate HTTP/HTTPS and WWW Redirects",
      "Handle protocol and subdomain normalization in a single hop. Your server should redirect HTTP non-WWW directly to HTTPS WWW (or your preferred canonical form) in one step.",
      "### Step 5: Update Internal Links",
      "After fixing redirects, update your internal links to point to the final URLs. This eliminates the need for redirects entirely for internal navigation.",
      "## Best Practices Going Forward",
      "- **Audit redirects quarterly** using automated tools",
      "- **Document all URL changes** with their redirect rules",
      "- **Update links proactively** when moving content",
      "- **Monitor server logs** for redirect chain patterns",
      "- **Use relative URLs** for internal links when possible",
      "By keeping your redirect chains short (ideally one hop or none), you'll maintain your SEO value, provide faster page loads, and ensure a better experience for both users and search engines."
    ]
  },
  "essential-security-headers": {
    id: 2,
    title: "Essential Security Headers Every Website Should Have",
    description: "A comprehensive guide to implementing security headers like HSTS, CSP, and X-Frame-Options.",
    category: "Security",
    date: "Jan 20, 2026",
    readTime: "8 min read",
    author: "WebTools Team",
    content: [
      "## Introduction to Security Headers",
      "Security headers are HTTP response headers that tell browsers how to behave when handling your website's content. They're one of the most effective and easiest ways to protect your site against common web attacks like cross-site scripting (XSS), clickjacking, and data injection.",
      "Despite their importance, many websites still don't implement basic security headers. According to recent studies, over 90% of websites are missing at least one critical security header. This guide will help you understand and implement the essential headers your site needs.",
      "## The Essential Security Headers",
      "### 1. HTTP Strict Transport Security (HSTS)",
      "HSTS forces browsers to only connect to your site using HTTPS, even if a user types 'http://' or clicks an HTTP link. This prevents man-in-the-middle attacks and SSL stripping.",
      "**Recommended Value:**",
      "```\nStrict-Transport-Security: max-age=31536000; includeSubDomains; preload\n```",
      "- **max-age**: How long (in seconds) browsers should remember to use HTTPS",
      "- **includeSubDomains**: Applies the rule to all subdomains",
      "- **preload**: Allows inclusion in browser preload lists",
      "**Warning:** Only enable HSTS after ensuring all your content works over HTTPS. Once enabled, browsers will refuse HTTP connections for the specified duration.",
      "### 2. Content Security Policy (CSP)",
      "CSP is your primary defense against XSS attacks. It specifies which sources of content are allowed to load, effectively blocking malicious injected scripts.",
      "**Basic Example:**",
      "```\nContent-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' 'unsafe-inline'\n```",
      "Start with a restrictive policy and gradually loosen it as needed. Use report-uri or report-to directives to monitor violations before enforcing.",
      "**Key Directives:**",
      "- **default-src**: Fallback for unspecified resource types",
      "- **script-src**: Allowed JavaScript sources",
      "- **style-src**: Allowed CSS sources",
      "- **img-src**: Allowed image sources",
      "- **connect-src**: Allowed AJAX/WebSocket endpoints",
      "### 3. X-Frame-Options",
      "This header prevents your site from being embedded in iframes on other domains, protecting against clickjacking attacks where attackers overlay invisible frames to trick users.",
      "**Options:**",
      "```\nX-Frame-Options: DENY\n```",
      "- **DENY**: Page cannot be displayed in a frame",
      "- **SAMEORIGIN**: Page can only be framed by pages on the same origin",
      "Note: The newer CSP frame-ancestors directive provides more control, but X-Frame-Options is still needed for older browsers.",
      "### 4. X-Content-Type-Options",
      "This header prevents browsers from MIME-sniffing a response away from the declared content-type. Without it, browsers might incorrectly interpret files as executable scripts.",
      "**Always Use:**",
      "```\nX-Content-Type-Options: nosniff\n```",
      "This single directive tells browsers to trust your declared content types and not guess.",
      "### 5. Referrer-Policy",
      "Controls how much referrer information is sent when navigating from your site. This protects user privacy and prevents sensitive URL information from leaking.",
      "**Recommended Value:**",
      "```\nReferrer-Policy: strict-origin-when-cross-origin\n```",
      "This sends the full referrer for same-origin requests, but only the origin (domain) for cross-origin requests. No referrer is sent when going from HTTPS to HTTP.",
      "### 6. Permissions-Policy (formerly Feature-Policy)",
      "Allows you to control which browser features and APIs can be used on your site. This limits the attack surface by disabling features you don't need.",
      "**Example:**",
      "```\nPermissions-Policy: geolocation=(), camera=(), microphone=(), payment=()\n```",
      "This disables geolocation, camera, microphone, and payment APIs entirely. Only enable features your site actually uses.",
      "## Implementing Security Headers",
      "### Apache (.htaccess)",
      "```\nHeader set Strict-Transport-Security \"max-age=31536000; includeSubDomains\"\nHeader set Content-Security-Policy \"default-src 'self'\"\nHeader set X-Frame-Options \"DENY\"\nHeader set X-Content-Type-Options \"nosniff\"\nHeader set Referrer-Policy \"strict-origin-when-cross-origin\"\n```",
      "### Nginx",
      "```\nadd_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\nadd_header Content-Security-Policy \"default-src 'self'\" always;\nadd_header X-Frame-Options \"DENY\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;\nadd_header Referrer-Policy \"strict-origin-when-cross-origin\" always;\n```",
      "### Express.js (using Helmet)",
      "```javascript\nconst helmet = require('helmet');\napp.use(helmet());\n```",
      "Helmet sets sensible defaults for all security headers with minimal configuration.",
      "## Testing Your Headers",
      "Use our Security Header Checker tool to scan your website and get a detailed report of which headers are present, missing, or misconfigured. Regular audits ensure your security posture remains strong as your site evolves.",
      "## Conclusion",
      "Security headers are a critical layer of defense that every website should implement. Start with the basics—HSTS, X-Content-Type-Options, and X-Frame-Options—then gradually add CSP and other headers. Use report-only modes to test before enforcing, and regularly audit your configuration."
    ]
  },
  "effective-robots-txt": {
    id: 3,
    title: "How to Write an Effective robots.txt File",
    description: "Best practices for creating and maintaining your robots.txt file for optimal search engine crawling.",
    category: "Technical SEO",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    author: "WebTools Team",
    content: [
      "## What is robots.txt?",
      "The robots.txt file is a simple text file placed at the root of your website (example.com/robots.txt) that provides instructions to web crawlers about which parts of your site they should and shouldn't access. It's part of the Robots Exclusion Protocol, a standard that's been in use since 1994.",
      "While robots.txt is not a security mechanism (it's just a suggestion that good bots follow), it's an essential tool for managing your crawl budget and ensuring search engines focus on your most important content.",
      "## Basic robots.txt Syntax",
      "A robots.txt file consists of one or more 'records' that specify rules for different user agents (crawlers). Here's the basic structure:",
      "```\nUser-agent: *\nDisallow: /private/\nAllow: /private/public-page/\n\nSitemap: https://example.com/sitemap.xml\n```",
      "**Key Directives:**",
      "- **User-agent**: Specifies which crawler the rules apply to (* means all)",
      "- **Disallow**: Paths that should not be crawled",
      "- **Allow**: Exceptions to Disallow rules (useful for allowing specific pages within blocked directories)",
      "- **Sitemap**: Location of your XML sitemap(s)",
      "## Common Use Cases",
      "### Blocking Admin Areas",
      "```\nUser-agent: *\nDisallow: /admin/\nDisallow: /wp-admin/\nDisallow: /dashboard/\n```",
      "Keep administrative areas out of search results. Note: This doesn't secure them—use proper authentication for that.",
      "### Blocking Duplicate Content",
      "```\nUser-agent: *\nDisallow: /*?*\nDisallow: /print/\nDisallow: /amp/\n```",
      "Prevent crawlers from indexing URL parameters, print versions, and AMP pages that duplicate your main content.",
      "### Blocking Resource-Heavy Paths",
      "```\nUser-agent: *\nDisallow: /search/\nDisallow: /filter/\nDisallow: /sort/\n```",
      "Search result pages and filtered views can create infinite crawl paths. Block them to preserve crawl budget.",
      "### Targeting Specific Bots",
      "```\nUser-agent: Googlebot\nDisallow: /private-for-google/\n\nUser-agent: Bingbot\nDisallow: /private-for-bing/\n\nUser-agent: *\nDisallow: /private/\n```",
      "You can set different rules for different search engines, though this is rarely necessary.",
      "## Common Mistakes to Avoid",
      "### 1. Blocking CSS and JavaScript",
      "```\n# DON'T DO THIS\nDisallow: /css/\nDisallow: /js/\n```",
      "Modern search engines need to render your pages to understand them. Blocking CSS and JS prevents proper rendering and can hurt your rankings.",
      "### 2. Using robots.txt for Security",
      "Robots.txt is public—anyone can read it. Never use it to hide sensitive pages. Malicious bots will ignore it anyway. Use authentication and access controls instead.",
      "### 3. Blocking Your Sitemap",
      "```\n# DON'T DO THIS\nDisallow: /sitemap.xml\n```",
      "Your sitemap should always be accessible to crawlers. It helps them discover your content efficiently.",
      "### 4. Forgetting the Trailing Slash",
      "```\n# This blocks /admin and all subpaths\nDisallow: /admin/\n\n# This only blocks the literal path /admin\nDisallow: /admin\n```",
      "Include the trailing slash when you want to block entire directories.",
      "### 5. Blocking Everything Accidentally",
      "```\n# This blocks your entire site!\nUser-agent: *\nDisallow: /\n```",
      "Only use this for staging sites or when you genuinely want no indexing. A misplaced forward slash can deindex your entire site.",
      "## Best Practices",
      "### Always Include Your Sitemap",
      "```\nSitemap: https://example.com/sitemap.xml\nSitemap: https://example.com/sitemap-posts.xml\nSitemap: https://example.com/sitemap-products.xml\n```",
      "Place sitemap declarations at the end of your file. You can list multiple sitemaps.",
      "### Use Specific Over General Rules",
      "Be as specific as possible with your Disallow rules. Instead of blocking an entire directory, block only what you need to.",
      "### Test Before Deploying",
      "Use Google Search Console's robots.txt tester or our Robots.txt Validator to verify your rules work as expected before going live.",
      "### Keep It Simple",
      "Overly complex robots.txt files are hard to maintain and easy to mess up. If your file is getting complicated, consider whether you need all those rules.",
      "### Document Your Changes",
      "Add comments to explain why certain rules exist:",
      "```\n# Block internal search results to save crawl budget\nDisallow: /search/\n\n# Block user-generated content pending review\nDisallow: /user-uploads/pending/\n```",
      "## Testing Your robots.txt",
      "Use our Robots.txt Validator tool to check your file for syntax errors, contradicting rules, and potential issues. Regular validation ensures your crawl instructions stay effective as your site evolves."
    ]
  },
  "whois-lookup-guide": {
    id: 4,
    title: "WHOIS Lookup: What Information Can You Find?",
    description: "Explore what WHOIS data reveals about domain ownership and how to use it for research.",
    category: "Domains",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    author: "WebTools Team",
    content: [
      "## What is WHOIS?",
      "WHOIS (pronounced 'who is') is a query-and-response protocol used to look up information about registered domain names. When someone registers a domain, they're required to provide contact information that becomes part of the WHOIS database. This system has been around since the early days of the internet, originally created to help identify network administrators.",
      "Today, WHOIS remains an essential tool for researchers, journalists, security professionals, and anyone who needs to verify domain ownership or investigate online entities.",
      "## What Information Does WHOIS Provide?",
      "A typical WHOIS record contains several categories of information:",
      "### Registrar Information",
      "- **Registrar Name**: The company through which the domain was registered (e.g., GoDaddy, Namecheap, Google Domains)",
      "- **Registrar URL**: The registrar's website",
      "- **Registrar WHOIS Server**: Where to query for more detailed information",
      "- **Registrar Abuse Contact**: Email and phone for reporting abuse",
      "### Domain Dates",
      "- **Creation Date**: When the domain was first registered",
      "- **Updated Date**: When the record was last modified",
      "- **Expiration Date**: When the registration expires",
      "These dates can reveal a lot. Old domains (10+ years) often indicate established, trustworthy organizations. Very new domains might warrant extra scrutiny, especially if they're impersonating established brands.",
      "### Registrant Information",
      "- **Registrant Name**: The person or organization that owns the domain",
      "- **Registrant Organization**: The company or entity behind the registration",
      "- **Registrant Address**: Street address, city, state/province, postal code, country",
      "- **Registrant Email**: Contact email for the domain owner",
      "- **Registrant Phone**: Contact phone number",
      "Note: Much of this information may be hidden by privacy services (see below).",
      "### Technical Information",
      "- **Name Servers**: The DNS servers that handle the domain's DNS records",
      "- **DNSSEC**: Whether DNS Security Extensions are enabled",
      "- **Domain Status**: Current state of the domain (active, locked, pending, etc.)",
      "## Understanding Domain Status Codes",
      "Domain status codes tell you about the domain's current state:",
      "- **clientTransferProhibited**: Domain cannot be transferred (owner has locked it)",
      "- **clientDeleteProhibited**: Domain cannot be deleted",
      "- **clientUpdateProhibited**: Domain records cannot be updated",
      "- **serverHold**: Registrar has suspended the domain",
      "- **pendingDelete**: Domain is scheduled for deletion",
      "- **redemptionPeriod**: Domain has expired but can still be renewed (usually at a premium)",
      "A domain with multiple 'Prohibited' statuses is well-protected against unauthorized changes—a good sign for legitimate businesses.",
      "## WHOIS Privacy Protection",
      "Many domain owners use WHOIS privacy services to hide their personal information. When privacy is enabled, you'll see the privacy service's contact details instead of the actual owner's.",
      "**Why People Use Privacy:**",
      "- Prevent spam to personal email addresses",
      "- Avoid unsolicited sales calls",
      "- Protect against identity theft",
      "- Maintain personal privacy for side projects",
      "**Privacy is not necessarily suspicious.** Many legitimate websites use it. However, scam sites also use privacy to hide their operators, so it's one factor among many to consider.",
      "## Practical Uses for WHOIS",
      "### Verifying Business Legitimacy",
      "Before doing business with an unfamiliar company, check their domain's WHOIS. Look for:",
      "- Registration date (established companies have older domains)",
      "- Registrant organization matching the company name",
      "- Contact information that seems legitimate",
      "### Investigating Suspicious Emails",
      "When you receive a suspicious email claiming to be from a company, check the sender domain's WHOIS. Phishing domains are often:",
      "- Registered very recently (days or weeks old)",
      "- Using privacy protection",
      "- Registered through budget registrars known for lax policies",
      "### Finding Domain Owners",
      "Journalists and researchers use WHOIS to identify who's behind websites publishing certain content. While privacy services complicate this, WHOIS is still a starting point.",
      "### Monitoring Competitor Domains",
      "Check when competitor domains expire. Monitor for new domain registrations that might indicate upcoming products or campaigns.",
      "### Checking Domain Availability",
      "Before trying to buy a domain, check its WHOIS. You'll see if it's already registered, when it might expire, and who to contact about purchasing it.",
      "## Limitations of WHOIS",
      "- **Privacy services** hide real owner information",
      "- **GDPR regulations** have reduced the amount of data shown for many European domains",
      "- **Rate limiting** prevents mass queries",
      "- **Some TLDs** (like .gov) don't provide public WHOIS",
      "- **Information may be outdated** if owners don't update their records",
      "## Try It Yourself",
      "Use our WHOIS Lookup tool to explore domain registration data. Enter any domain name and instantly see its registration details, dates, name servers, and more."
    ]
  }
};

const slugMap: Record<number, string> = {
  1: "understanding-redirect-chains",
  2: "essential-security-headers",
  3: "effective-robots-txt",
  4: "whois-lookup-guide"
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative overflow-hidden bg-black text-white pb-24 pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-slate-300 hover:text-white" data-testid="button-back-to-blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {post.category}
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-slate-300 text-sm"
          >
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <Card className="shadow-xl border-border overflow-hidden bg-card">
          <CardContent className="pt-8 pb-8 px-6 md:px-10">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("```")) {
                  const code = paragraph.replace(/```\w*\n?/g, "").trim();
                  return (
                    <pre key={index} className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto my-4">
                      <code className="text-sm font-mono text-foreground">{code}</code>
                    </pre>
                  );
                }
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <p key={index} className="font-semibold text-foreground my-3">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={index} className="list-disc list-inside my-2 text-muted-foreground">
                      <li>{paragraph.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>
                    </ul>
                  );
                }
                if (paragraph.startsWith("# ")) {
                  return null;
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed my-4">
                    {paragraph}
                  </p>
                );
              })}
            </article>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/blog">
            <Button variant="outline" data-testid="button-back-to-blog-bottom">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { slugMap };
