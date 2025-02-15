import { create } from 'zustand';
import { baseWidths, surfaceTreatments, hardwareOptions, bracketTypes } from '@shared/schema';

interface ConfiguratorState {
  bracketType: string;
  baseWidth: string;
  height: number;
  depth: number;
  plateThickness: number;
  gussetThickness: number;
  surfaceTreatment: string;
  hardware: string;
  quantity: number;
  customOptions: Record<string, unknown>;
  setBracketType: (type: string) => void;
  setBaseWidth: (width: string) => void;
  setHeight: (height: number) => void;
  setDepth: (depth: number) => void;
  setPlateThickness: (thickness: number) => void;
  setGussetThickness: (thickness: number) => void;
  setSurfaceTreatment: (treatment: string) => void;
  setHardware: (hardware: string) => void;
  setQuantity: (quantity: number) => void;
  setCustomOption: (key: string, value: unknown) => void;
  calculatePrice: () => number;
}

export const useConfigurator = create<ConfiguratorState>((set, get) => ({
  bracketType: bracketTypes.POST_OR_GIRDER,
  baseWidth: baseWidths.BASE_4,
  height: 4,
  depth: 0.25,
  plateThickness: 0.25,
  gussetThickness: 0.25,
  surfaceTreatment: surfaceTreatments.RAW,
  hardware: hardwareOptions.NONE,
  quantity: 1,
  customOptions: {},

  setBracketType: (bracketType) => set({ bracketType }),
  setBaseWidth: (baseWidth) => set({ baseWidth }),
  setHeight: (height) => set({ height }),
  setDepth: (depth) => set({ depth }),
  setPlateThickness: (plateThickness) => set({ plateThickness }),
  setGussetThickness: (gussetThickness) => set({ gussetThickness }),
  setSurfaceTreatment: (surfaceTreatment) => set({ surfaceTreatment }),
  setHardware: (hardware) => set({ hardware }),
  setQuantity: (quantity) => set({ quantity }),
  setCustomOption: (key, value) => 
    set((state) => ({
      customOptions: { ...state.customOptions, [key]: value }
    })),

  calculatePrice: () => {
    const state = get();
    let basePrice = 39.99;

    switch (state.baseWidth) {
      case baseWidths.BASE_6:
        basePrice += 10;
        break;
      case baseWidths.BASE_8:
        basePrice += 20;
        break;
      case baseWidths.BASE_10:
        basePrice += 30;
        break;
      case baseWidths.BASE_12:
        basePrice += 40;
        break;
    }

    if (state.surfaceTreatment === surfaceTreatments.BLACK_POWDER ||
        state.surfaceTreatment === surfaceTreatments.WHITE_POWDER ||
        state.surfaceTreatment === surfaceTreatments.CLEAR_POWDER) {
      basePrice += 15;
    } else if (state.surfaceTreatment === surfaceTreatments.PRIMER) {
      basePrice += 10;
    }

    if (state.hardware !== hardwareOptions.NONE) {
      basePrice += 3.99;
    }

    return basePrice * state.quantity;
  }
}));