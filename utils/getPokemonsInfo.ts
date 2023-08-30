import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonsInfo = async(nameOrId: string) =>{
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  // solo usamos la data que necesitamos
  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
} 