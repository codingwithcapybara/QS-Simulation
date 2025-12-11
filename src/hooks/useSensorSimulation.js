import { useEffect, useRef } from 'react';
import useSensorStore from '../store/sensorStore';

const useSensorSimulation = (interval = 3000, enabled = true) => {
  const { updateSoilVolume, updateArmAngles, soilVolume } = useSensorStore();
  const phaseRef = useRef(0);
  const SCOOP_TIME_HOURS = 0.012; // ~43 seconds per scoop cycle (0.72 minutes)

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
          console.log('⬇️ DIG');
          break;

        case 1:
          // Scoop - close bucket
          updateArmAngles({
            base: 0.8,
            boom: 0.5, // Lift slightly
            stick: -1.0, // Keep C shape
            bucket: 1.2, // Close bucket
          });

          // Simulate variable scoop amounts (0.6 to 0.87m³ with occasional degradation)
          const randomFactor = Math.random();
          let digAmount;
          
          // Simulate occasional performance degradation
          if (randomFactor < 0.15) {
            // 15% chance of reduced capacity (maintenance needed)
            digAmount = 0.4 + Math.random() * 0.25; // 0.4-0.65m³
          } else {
            // Normal operation near full capacity
            digAmount = 0.7 + Math.random() * 0.17; // 0.7-0.87m³
          }
          
          const newVolume = Math.min(soilVolume + digAmount, 100);
          updateSoilVolume(parseFloat(newVolume.toFixed(2)), digAmount, SCOOP_TIME_HOURS);
          console.log(`🚜 SCOOP: ${digAmount.toFixed(2)}m³ | Total: ${newVolume.toFixed(1)}m³`);
          break;

        case 2:
          // Swing to truck - left side
          updateArmAngles({
            base: -1.0, // Left to truck
            boom: 0.2,
            stick: -0.4,
            bucket: 1.0, // Hold
          });
          console.log('🔄 SWING');
          break;

        case 3:
          // Dump - open bucket
          updateArmAngles({
            base: -1.0,
            boom: 0.3,
            stick: -0.3,
            bucket: -0.8, // Open/dump
          });
          console.log('📤 DUMP');
          break;

        default:
          break;
      }

      phaseRef.current++;
    }, interval);

    return () => clearInterval(simulationInterval);
  }, [enabled, interval, updateSoilVolume, soilVolume]);
};

export default useSensorSimulation;
