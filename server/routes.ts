import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBracketSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/brackets", async (_req, res) => {
    try {
      const brackets = await storage.getBrackets();
      res.json(brackets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch brackets" });
    }
  });

  app.post("/api/brackets", async (req, res) => {
    try {
      const parsed = insertBracketSchema.parse(req.body);
      const bracket = await storage.createBracket(parsed);
      res.status(201).json(bracket);
    } catch (error) {
      res.status(400).json({ message: "Invalid bracket data" });
    }
  });

  // Add some sample data
  (async () => {
    try {
      await storage.createBracket({
        name: "Basic L Bracket",
        width: "4",
        height: "4",
        depth: "0.25",
        color: "#CCCCCC",
        price: "9.99"
      });
    } catch (error) {
      console.error("Failed to create sample bracket:", error);
    }
  })();

  const httpServer = createServer(app);
  return httpServer;
}