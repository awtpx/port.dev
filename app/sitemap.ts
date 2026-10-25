import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://port.awtpx.in";
  const popularUsers = ["torvalds", "shadcn", "leerob", "gaearon", "yyx990803"];

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  const profileRoutes = popularUsers.map((username) => ({
    url: `${baseUrl}/${username}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...profileRoutes];
}
