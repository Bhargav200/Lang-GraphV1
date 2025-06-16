
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SkillData {
  skill: string;
  current: number;
  target: number;
}

interface SkillRadarChartProps {
  data: SkillData[];
}

const SkillRadarChart = ({ data }: SkillRadarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="Current Score"
          dataKey="current"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
        <Radar
          name="Target Score"
          dataKey="target"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.1}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillRadarChart;
