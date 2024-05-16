import { createClient } from "@vercel/kv";

export interface DailyUsage {
  flashcardCount: number;
  summaryCount: number;
  exerciseCount: number;
  usageCount: number;
  inputTokenCount: number;
  outputTokenCount: number;
  totalTokenCount: number;
}

export const dailyUsages = createClient({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

export async function getOrInitializeDailyUsage(today: string): Promise<DailyUsage> {
  const usage = await dailyUsages.hgetall(`daily_usage:${today}`) as unknown as DailyUsage;

  if (!usage) {
    const defaultUsage: DailyUsage = { 
      flashcardCount: 0,
      summaryCount: 0,
      exerciseCount: 0,
      usageCount: 0,
      inputTokenCount: 0,
      outputTokenCount: 0,
      totalTokenCount: 0,
    };

    await dailyUsages.hset(`daily_usage:${today}`, { ...defaultUsage });
    return defaultUsage;
  }
  
  return usage;  
}