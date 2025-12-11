import { useState } from 'react';
import Scene from './components/threed/Scene';
import DashboardLayout from './components/dashboard/DashboardLayout';
import useSensorSimulation from './hooks/useSensorSimulation';
import useSensorStore from './store/sensorStore';
import './App.css';

function App() {
  const [simulationEnabled, setSimulationEnabled] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);
  const [performanceMode, setPerformanceMode] = useState('good'); // 'good' or 'degraded'
  const { clearHistory } = useSensorStore();

  useSensorSimulation(simulationSpeed, simulationEnabled, performanceMode);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
        overflow: 'hidden',
      }}>
      {/* Header */}
      <header
        style={{
          padding: '15px 30px',
          background: '#1a1a1a',
          borderBottom: '2px solid #333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
          <h1
            style={{
              color: '#00ff88',
              margin: 0,
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
            QS Robotics - Backhoe Simulation
          </h1>
          <p
            style={{
              color: '#888',
              margin: '5px 0 0 0',
              fontSize: '12px',
            }}>
            Construction 4.0 | IoT Soil Volume Detection System
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Performance Mode Selector */}
          <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
            <button
              onClick={() => {
                setPerformanceMode('good');
                clearHistory();
              }}
              style={{
                padding: '8px 16px',
                background: performanceMode === 'good' ? '#00ff88' : '#2a2a2a',
                color: performanceMode === 'good' ? '#000' : '#fff',
                border: '1px solid #666',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
              }}>
              ✅ Good Performance
            </button>
            <button
              onClick={() => {
                setPerformanceMode('degraded');
                clearHistory();
              }}
              style={{
                padding: '8px 16px',
                background:
                  performanceMode === 'degraded' ? '#ff4444' : '#2a2a2a',
                color: performanceMode === 'degraded' ? '#000' : '#fff',
                border: '1px solid #666',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
              }}>
              ⚠️ Needs Maintenance
            </button>
          </div>

          <button
            onClick={() => setSimulationEnabled(!simulationEnabled)}
            style={{
              padding: '8px 16px',
              background: simulationEnabled ? '#ff4444' : '#00ff88',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
            {simulationEnabled ? '⏸ Pause' : '▶ Resume'}
          </button>

          <button
            onClick={clearHistory}
            style={{
              padding: '8px 16px',
              background: '#444',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
            🗑 Clear Log
          </button>

          <select
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              background: '#2a2a2a',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
            <option value={2000}>0.5x Speed</option>
            <option value={1000}>1x Speed</option>
            <option value={500}>2x Speed</option>
            <option value={250}>4x Speed</option>
            <option value={167}>6x Speed</option>
            <option value={125}>8x Speed</option>
            <option value={100}>10x Speed</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 0,
          overflow: 'hidden',
          height: 'calc(100vh - 80px)',
        }}>
        {/* 3D Scene - Fixed size */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#000',
            borderRight: '2px solid #333',
            overflow: 'hidden',
          }}>
          <Scene />
        </div>

        {/* Dashboard - Scrollable */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#0a0a0a',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
          <DashboardLayout />
        </div>
      </div>
    </div>
  );
}

export default App;
