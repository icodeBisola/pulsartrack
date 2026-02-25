import { useEffect, useState } from 'react';

export interface AnalyticsTimeseriesPoint {
  date: string;
  impressions: number;
  clicks: number;
}

interface UseAnalyticsTimeseriesOptions {
  campaignIds: string[];
  timeframe: '7d' | '30d';
}

export function useAnalyticsTimeseries({ campaignIds, timeframe }: UseAnalyticsTimeseriesOptions) {
  const [data, setData] = useState<AnalyticsTimeseriesPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Replace with actual API endpoint or contract call
    fetch(`/api/analytics/timeseries?campaignIds=${campaignIds.join(',')}&timeframe=${timeframe}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch analytics timeseries');
        return res.json();
      })
      .then((result: AnalyticsTimeseriesPoint[]) => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [campaignIds, timeframe]);

  return { data, loading, error };
}
