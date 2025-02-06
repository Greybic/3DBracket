import { pgTable, text, serial, decimal, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bracketTypes = {
  POST_OR_GIRDER: "Post or Girder Beam Supporting Brackets",
} as const;

export const baseWidths = {
  BASE_4: "4\" (10.2 cm)",
  BASE_6: "6\" (15.2 cm)",
  BASE_8: "8\" (20.3 cm)",
  BASE_10: "10\" (25.4 cm)",
  BASE_12: "12\" (30.5 cm)",
} as const;

export const surfaceTreatments = {
  RAW: "Raw Steel",
  BLACK_POWDER: "Black Powder Coat (+$15.00)",
  WHITE_POWDER: "White Powder Coat (+$15.00)",
  CLEAR_POWDER: "Clear Powder Coat (+$15.00)",
  PRIMER: "Primer (+$10.00)",
} as const;

export const hardwareOptions = {
  NONE: "None",
  CONCRETE_KIT: "3/8\" Concrete Installation Kit (+$3.99)",
  WOOD_KIT: "3/8\" Wood Installation Kit (+$3.99)",
} as const;

export const brackets = pgTable("brackets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  baseWidth: text("base_width").notNull(),
  height: decimal("height").notNull(),
  depth: decimal("depth").notNull(),
  surfaceTreatment: text("surface_treatment").notNull(),
  hardware: text("hardware").notNull(),
  quantity: integer("quantity").notNull().default(1),
  price: decimal("price").notNull(),
  customOptions: json("custom_options").notNull().default({}),
});

export const insertBracketSchema = createInsertSchema(brackets).extend({
  baseWidth: z.enum([Object.values(baseWidths)[0], ...Object.values(baseWidths).slice(1)]),
  surfaceTreatment: z.enum([Object.values(surfaceTreatments)[0], ...Object.values(surfaceTreatments).slice(1)]),
  hardware: z.enum([Object.values(hardwareOptions)[0], ...Object.values(hardwareOptions).slice(1)]),
  height: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Height must be a valid number",
  }),
  depth: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Depth must be a valid number",
  }),
  customOptions: z.record(z.unknown()).default({}),
});

export type InsertBracket = z.infer<typeof insertBracketSchema>;
export type Bracket = typeof brackets.$inferSelect;