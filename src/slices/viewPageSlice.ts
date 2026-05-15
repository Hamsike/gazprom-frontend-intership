interface ViewPageState {
  typeView: 'posts' | 'users' | 'user' | 'post'
  id: number | null
}

interface ViewPageActions {
  setView: (type: string, id: number | null) => void
}

export type ViewPageSlice = ViewPageState & ViewPageActions

const initialState: ViewPageState = {
  typeView: 'users',
  id: null
}

export const createViewPageSlice = (set: any): ViewPageSlice => ({
  ...initialState,
  setView: (typeView: string, id: number | null) => set({typeView, id})
})
