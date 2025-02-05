import { create } from 'zustand';

interface ConfiguratorState {
  width: number;
  height: number;
  depth: number;
  color: string;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDepth: (depth: number) => void;
  setColor: (color: string) => void;
}

export const useConfigurator = create<ConfiguratorState>((set) => ({
  width: 4,
  height: 4,
  depth: 0.25,
  color: '#CCCCCC',
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setDepth: (depth) => set({ depth }),
  setColor: (color) => set({ color }),
}));
