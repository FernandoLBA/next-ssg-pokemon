import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemon";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import { GetStaticProps, NextPage } from "next";

/* 

Este componente muestra como trabajar con data estática, una data que siempre
usará este componente, por lo tanto trabaja con SSG (static site generation).

La data en este caso viene traída des el lado del servidor mediante axios y es
inyectada al componente por props.

*/
interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado  de Pokémons">
        <Grid.Container gap={2} justify="flex-start">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </Grid.Container>
    </Layout>
  );
};

/*
Este código se ejecuta en build time del lado del servidor, 
es decir se puede ver por la consola del servidor y
también se ejecuta el fetch antes de que el usuario acceda a esta page.
Al hacer un fetch podemos pasar esa data como props hacia el componente
que está arriba, mediante el return
*/
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  // retorna las props
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
