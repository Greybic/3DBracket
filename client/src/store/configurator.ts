import { create } from 'zustand';
import { bracketTypes, materials, finishes } from '@shared/schema';

interface HoleConfig {
  diameter: number;
  positions: { x: number; y: number }[];
}

interface ConfiguratorState {
  width: number;
  height: number;
  depth: number;
  type: string;
  material: string;
  finish: string;
  thickness: number;
  quantity: number;
  holes: HoleConfig;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDepth: (depth: number) => void;
  setType: (type: string) => void;
  setMaterial: (material: string) => void;
  setFinish: (finish: string) => void;
  setThickness: (thickness: number) => void;
  setQuantity: (quantity: number) => void;
  setHoleDiameter: (diameter: number) => void;
  addHole: (position: { x: number; y: number }) => void;
  removeHole: (index: number) => void;
}

export const useConfigurator = create<ConfiguratorState>((set) => ({
  width: 4,
  height: 4,
  depth: 0.25,
  type: bracketTypes.L_BRACKET,
  material: materials.STEEL,
  finish: finishes.RAW,
  thickness: 0.25,
  quantity: 1,
  holes: {
    diameter: 0.25,
    positions: [],
  },
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setDepth: (depth) => set({ depth }),
  setType: (type) => set({ type }),
  setMaterial: (material) => set({ material }),
  setFinish: (finish) => set({ finish }),
  setThickness: (thickness) => set({ thickness }),
  setQuantity: (quantity) => set({ quantity }),
  setHoleDiameter: (diameter) => 
    set((state) => ({ holes: { ...state.holes, diameter } })),
  addHole: (position) =>
    set((state) => ({
      holes: {
        ...state.holes,
        positions: [...state.holes.positions, position],
      },
    })),
  removeHole: (index) =>
    set((state) => ({
      holes: {
        ...state.holes,
        positions: state.holes.positions.filter((_, i) => i !== index),
      },
    })),
}));