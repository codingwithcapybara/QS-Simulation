import { useEffect, useRef } from 'react';
import useSensorStore from '../store/sensorStore';
import { streamDataToPowerBI } from '../services/powerBiService';

const useSensorSimulation = (
  interval = 3000,
  enabled = true,
  performanceMode = 'good'
) => {
  const { updateSoilVolume, updateArmAngles, soilVolume } = useSensorStore();
  const phaseRef = useRef(0);
  const SCOOP_TIME_HOURS = 0.0154;

  useEffect(() => {
    if (!enabled || soilVolume >= 100) return;

    const simulationInterval = setInterval(() => {
      if (soilVolume >= 100) return;

      const phase = phaseRef.current % 4;

      switch (phase) {
        case 0:
          updateArmAngles({
            base: 0.8, // Right
            boom: 0.7, // Boom down
            stick: -0.8, // Stick bends BACK (creates C)
            bucket: -0.5, // Bucket open down
          });
          break;

        case 1: {
          // Scoop - close bucket
          updateArmAngles({
            base: 0.8,
            boom: 0.5, // Lift slightly
            stick: -1.0, // Keep C shape
            bucket: 1.2, // Close bucket
          });

          const randomFactor = Math.random();
          let digAmount;

          if (performanceMode === 'good') {
            if (randomFactor < 0.2) {
              digAmount = 0.85 + Math.random() * 0.15;
            } else {
              digAmount = 1.2 + Math.random() * 0.07;
            }
          } else {
            if (randomFactor < 0.2) {
              digAmount = 1.2 + Math.random() * 0.07;
            } else {
              digAmount = 0.85 + Math.random() * 0.15;
            }
          }

          const newVolume = Math.min(soilVolume + digAmount, 100);

          // Calculate efficiency locally to ensure accuracy before store update
          const currentStoreState = useSensorStore.getState();
          const newTotalTime =
            currentStoreState.totalTimeHours + SCOOP_TIME_HOURS;
          const currentEfficiency =
            newTotalTime > 0 ? (newVolume / newTotalTime).toFixed(2) : 0;

          updateSoilVolume(
            parseFloat(newVolume.toFixed(2)),
            digAmount,
            SCOOP_TIME_HOURS
          );

          // Stream to Power BI using the fresh local calculation and fresh Session ID
          const freshState = useSensorStore.getState();
          const localTimestamp = new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, -1);

          streamDataToPowerBI({
            timestamp: localTimestamp,
            sessionId: freshState.sessionId,
            scoopVolume: digAmount,
            totalVolume: newVolume,
            efficiency: parseFloat(currentEfficiency),
            maintenanceRequired: parseFloat(currentEfficiency) < 72.15 ? 1 : 0,
          });

          break;
        }

        case 2:
          // Swing to truck - left side
          updateArmAngles({
            base: -1.0, // Left to truck
            boom: 0.2,
            stick: -0.4,
            bucket: 1.0, // Hold
          });
          break;

        case 3:
          // Dump - open bucket
          updateArmAngles({
            base: -1.0,
            boom: 0.3,
            stick: -0.3,
            bucket: -0.8, // Open/dump
          });
          break;

        default:
          break;
      }

      phaseRef.current++;
    }, interval);

    return () => clearInterval(simulationInterval);
  }, [
    enabled,
    interval,
    updateSoilVolume,
    soilVolume,
    performanceMode,
    updateArmAngles,
  ]);
};

export default useSensorSimulation;
