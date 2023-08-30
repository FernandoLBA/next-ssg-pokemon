import { Layout } from "@/components/layouts";
import { FavouritePokemons } from "@/components/pokemon";
import { NoFavourites } from "@/components/ui";
import { localFavourites } from "@/utils";
import { Card, Grid } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";

const FavouritesPage:FC = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavouritePokemons(localFavourites.pokemons());
  }, []);

  return (
    <Layout title="Pokémons Favoritos">
      {favouritePokemons.length === 0 ? (
        <NoFavourites />
      ) : (
        <FavouritePokemons favouritePokemons={favouritePokemons}/>
      )}
    </Layout>
  );
};

export default FavouritesPage;
