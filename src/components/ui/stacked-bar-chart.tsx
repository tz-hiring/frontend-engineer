import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface StackedBarChartProps {
  data: any[];
  dataKeys: string[];
  chartConfig: any;
  className?: string;
  height?: string;
}

export function StackedBarChart({
  data,
  dataKeys,
  chartConfig,
  className = "h-[500px] w-full",
}: StackedBarChartProps) {
  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="x"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          interval={2}
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend
          content={
            <ChartLegendContent className="grid grid-cols-6 font-normal gap-2 mt-6" />
          }
        />
        {dataKeys.map((dataKey) => (
          <Bar
            key={dataKey}
            dataKey={dataKey}
            stackId="a"
            fill={`var(--color-${dataKey})`}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
