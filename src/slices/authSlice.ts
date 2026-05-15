interface AuthState {
  token: string | null;
  isAuth: boolean;
}

 interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}

export type AuthSlice = AuthState & AuthActions;

const initialState: AuthState = {
  token: null,
  isAuth: false,
};

export const createAuthSlice = (set: any): AuthSlice => ({
  ...initialState,
  login: (token: string) => set({ token, isAuth: true }),
  logout: () => set(initialState),
});

