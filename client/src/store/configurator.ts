import { create } from 'zustand';
import { baseWidths, surfaceTreatments, hardwareOptions } from '@shared/schema';

interface ConfiguratorState {
  baseWidth: string;
  height: number;
  depth: number;
  surfaceTreatment: string;
  hardware: string;
  quantity: number;
  customOptions: Record<string, unknown>;
  setBaseWidth: (width: string) => void;
  setHeight: (height: number) => void;
  setDepth: (depth: number) => void;
  setSurfaceTreatment: (treatment: string) => void;
  setHardware: (hardware: string) => void;
  setQuantity: (quantity: number) => void;
  setCustomOption: (key: string, value: unknown) => void;
  calculatePrice: () => number;
}

export const useConfigurator = create<ConfiguratorState>((set, get) => ({
  baseWidth: baseWidths.BASE_4,
  height: 4,
  depth: 0.25,
  surfaceTreatment: surfaceTreatments.RAW,
  hardware: hardwareOptions.NONE,
  quantity: 1,
  customOptions: {},

  setBaseWidth: (baseWidth) => set({ baseWidth }),
  setHeight: (height) => set({ height }),
  setDepth: (depth) => set({ depth }),
  setSurfaceTreatment: (surfaceTreatment) => set({ surfaceTreatment }),
  setHardware: (hardware) => set({ hardware }),
  setQuantity: (quantity) => set({ quantity }),
  setCustomOption: (key, value) => 
    set((state) => ({
      customOptions: { ...state.customOptions, [key]: value }
    })),

  calculatePrice: () => {
    const state = get();
    let basePrice = 39.99; // Base price for smallest bracket

    // Add width-based price increase
    const widthPrices = {
      [baseWidths.BASE_4]: 0,
      [baseWidths.BASE_6]: 10,
      [baseWidths.BASE_8]: 20,
      [baseWidths.BASE_10]: 30,
      [baseWidths.BASE_12]: 40,
    };
    basePrice += widthPrices[state.baseWidth] || 0;

    // Add surface treatment cost
    if (state.surfaceTreatment === surfaceTreatments.BLACK_POWDER ||
        state.surfaceTreatment === surfaceTreatments.WHITE_POWDER ||
        state.surfaceTreatment === surfaceTreatments.CLEAR_POWDER) {
      basePrice += 15;
    } else if (state.surfaceTreatment === surfaceTreatments.PRIMER) {
      basePrice += 10;
    }

    // Add hardware kit cost
    if (state.hardware !== hardwareOptions.NONE) {
      basePrice += 3.99;
    }

    return basePrice * state.quantity;
  }
}));