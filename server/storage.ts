import { brackets, type Bracket, type InsertBracket } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBrackets(): Promise<Bracket[]>;
  getBracket(id: number): Promise<Bracket | undefined>;
  createBracket(bracket: InsertBracket): Promise<Bracket>;
}

export class DatabaseStorage implements IStorage {
  async getBrackets(): Promise<Bracket[]> {
    return await db.select().from(brackets);
  }

  async getBracket(id: number): Promise<Bracket | undefined> {
    const [bracket] = await db.select().from(brackets).where(eq(brackets.id, id));
    return bracket || undefined;
  }

  async createBracket(insertBracket: InsertBracket): Promise<Bracket> {
    const [bracket] = await db
      .insert(brackets)
      .values(insertBracket)
      .returning();
    return bracket;
  }
}

export const storage = new DatabaseStorage();