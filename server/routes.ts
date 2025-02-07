import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBracketSchema, baseWidths, surfaceTreatments, hardwareOptions } from "@shared/schema";
import { BigCommerceClient } from "./bigcommerce-client";
import type { CartItem } from "@shared/bigcommerce";

export function registerRoutes(app: Express): Server {
  // Existing bracket routes
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

  // BigCommerce integration routes
  app.post("/api/bigcommerce/cart", async (req, res) => {
    try {
      const { storeHash, accessToken, items } = req.body;
      const client = new BigCommerceClient({
        storeHash,
        accessToken,
        clientId: process.env.BC_CLIENT_ID || '',
        clientSecret: process.env.BC_CLIENT_SECRET || '',
      });

      const cart = await client.createCart(items as CartItem[]);
      res.json(cart);
    } catch (error) {
      console.error('BigCommerce cart creation error:', error);
      res.status(500).json({ message: "Failed to create cart in BigCommerce" });
    }
  });

  // Add some sample data
  (async () => {
    try {
      await storage.createBracket({
        name: "Basic L Bracket",
        baseWidth: baseWidths.BASE_4,
        height: "4",
        depth: "0.25",
        plateThickness: "0.25",
        gussetThickness: "0.25",
        surfaceTreatment: surfaceTreatments.RAW,
        hardware: hardwareOptions.NONE,
        price: "9.99",
        quantity: 1,
        customOptions: {}
      });
    } catch (error) {
      console.error("Failed to create sample bracket:", error);
    }
  })();

  const httpServer = createServer(app);
  return httpServer;
}