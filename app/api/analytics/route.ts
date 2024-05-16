import { dailyUsages, getOrInitializeDailyUsage } from '../../lib/kv';
import moment from 'moment-timezone';

moment.tz.setDefault('America/Sao_Paulo');

export async function GET() {
  const today = moment().format('YYYY-MM-DD');
  const usage = await getOrInitializeDailyUsage(today);
  return Response.json({ usage });
}

export async function POST(req: Request) {
  const { type, count, tokenInfo } = await req.json();
  const today = moment().format('YYYY-MM-DD');

  try { 
    let usage = await getOrInitializeDailyUsage(today);

    await dailyUsages.hincrby(`daily_usage:${today}`, type, count);
    await dailyUsages.hincrby(`daily_usage:${today}`, 'usageCount', 1);
    await dailyUsages.hincrby(`daily_usage:${today}`, 'inputTokenCount', tokenInfo.inputTokenCount);
    await dailyUsages.hincrby(`daily_usage:${today}`, 'outputTokenCount', tokenInfo.outputTokenCount);
    await dailyUsages.hincrby(`daily_usage:${today}`, 'totalTokenCount', tokenInfo.totalTokenCount);
    await dailyUsages.hincrby('total_usage', type, count);
    await dailyUsages.hincrby('total_usage', 'usageCount', 1);
    usage = await getOrInitializeDailyUsage(today);
    return Response.json({ message: 'Usage updated', usage });
  } catch (error) {
    return Response.json({ error: 'Failed to update usage' }, { status: 500 });
  }
}
