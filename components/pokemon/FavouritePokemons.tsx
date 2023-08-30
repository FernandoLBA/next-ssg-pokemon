import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { FavouriteCardPokemon } from ".";

interface Props {
  favouritePokemons: number[];
}

export const FavouritePokemons: FC<Props> = ({ favouritePokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favouritePokemons.map((id) => (
        <FavouriteCardPokemon pokemonId={id} key={id} />
      ))}
    </Grid.Container>
  );
};
