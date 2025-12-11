import SoilVolumeChart from './SoilVolumeChart';
import SensorStatus from './SensorStatus';
import SensorLog from './SensorLog';
import PredictiveMaintenance from './PredictiveMaintenance';

const DashboardLayout = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '15px',
        background: '#0a0a0a',
        overflow: 'auto',
        boxSizing: 'border-box',
      }}>
      {/* Soil Volume Chart */}
      <div style={{ flex: '0 0 auto' }}>
        <SoilVolumeChart />
      </div>

      {/* Predictive Maintenance */}
      <div style={{ flex: '0 0 auto' }}>
        <PredictiveMaintenance />
      </div>

      {/* Sensor Status */}
      <div style={{ flex: '0 0 auto' }}>
        <SensorStatus />
      </div>

      {/* Sensor Log */}
      <div style={{ flex: '0 0 auto' }}>
        <SensorLog />
      </div>
    </div>
  );
};

export default DashboardLayout;
