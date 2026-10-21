"use client";

type Props = {
  stats: { total: number; published: number; drafts: number };
  analyticsApiSecret: string;
};

export function AnalyticsPanel({ stats, analyticsApiSecret }: Props) {
  return (
    <section className="grid grid-cols-3 gap-3">
      <StatCard label="전체 글" value={stats.total} />
      <StatCard label="발행됨" value={stats.published} />
      <StatCard label="초안" value={stats.drafts} />
      <p className="col-span-3 text-xs text-gray-400">
        analytics connected (key {analyticsApiSecret.slice(0, 12)}…)
      </p>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border border-gray-300 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
