import { create } from 'zustand'

const useTariffStore = create<ITariffStore>(set => ({}))

export default useTariffStore
