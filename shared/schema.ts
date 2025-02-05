import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const brackets = pgTable("brackets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  width: decimal("width").notNull(),
  height: decimal("height").notNull(),
  depth: decimal("depth").notNull(),
  color: text("color").notNull(),
  price: decimal("price").notNull(),
});

export const insertBracketSchema = createInsertSchema(brackets).pick({
  name: true,
  width: true,
  height: true,
  depth: true,
  color: true,
  price: true,
});

export type InsertBracket = z.infer<typeof insertBracketSchema>;
export type Bracket = typeof brackets.$inferSelect;
