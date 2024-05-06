import { create } from 'zustand'

const useSourceStore = create((set) => ({
  selectedRoad: {},
  setSelectedRoad: (newRoad) => set({ selectedRoad: newRoad })
}))

export default useSourceStore
