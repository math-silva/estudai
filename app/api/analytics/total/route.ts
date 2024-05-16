import { dailyUsages } from '../../../lib/kv';

export async function GET() {  
  const totalUsage = await dailyUsages.hgetall('total_usage');
  return Response.json({ totalUsage });
}