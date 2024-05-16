import { dailyUsages } from '../../../lib/kv';

export const revalidate = 15; // revalidate every 15 seconds

export async function GET() {
  const totalUsage = await dailyUsages.hgetall('total_usage');
  return Response.json({ totalUsage });
}