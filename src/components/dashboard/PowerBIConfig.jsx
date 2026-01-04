import React, { useState, useEffect } from 'react';
import { setPowerBiUrl, getPowerBiUrl } from '../../services/powerBiService';
import useSensorStore from '../../store/sensorStore';

const PowerBIConfig = () => {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { history } = useSensorStore();

  useEffect(() => {
    setUrl(getPowerBiUrl());
  }, []);

  const handleSave = () => {
    setPowerBiUrl(url);
    setIsOpen(false);
    alert('Power BI Stream URL Saved!');
  };

  const downloadCSV = () => {
    if (history.length === 0) {
      alert('No data to export yet.');
      return;
    }

    const headers = [
      'Timestamp',
      'SessionID',
      'TotalVolume_m3',
      'ScoopVolume_m3',
      'Efficiency_m3_hr',
      'MaintenanceRequired',
    ];

    const startTime = new Date(history[0].timestamp).getTime();
    const EXPECTED_EFFICIENCY = 72.15;

    const csvRows = history.map((entry) => {
      const currentTime = new Date(entry.timestamp).getTime();
      const timeDiffHours = (currentTime - startTime) / (1000 * 60 * 60);

      const efficiency =
        timeDiffHours > 0.0001 ? (entry.volume / timeDiffHours).toFixed(2) : 0;

      const maintenanceRequired =
        parseFloat(efficiency) < EXPECTED_EFFICIENCY && timeDiffHours > 0.01;

      return [
        entry.timestamp,
        // Use the session ID from the store if available, or a placeholder
        useSensorStore.getState().sessionId || 'Session1',
        entry.volume,
        entry.scoopAmount,
        efficiency,
        maintenanceRequired ? 'Yes' : 'No',
      ].join(',');
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      csvRows.join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'excavator_simulation_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        padding: '10px',
        background: '#1a1a1a',
        borderRadius: '8px',
        marginTop: '15px',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#f2c811',
            cursor: 'pointer',
            fontSize: '12px',
          }}>
          {isOpen ? '▼' : '▶'} Configure Power BI Stream
        </button>
        <button
          onClick={downloadCSV}
          style={{
            background: '#333',
            border: '1px solid #555',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '4px',
          }}>
          Download CSV
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '10px' }}>
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Paste Power BI Push URL here...'
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '8px',
              background: '#333',
              border: 'none',
              color: 'white',
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: '5px 10px',
              background: '#f2c811',
              border: 'none',
              cursor: 'pointer',
            }}>
            Save URL
          </button>
        </div>
      )}
    </div>
  );
};

export default PowerBIConfig;
