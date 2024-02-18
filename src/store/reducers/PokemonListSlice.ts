import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../models/Pokemon";
import { RootState } from "../configureStore";


// const initialState: { arrayPokemonCaptured: Pokemon[] } = { arrayPokemonCaptured: [] };

// export enum PokemonReducerAction {
//     'ADD_TO_LIST_POKEMON',
//     'REMOVE_POKEMON_IN_LIST',
// }


// const addPokemonToList = (pokemon: Pokemon) => ({
//     type: PokemonReducerAction.ADD_TO_LIST_POKEMON as const,
//     payload: {  pokemon }
// })

// const removePokemonToList = (pokemonId: Pokemon['id']) => ({
//     type: PokemonReducerAction.REMOVE_POKEMON_IN_LIST as const,
//     payload: { pokemonId }
// })

// export type ActionType = ReturnType<typeof addPokemonToList> | ReturnType<typeof removePokemonToList>

// function pokemonReducer(state = initialState, action: ActionType) {
//     let nextState;
//     switch (action.type) {
//         case PokemonReducerAction.ADD_TO_LIST_POKEMON:
//             nextState = {
//                 ...state,
//                 arrayPokemonCaptured: [...state.arrayPokemonCaptured, action.payload.pokemon],
//             };
//             console.log('[STORE] Add to pokemons captured: ', action.payload.pokemon);
//             return nextState || state;  // Penser a retourner les deux
//         case PokemonReducerAction.REMOVE_POKEMON_IN_LIST:
//             nextState = {
//                 ...state,
//                 arrayPokemonCaptured: state.arrayPokemonCaptured.filter((pokemon: Pokemon) => pokemon.id !== action.payload.pokemonId)
//             };
//             console.log('[STORE] Delete the Pokemon ID: ', action.payload.pokemonId);
//             return nextState || state;
//         default:
//             return state;
//     }
// }




// Define a type for the slice state
export interface PokemonListState {
  arrayPokemonCaptured: Pokemon[]
  isReleasePossible: boolean;
}

// Define the initial state using that type
const initialState: PokemonListState = {
  arrayPokemonCaptured: [],
  isReleasePossible: false,
}

export const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    addPokemonToList: (state, action: PayloadAction<Pokemon>) => {
      state.arrayPokemonCaptured.push(action.payload);
    },
    removePokemonfromList: (state, action: PayloadAction<Pokemon["id"]>) => {
      state.arrayPokemonCaptured = state.arrayPokemonCaptured.filter((pokemon: Pokemon) => pokemon.id !== action.payload);
    },
    setReleasePossible: (state, action: PayloadAction<boolean>) => {
      state.isReleasePossible = action.payload;
    },
  }
});

export const { addPokemonToList, removePokemonfromList, setReleasePossible } = pokemonListSlice.actions;
export const selectPokemonList = (state: RootState) => state.pokemonList.arrayPokemonCaptured;
export default pokemonListSlice.reducer;



// export default pokemonReducer;