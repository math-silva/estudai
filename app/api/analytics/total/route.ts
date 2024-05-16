import { dailyUsages } from '../../../lib/kv';

export const revalidate = 30; // revalidate every 30 seconds

export async function GET() {
  const totalUsage = await dailyUsages.hgetall('total_usage');
  return Response.json({ totalUsage });
}