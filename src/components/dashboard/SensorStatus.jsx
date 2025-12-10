import useSensorStore from '../../store/sensorStore';

const SensorStatus = () => {
  const { soilVolume, sensorTriggered, bucketPosition } = useSensorStore();

  return (
    <div
      style={{
        padding: '20px',
        background: '#1a1a1a',
        borderRadius: '8px',
        height: 'auto',
        minHeight: '200px',
        boxSizing: 'border-box',
      }}>
      <h3 style={{ color: '#fff', marginBottom: '20px' }}>Sensor Status</h3>

      {/* Current Volume Display */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: sensorTriggered ? '#ff4444' : '#00ff88',
            marginBottom: '5px',
          }}>
          {soilVolume.toFixed(2)} m³
        </div>
        <div style={{ color: '#888', fontSize: '14px' }}>
          Current Soil Volume
        </div>
      </div>

      {/* Sensor Indicator */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '15px',
            background: sensorTriggered ? '#ff444422' : '#00ff8822',
            borderRadius: '5px',
            border: `2px solid ${sensorTriggered ? '#ff4444' : '#00ff88'}`,
          }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: sensorTriggered ? '#ff4444' : '#00ff88',
              boxShadow: sensorTriggered
                ? '0 0 10px #ff4444'
                : '0 0 10px #00ff88',
              animation: sensorTriggered ? 'pulse 1s infinite' : 'none',
            }}
          />
          <div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>
              {sensorTriggered
                ? 'COMPLETE: Target Reached!'
                : 'Digging in Progress...'}
            </div>
            <div style={{ color: '#888', fontSize: '12px' }}>
              Target: 100 m³
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default SensorStatus;
