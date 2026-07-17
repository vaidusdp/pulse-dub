import React, { useState } from "react";
import { HelpCircle, TrendingUp } from "lucide-react";
import { TrafficPoint } from "@/types/dashboard";

interface TrafficChartProps {
  trafficData: TrafficPoint[];
}

export default function TrafficChart({ trafficData }: TrafficChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 600;
  const height = 200;
  const paddingX = 15;
  const paddingY = 20;

  // Calculate coordinates dynamically
  const minVal = Math.min(...trafficData.map(d => d.clicks));
  const maxVal = Math.max(...trafficData.map(d => d.clicks));
  const valRange = maxVal - minVal || 1;
  const yMin = minVal - valRange * 0.1;
  const yMax = maxVal + valRange * 0.1;
  const yRange = yMax - yMin;

  const points = trafficData.map((d, i) => {
    const x = paddingX + (i / (trafficData.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((d.clicks - yMin) / yRange) * (height - 2 * paddingY);
    return { x, y, date: d.date, clicks: d.clicks };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-[#111111] border border-[#27272A] rounded-xl p-5 flex flex-col justify-between select-none">
      <div>
        {/* Title & Key Stats */}
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Traffic Overview</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">24.3K Clicks</span>
              <span className="text-xs font-medium text-emerald-500 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                +8.2% vs Yesterday
              </span>
            </div>
          </div>
          <HelpCircle className="w-4 h-4 text-zinc-600 cursor-help" />
        </div>

        {/* Flexible grid for extra metrics */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-[#27272A] border-b mb-6 text-left">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">CTR</p>
            <p className="text-sm font-semibold text-white mt-0.5">3.42%</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Visitors</p>
            <p className="text-sm font-semibold text-white mt-0.5">18.4K</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Conversions</p>
            <p className="text-sm font-semibold text-white mt-0.5">812</p>
          </div>
        </div>

        {/* SVG Line Chart */}
        <div className="relative w-full h-[200px]" onMouseLeave={() => setHoveredIdx(null)}>
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="w-full h-full overflow-visible"
          >
            {/* Horizontal grid lines */}
            {[0.25, 0.5, 0.75].map((ratio, index) => {
              const y = paddingY + ratio * (height - 2 * paddingY);
              return (
                <line
                  key={index}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#27272A"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              );
            })}

            {/* Shaded Area Under Line */}
            <path
              d={fillPath}
              fill="#DC2626"
              opacity="0.06"
            />

            {/* Main Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#DC2626"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points & hover triggers */}
            {points.map((p, i) => (
              <g key={i}>
                {/* Dotted indicator line on hover */}
                {hoveredIdx === i && (
                  <line
                    x1={p.x}
                    y1={paddingY}
                    x2={p.x}
                    y2={height - paddingY}
                    stroke="#DC2626"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                )}
                
                {/* The point indicator */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIdx === i ? 4 : 2}
                  fill={hoveredIdx === i ? "#DC2626" : "#111111"}
                  stroke="#DC2626"
                  strokeWidth={hoveredIdx === i ? 2 : 1.5}
                  className="transition-all duration-100"
                />

                {/* Large invisible interactive hover circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={24}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                />
              </g>
            ))}

            {/* X Axis Labels */}
            {points.map((p, i) => (
              <text
                key={i}
                x={p.x}
                y={height - 2}
                fill="#71717A"
                fontSize="9"
                textAnchor="middle"
                className="font-medium font-sans"
              >
                {p.date}
              </text>
            ))}
          </svg>

          {/* Floating HTML tooltip synced to hover */}
          {hoveredIdx !== null && (
            <div 
              className="absolute bg-[#111111] border border-[#27272A] px-2.5 py-1.5 rounded-lg pointer-events-none shadow-2xl text-[10px] space-y-0.5 z-20"
              style={{
                left: `${(points[hoveredIdx].x / width) * 100}%`,
                top: `${(points[hoveredIdx].y / height) * 100 - 32}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <p className="text-zinc-500 font-semibold">{points[hoveredIdx].date}</p>
              <p className="text-white font-bold">{points[hoveredIdx].clicks.toLocaleString()} clicks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
