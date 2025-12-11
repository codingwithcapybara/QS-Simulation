import useSensorStore from '../../store/sensorStore';

const SensorLog = () => {
  const { history } = useSensorStore();

  const recentTriggers = history.slice(-10).reverse();

  return (
    <div
      style={{
        padding: '20px',
        background: '#1a1a1a',
        borderRadius: '8px',
        height: 'auto',
        minHeight: '250px',
        maxHeight: '400px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
      <h3 style={{ color: '#fff', marginBottom: '15px' }}>Sensor Event Log</h3>

      <div
        style={{
          overflowY: 'auto',
          flex: 1,
          paddingRight: '10px',
        }}>
        {recentTriggers.length === 0 ? (
          <div
            style={{
              color: '#888',
              textAlign: 'center',
              padding: '20px',
              fontStyle: 'italic',
            }}>
            No sensor events recorded yet...
          </div>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: '#fff',
            }}>
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid #444',
                  textAlign: 'left',
                }}>
                <th style={{ padding: '10px', color: '#888' }}>Time</th>
                <th style={{ padding: '10px', color: '#888' }}>Volume (m³)</th>
                <th style={{ padding: '10px', color: '#888' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTriggers.map((entry, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: '1px solid #333',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#2a2a2a')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }>
                  <td style={{ padding: '10px', fontSize: '12px' }}>
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </td>
                  <td
                    style={{
                      padding: '10px',
                      fontWeight: 'bold',
                      color: entry.triggered ? '#4488ff' : '#00ff88',
                    }}>
                    {entry.volume.toFixed(2)}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        background: entry.triggered ? '#4488ff22' : '#00ff8822',
                        color: entry.triggered ? '#4488ff' : '#00ff88',
                        border: `1px solid ${
                          entry.triggered ? '#4488ff' : '#00ff88'
                        }`,
                      }}>
                      {entry.triggered ? 'TRIGGERED' : 'NORMAL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div
        style={{
          marginTop: '15px',
          padding: '10px',
          background: '#2a2a2a',
          borderRadius: '5px',
          textAlign: 'center',
          color: '#888',
          fontSize: '12px',
        }}>
        Total Events: {history.length}
      </div>
    </div>
  );
};

export default SensorLog;
