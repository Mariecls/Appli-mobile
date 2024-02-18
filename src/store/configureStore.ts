import { configureStore } from '@reduxjs/toolkit'
import pokemonListSlice from './reducers/PokemonListSlice'

const store = configureStore({
    reducer: {
        pokemonList: pokemonListSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store