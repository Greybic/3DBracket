import { pgTable, text, serial, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bracketTypes = {
  L_BRACKET: "L Bracket",
  CORNER_BRACKET: "Corner Bracket",
  FLOATING_SHELF: "Floating Shelf Bracket",
  HEAVY_DUTY: "Heavy Duty Bracket",
} as const;

export const materials = {
  STEEL: "Steel",
  ALUMINUM: "Aluminum",
} as const;

export const finishes = {
  RAW: "Raw",
  BLACK_POWDER: "Black Powder Coat",
  WHITE_POWDER: "White Powder Coat",
  CLEAR_POWDER: "Clear Powder Coat",
} as const;

export const brackets = pgTable("brackets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  material: text("material").notNull(),
  finish: text("finish").notNull(),
  thickness: decimal("thickness").notNull(),
  width: decimal("width").notNull(),
  height: decimal("height").notNull(),
  depth: decimal("depth").notNull(),
  price: decimal("price").notNull(),
});

export const insertBracketSchema = createInsertSchema(brackets).extend({
  type: z.enum([Object.values(bracketTypes)[0], ...Object.values(bracketTypes).slice(1)]),
  material: z.enum([Object.values(materials)[0], ...Object.values(materials).slice(1)]),
  finish: z.enum([Object.values(finishes)[0], ...Object.values(finishes).slice(1)]),
  thickness: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Thickness must be a valid number",
  }),
});

export type InsertBracket = z.infer<typeof insertBracketSchema>;
export type Bracket = typeof brackets.$inferSelect;