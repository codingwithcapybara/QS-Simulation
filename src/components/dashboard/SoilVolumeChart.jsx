import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import useSensorStore from '../../store/sensorStore';

const SoilVolumeChart = () => {
  const { history } = useSensorStore();

  // Show all history data with actual reading numbers
  const chartData = history.map((entry, index) => ({
    reading: index + 1,
    volume: entry.volume,
    timestamp: new Date(entry.timestamp).toLocaleTimeString(),
  }));

  return (
    <div
      style={{
        width: '100%',
        height: '280px',
        padding: '20px 20px 30px 20px',
        background: '#1a1a1a',
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}>
      <h3 style={{ color: '#fff', marginBottom: '10px', margin: '0 0 10px 0' }}>
        Soil Volume Over Time
      </h3>
      <ResponsiveContainer
        width='100%'
        height={240}>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#444'
          />
          <XAxis
            dataKey='reading'
            stroke='#888'
            label={{
              value: 'Reading #',
              position: 'insideBottom',
              offset: -5,
              fill: '#888',
            }}
          />
          <YAxis
            stroke='#888'
            label={{
              value: 'Volume (m³)',
              angle: -90,
              position: 'insideLeft',
              fill: '#888',
            }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <ReferenceLine
            y={100}
            stroke='#ff4444'
            strokeDasharray='5 5'
            label={{
              value: 'Target Volume (100m³)',
              fill: '#ff4444',
              position: 'right',
            }}
          />
          <Line
            type='monotone'
            dataKey='volume'
            stroke='#00ff88'
            strokeWidth={2}
            dot={{ fill: '#00ff88', r: 4 }}
            activeDot={{ r: 6 }}
            name='Soil Volume'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SoilVolumeChart;
