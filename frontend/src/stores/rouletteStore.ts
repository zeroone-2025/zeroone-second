import { create } from "zustand";
import { Destination, destinations } from "@/lib/destinations";
import { excuses } from "@/lib/excuses";

interface RouletteStore {
  selectedDestination: Destination | null;
  selectedExcuse: string | null;
  selectedIndex: number | null;
  spin: () => number; // returns the selected index
  setResultByIndex: (index: number) => void;
  reset: () => void;
}

export const useRouletteStore = create<RouletteStore>((set) => ({
  selectedDestination: null,
  selectedExcuse: null,
  selectedIndex: null,
  spin: () => {
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const randomDestination = destinations[randomIndex];
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    set({
      selectedDestination: randomDestination,
      selectedExcuse: randomExcuse,
      selectedIndex: randomIndex,
    });
    return randomIndex;
  },
  setResultByIndex: (index: number) => {
    const destination = destinations[index];
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    set({
      selectedDestination: destination,
      selectedExcuse: randomExcuse,
      selectedIndex: index,
    });
  },
  reset: () => {
    set({
      selectedDestination: null,
      selectedExcuse: null,
      selectedIndex: null,
    });
  },
}));
