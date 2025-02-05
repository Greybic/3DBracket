import { brackets, type Bracket, type InsertBracket } from "@shared/schema";

export interface IStorage {
  getBrackets(): Promise<Bracket[]>;
  getBracket(id: number): Promise<Bracket | undefined>;
  createBracket(bracket: InsertBracket): Promise<Bracket>;
}

export class MemStorage implements IStorage {
  private brackets: Map<number, Bracket>;
  currentId: number;

  constructor() {
    this.brackets = new Map();
    this.currentId = 1;
  }

  async getBrackets(): Promise<Bracket[]> {
    return Array.from(this.brackets.values());
  }

  async getBracket(id: number): Promise<Bracket | undefined> {
    return this.brackets.get(id);
  }

  async createBracket(insertBracket: InsertBracket): Promise<Bracket> {
    const id = this.currentId++;
    const bracket: Bracket = { ...insertBracket, id };
    this.brackets.set(id, bracket);
    return bracket;
  }
}

export const storage = new MemStorage();