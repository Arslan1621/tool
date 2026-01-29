import { useState } from "react";
import { useDomains, useRunScan } from "@/hooks/use-domains";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Globe, Zap, Shield, FileCode, Unplug, Activity, Search, Infinity } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user } = useUser();
  const [url, setUrl] = useState("");
  const [tools, setTools] = useState({
    redirect: true,
    broken_links: true,
    security: true,
    robots: true,
    ai: true,
    whois: true,
  });

  const { data: recentScans } = useDomains();
  const { mutate: runScan, isPending } = useRunScan();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const selectedTools = Object.entries(tools)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key) as ("redirect" | "broken_links" | "security" | "robots" | "ai" | "whois")[];

    if (selectedTools.length === 0) return;

    runScan({ url: cleanUrl, tools: selectedTools });
  };

  const toolsList = [
    { key: "redirect", icon: <Zap className="w-5 h-5 text-amber-500" />, label: "Redirect Checker", description: "Trace redirect chains and detect loops", href: "/redirect-checker" },
    { key: "broken_links", icon: <Unplug className="w-5 h-5 text-emerald-500" />, label: "Broken Link Finder", description: "Scan pages for 404 errors", href: "/broken-links" },
    { key: "security", icon: <Shield className="w-5 h-5 text-purple-500" />, label: "Security Audit", description: "Verify SSL, HSTS, CSP headers", href: "/security-checker" },
    { key: "robots", icon: <FileCode className="w-5 h-5 text-blue-500" />, label: "Robots.txt Validator", description: "Validate robots.txt file", href: "/robots-txt" },
    { key: "whois", icon: <Globe className="w-5 h-5 text-indigo-500" />, label: "WHOIS Lookup", description: "Domain registration details", href: "/whois-checker" },
    { key: "ai", icon: <Search className="w-5 h-5 text-rose-500" />, label: "AI Summary & SEO", description: "AI-generated insights and recommendations" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-b from-primary/5 to-background pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display">
                Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
              </h1>
              <p className="text-muted-foreground mt-1">Your SEO toolkit with unlimited access</p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Infinity className="w-5 h-5" />
              <span className="font-semibold">Unlimited Usage</span>
            </div>
          </div>

          <Card className="shadow-lg border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input 
                      placeholder="Enter domain (e.g., example.com)" 
                      className="pl-10 h-12"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      data-testid="input-domain-url"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    disabled={isPending}
                    className="h-12 px-8"
                    data-testid="button-analyze"
                  >
                    {isPending ? "Scanning..." : "Analyze Site"}
                    {!isPending && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  {toolsList.map((tool) => (
                    <label key={tool.key} className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox 
                        checked={tools[tool.key as keyof typeof tools]}
                        onCheckedChange={(c) => setTools(prev => ({ ...prev, [tool.key]: c === true }))}
                        data-testid={`checkbox-${tool.key}`}
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tool.label}
                      </span>
                    </label>
                  ))}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold font-display mb-4">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolsList.map((tool) => (
              <ToolCard key={tool.key} tool={tool} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold font-display">Your Recent Analyses</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentScans?.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-muted/50 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground">No recent scans found. Start by analyzing a URL above.</p>
              </div>
            ) : (
              recentScans?.map((domain) => (
                <div 
                  key={domain.id} 
                  onClick={() => setLocation(`/${domain.domain}`)}
                  className="group bg-card hover:bg-accent/5 rounded-xl p-5 border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer"
                  data-testid={`card-scan-${domain.id}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {domain.domain}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {domain.lastScannedAt ? formatDistanceToNow(new Date(domain.lastScannedAt)) + ' ago' : 'Just now'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {domain.redirectData && <Badge>Redirects</Badge>}
                    {domain.securityData && <Badge>Security</Badge>}
                    {domain.brokenLinksData && <Badge>Links</Badge>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: { key: string; icon: React.ReactNode; label: string; description: string; href?: string } }) {
  const content = (
    <Card className="hover:border-primary/50 transition-all cursor-pointer group h-full">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-background border border-border flex items-center justify-center shrink-0">
            {tool.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold group-hover:text-primary transition-colors">{tool.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (tool.href) {
    return (
      <Link href={tool.href} data-testid={`link-tool-${tool.key}`}>
        {content}
      </Link>
    );
  }

  return content;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
}
