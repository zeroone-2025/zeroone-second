import { create } from "zustand";
import { Destination, destinations } from "@/lib/destinations";
import { excuses } from "@/lib/excuses";

interface RouletteStore {
  selectedDestination: Destination | null;
  selectedExcuse: string | null;
  spin: () => void;
  reset: () => void;
}

export const useRouletteStore = create<RouletteStore>((set) => ({
  selectedDestination: null,
  selectedExcuse: null,
  spin: () => {
    const randomDestination =
      destinations[Math.floor(Math.random() * destinations.length)];
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    set({
      selectedDestination: randomDestination,
      selectedExcuse: randomExcuse,
    });
  },
  reset: () => {
    set({
      selectedDestination: null,
      selectedExcuse: null,
    });
  },
}));
