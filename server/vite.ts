import type { Express, Request, Response } from "express";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app: Express): Promise<void> {
  // Proxy all requests to the Vite dev server
  app.use(
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
    })
  );
}

export function serveStatic(app: Express): void {
  const clientDist = path.resolve(__dirname, "../client/dist");
  app.use(express.static(clientDist));
  
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

export function log(message: string): void {
  console.log(`[Server] ${message}`);
}
