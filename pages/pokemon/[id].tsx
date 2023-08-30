import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

import confetti from "canvas-confetti";

import { Layout } from "@/components/layouts";
import { type Pokemon } from "@/interfaces";
import { getPokemonsInfo, localFavourites } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavourites, setIsInFavourites] = useState<boolean>(
    localFavourites.existsInFavourites(pokemon.id)
  );

  // trata los favoritos
  const onToggleFavourite = () => {
    localFavourites.toggleFavourite(pokemon.id);
    setIsInFavourites(!isInFavourites);

    if (isInFavourites) return;

    confetti({
      zIndex: 999,
      particleCount: 1000,
      spread: 400,
      angle: -10,
      origin: {
        x: 0.9,
        y: 0.2,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color="gradient"
                ghost={isInFavourites}
                onClick={onToggleFavourite}
              >
                {isInFavourites ? "Remover de" : "Guardar en"} favoritos
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container
                direction="row"
                display="flex"
                css={{ justifyContent: "space-between" }}
                gap={0}
              >
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // esto solo genera un array de numeros del 1 al 151 en strings
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    // esos numeros seran inyectados como params con ids
    paths: pokemon151.map((id) => ({ params: { id } })),
    // si no existe unregistro devolverá un 404
    fallback: false,
  };
};

// cuando usamos params dinámicos, se debe usar getStaticPaths para poder enviar las props
// la data que se maneja debe ser bien tratada ya que se almacena en el disco duro.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  // retorna las props
  return {
    props: {
      pokemon: await getPokemonsInfo(id),
    },
  };
};

export default PokemonPage;
