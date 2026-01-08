import { type StateCreator, create } from "zustand";

export type AdminProductForm = {
  name: string;
  slug: string;
  category: string;
  customCategory: string;
  price: string;
  originalPrice: string;
  description: string;
  image: string;
  inStock: string;
  features: string;
  charityProgram: string;
  notes: string;
};

const defaultForm: AdminProductForm = {
  name: "",
  slug: "",
  category: "",
  customCategory: "",
  price: "",
  originalPrice: "",
  description: "",
  image: "",
  inStock: "available",
  features: "",
  charityProgram: "",
  notes: "",
};

type AdminStore = {
  form: AdminProductForm;
  loading: boolean;
  message: string;
  updateField: (field: keyof AdminProductForm, value: string) => void;
  resetForm: () => void;
  setLoading: (isLoading: boolean) => void;
  setMessage: (message: string) => void;
};

const useAdminStoreBase: StateCreator<AdminStore> = (set) => ({
  form: defaultForm,
  loading: false,
  message: "",
  updateField: (field, value) =>
    set((state) => ({ form: { ...state.form, [field]: value } })),
  resetForm: () => set({ form: defaultForm }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setMessage: (message) => set({ message }),
});

export const useAdminStore = create<AdminStore>(useAdminStoreBase);
