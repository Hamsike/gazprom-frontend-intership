import { create } from "zustand";
import { createAuthSlice, type AuthSlice } from "./slices/authSlice";
import { createViewPageSlice, type ViewPageSlice } from "./slices/viewPageSlice";

type AppState = AuthSlice & ViewPageSlice;

export const useAppStore = create<AppState>((set) => ({
  ...createAuthSlice(set),
  ...createViewPageSlice(set)
}));
