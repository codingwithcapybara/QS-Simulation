import useSensorStore from '../../store/sensorStore';

const PredictiveMaintenance = () => {
  const { scoopHistory, totalScoops, totalTimeHours, soilVolume } = useSensorStore();

  // Baseline metrics
  const BUCKET_FULL_CAPACITY = 0.87; // m³
  const EXPECTED_EFFICIENCY = 72.15; // m³/hr

  // Metric A: Bucket Capacity Check
  // Average of last 10 scoops
  const recentScoops = scoopHistory.slice(-10);
  const avgBucketCapacity = recentScoops.length > 0
    ? recentScoops.reduce((sum, scoop) => sum + scoop.volume, 0) / recentScoops.length
    : 0;
  
  const bucketCapacityPercentage = (avgBucketCapacity / BUCKET_FULL_CAPACITY) * 100;
  const bucketNeedsMaintenance = avgBucketCapacity < BUCKET_FULL_CAPACITY * 0.85; // 85% threshold

  // Metric B: Machinery Efficiency Check
  const currentEfficiency = totalTimeHours > 0 
    ? soilVolume / totalTimeHours 
    : 0;
  
  const efficiencyPercentage = (currentEfficiency / EXPECTED_EFFICIENCY) * 100;
  const efficiencyNeedsMaintenance = currentEfficiency < EXPECTED_EFFICIENCY * 0.85; // 85% threshold

  // Overall maintenance status
  const requiresMaintenance = bucketNeedsMaintenance || efficiencyNeedsMaintenance;

  return (
    <div style={{ 
      padding: '20px', 
      background: '#1a1a1a', 
      borderRadius: '8px',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ color: '#fff', marginBottom: '20px' }}>Predictive Maintenance</h3>
      
      {/* Overall Status */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        padding: '15px',
        marginBottom: '20px',
        background: requiresMaintenance ? '#ff444422' : '#00ff8822',
        borderRadius: '5px',
        border: `2px solid ${requiresMaintenance ? '#ff4444' : '#00ff88'}`
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: requiresMaintenance ? '#ff4444' : '#00ff88',
          boxShadow: requiresMaintenance ? '0 0 10px #ff4444' : '0 0 10px #00ff88',
        }} />
        <div>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
            {requiresMaintenance ? '⚠️ Requires Maintenance' : '✅ Does Not Require Maintenance'}
          </div>
          <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
            {totalScoops} scoops | {totalTimeHours.toFixed(2)} hours operated
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '15px' 
      }}>
        {/* Metric A: Bucket Capacity */}
        <div style={{ 
          padding: '15px', 
          background: '#2a2a2a', 
          borderRadius: '5px',
          border: `2px solid ${bucketNeedsMaintenance ? '#ff4444' : '#00ff88'}`
        }}>
          <h4 style={{ 
            color: '#fff', 
            marginBottom: '10px', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {bucketNeedsMaintenance ? '⚠️' : '✓'} Metric A: Bucket Capacity
          </h4>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>
              Average Capacity (last 10 scoops)
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: bucketNeedsMaintenance ? '#ff4444' : '#00ff88'
            }}>
              {avgBucketCapacity.toFixed(2)} m³
            </div>
            <div style={{ color: '#888', fontSize: '11px' }}>
              Expected: {BUCKET_FULL_CAPACITY} m³
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: '#444', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '6px'
          }}>
            <div style={{ 
              width: `${Math.min(bucketCapacityPercentage, 100)}%`, 
              height: '100%', 
              background: bucketNeedsMaintenance ? '#ff4444' : '#00ff88',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{ 
            color: bucketNeedsMaintenance ? '#ff4444' : '#00ff88', 
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            {bucketCapacityPercentage.toFixed(1)}% of baseline
          </div>

          <div style={{ 
            marginTop: '10px',
            padding: '8px',
            background: '#1a1a1a',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#888'
          }}>
            {bucketNeedsMaintenance 
              ? '⚠️ Low capacity detected - check bucket wear'
              : '✓ Operating within normal range'
            }
          </div>
        </div>

        {/* Metric B: Machinery Efficiency */}
        <div style={{ 
          padding: '15px', 
          background: '#2a2a2a', 
          borderRadius: '5px',
          border: `2px solid ${efficiencyNeedsMaintenance ? '#ff4444' : '#00ff88'}`
        }}>
          <h4 style={{ 
            color: '#fff', 
            marginBottom: '10px', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {efficiencyNeedsMaintenance ? '⚠️' : '✓'} Metric B: Machinery Efficiency
          </h4>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>
              Current Efficiency
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: efficiencyNeedsMaintenance ? '#ff4444' : '#00ff88'
            }}>
              {currentEfficiency.toFixed(2)} m³/hr
            </div>
            <div style={{ color: '#888', fontSize: '11px' }}>
              Expected: {EXPECTED_EFFICIENCY} m³/hr
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: '#444', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '6px'
          }}>
            <div style={{ 
              width: `${Math.min(efficiencyPercentage, 100)}%`, 
              height: '100%', 
              background: efficiencyNeedsMaintenance ? '#ff4444' : '#00ff88',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{ 
            color: efficiencyNeedsMaintenance ? '#ff4444' : '#00ff88', 
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            {efficiencyPercentage.toFixed(1)}% of baseline
          </div>

          <div style={{ 
            marginTop: '10px',
            padding: '8px',
            background: '#1a1a1a',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#888'
          }}>
            {efficiencyNeedsMaintenance 
              ? '⚠️ Low efficiency - check hydraulics/engine'
              : '✓ Operating within normal range'
            }
          </div>
        </div>
      </div>

      {/* Data insufficient warning */}
      {recentScoops.length < 5 && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          background: '#444422',
          borderRadius: '5px',
          border: '1px solid #888844',
          color: '#ffff88',
          fontSize: '12px'
        }}>
          ℹ️ Collecting data... Need at least 5 scoops for accurate maintenance prediction
        </div>
      )}
    </div>
  );
};

export default PredictiveMaintenance;
