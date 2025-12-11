import { create } from 'zustand';

const useSensorStore = create((set) => ({
  soilVolume: 0,

  sensorTriggered: false,

  bucketPosition: { x: 0, y: 2, z: 0 },

  history: [],

  totalScoops: 0,
  totalTimeHours: 0,
  scoopHistory: [],

  armAngles: {
    base: 0,
    boom: 0,
    stick: 0,
    bucket: 0,
  },
  updateSoilVolume: (volume, scoopAmount, timeIncrement) =>
    set((state) => {
      const triggered = volume >= 100;
      const newEntry = {
        timestamp: new Date().toISOString(),
        volume: volume,
        triggered: triggered,
        bucketPosition: state.bucketPosition,
        scoopAmount: scoopAmount || 0, 
      };

      const newScoopHistory = scoopAmount
        ? [
            ...state.scoopHistory,
            {
              volume: scoopAmount,
              timestamp: new Date().toISOString(),
            },
          ].slice(-20) 
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
      soilVolume: 0,
      sensorTriggered: false,
    }),
}));

export default useSensorStore;
