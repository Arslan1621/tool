import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url );
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
(async () => {
  await registerRoutes(httpServer, app );

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app );
  }

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // ONLY start the server if we are NOT on Vercel
  if (!process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(port, "0.0.0.0", ( ) => {
      console.log(`serving on port ${port}`);
    });
  }
})();

// IMPORTANT: Export the app for Vercel
export default app;
