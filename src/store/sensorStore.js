import { create } from 'zustand';

const useSensorStore = create((set) => ({
  soilVolume: 0,

  sensorTriggered: false,

  bucketPosition: { x: 0, y: 2, z: 0 },

  history: [],

  // Backhoe arm angles (for animation)
  armAngles: {
    base: 0,
    boom: 0,
    stick: 0,
    bucket: 0,
  },
  // try
  updateSoilVolume: (volume) =>
    set((state) => {
      const triggered = volume >= 100;
      const newEntry = {
        timestamp: new Date().toISOString(),
        volume: volume,
        triggered: triggered,
        bucketPosition: state.bucketPosition,
      };

      return {
        soilVolume: volume,
        sensorTriggered: triggered,
        history: [...state.history, newEntry].slice(-50),
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
    }),
}));

export default useSensorStore;
