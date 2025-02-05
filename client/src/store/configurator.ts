import { create } from 'zustand';
import { bracketTypes, materials, finishes } from '@shared/schema';

interface ConfiguratorState {
  width: number;
  height: number;
  depth: number;
  type: string;
  material: string;
  finish: string;
  thickness: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDepth: (depth: number) => void;
  setType: (type: string) => void;
  setMaterial: (material: string) => void;
  setFinish: (finish: string) => void;
  setThickness: (thickness: number) => void;
}

export const useConfigurator = create<ConfiguratorState>((set) => ({
  width: 4,
  height: 4,
  depth: 0.25,
  type: bracketTypes.L_BRACKET,
  material: materials.STEEL,
  finish: finishes.RAW,
  thickness: 0.25,
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setDepth: (depth) => set({ depth }),
  setType: (type) => set({ type }),
  setMaterial: (material) => set({ material }),
  setFinish: (finish) => set({ finish }),
  setThickness: (thickness) => set({ thickness }),
}));