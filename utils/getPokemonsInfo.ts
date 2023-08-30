import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonsInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    // solo usamos la data que necesitamos
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    // al momento de buscar un name o id que no exista en la pokeapi
    // esto retornará un null
    return null;
  }
};
