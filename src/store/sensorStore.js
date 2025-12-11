import { create } from 'zustand';

const useSensorStore = create((set) => ({
  soilVolume: 0,

  sensorTriggered: false,

  bucketPosition: { x: 0, y: 2, z: 0 },

  history: [],

  // Performance metrics for maintenance prediction
  totalScoops: 0,
  totalTimeHours: 0, // Time in hours
  scoopHistory: [], // Track individual scoop performance

  // Backhoe arm angles (for animation)
  armAngles: {
    base: 0,
    boom: 0,
    stick: 0,
    bucket: 0,
  },
  // try again
  updateSoilVolume: (volume, scoopAmount, timeIncrement) =>
    set((state) => {
      const triggered = volume >= 100;
      const newEntry = {
        timestamp: new Date().toISOString(),
        volume: volume,
        triggered: triggered,
        bucketPosition: state.bucketPosition,
        scoopAmount: scoopAmount || 0, // Add scoop amount to history
      };

      // Track scoop performance if this was a scoop operation
      const newScoopHistory = scoopAmount
        ? [
            ...state.scoopHistory,
            {
              volume: scoopAmount,
              timestamp: new Date().toISOString(),
            },
          ].slice(-20) // Keep last 20 scoops
        : state.scoopHistory;

      const newTotalScoops = scoopAmount
        ? state.totalScoops + 1
        : state.totalScoops;
      const newTotalTimeHours = timeIncrement
        ? state.totalTimeHours + timeIncrement
        : state.totalTimeHours;

      return {
        soilVolume: volume,
        sensorTriggered: triggered,
        history: [...state.history, newEntry],
        totalScoops: newTotalScoops,
        totalTimeHours: newTotalTimeHours,
        scoopHistory: newScoopHistory,
      };
    }),

  updateBucketPosition: (position) =>
    set({
      bucketPosition: position,
    }),

  updateArmAngles: (angles) =>
    set({
      armAngles: angles,
    }),

  resetSensorTrigger: () =>
    set({
      sensorTriggered: false,
    }),

  clearHistory: () =>
    set({
      history: [],
      totalScoops: 0,
      totalTimeHours: 0,
      scoopHistory: [],
    }),
}));

export default useSensorStore;
