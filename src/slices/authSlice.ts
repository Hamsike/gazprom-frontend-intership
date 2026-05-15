interface AuthState {
  token: string | null;
  isAuth: boolean;
}

 interface AuthActions {
  login: () => void;
  setToken: (token: string) => void
  logout: () => void;
}

export type AuthSlice = AuthState & AuthActions;

const initialState: AuthState = {
  token: null,
  isAuth: false,
};

export const createAuthSlice = (set: any): AuthSlice => ({
  ...initialState,
  login: () => set((state: AuthState) => ({ ...state, isAuth: true })),
  setToken: (token: string) => set((state: AuthState) => ({...state, token})),
  logout: () => set(initialState),
});

