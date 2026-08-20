import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://corvix-pi.vercel.app";

  const lastModified = "2026-08-20";

  // Static routes
  const routes = ["", "/about", "/services", "/portfolio", "/contact", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Austin location hub routes
  const austinRoutes = [
    "/locations/austin-tx",
    "/locations/austin-tx/web-development",
    "/locations/austin-tx/ai-development",
    "/locations/austin-tx/mobile-app-development",
    "/locations/austin-tx/business-setup",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic service routes
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...austinRoutes, ...serviceRoutes, ...blogRoutes];
}
