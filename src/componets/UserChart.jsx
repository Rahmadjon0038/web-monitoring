'use client'
import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { usegetProfilestats } from '@/hooks/profileStats';

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function PieChartWithCustomizedLabel({ userId }) {
  const { data, isLoading, error } = usegetProfilestats(userId);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi 😢</p>;

  const groups = data?.groups || [];

  if (!groups.length) {
    return (
      <div className="flex items-center justify-center w-full h-[200px] border rounded-lg">
        <p className="text-gray-500 text-sm">Hozircha statistikalar yo‘q</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {groups.map((g) => {
        const chartData = g.stats || [];
        const TOTAL = chartData.reduce((a, b) => a + b.value, 0);

        const getArcLabel = (params) => {
          const percent = (params.value / TOTAL) * 100;
          return `${percent.toFixed(0)}%`;
        };

        return (
          <div
            key={g.group.id}
            className="flex flex-col items-center p-4 border border-gray-400  rounded-xl shadow-sm"
          >
            {/* Guruh nomi */}
            <h3 className="text-lg font-semibold mb-2">
              {g.group.name} ({g.month.name})
            </h3>

            {/* Agar ballar bo‘lmasa */}
            {!chartData.length || TOTAL === 0 ? (
              <div className="flex items-center justify-center w-[200px] h-[200px] border border-gray-400 rounded-lg">
                <p className="text-gray-500 text-sm">Hali ballar kiritilmagan</p>
              </div>
            ) : (
              <PieChart
                series={[
                  {
                    outerRadius: 90,
                    data: chartData,
                    arcLabel: getArcLabel,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                  },
                }}
                {...sizing}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
