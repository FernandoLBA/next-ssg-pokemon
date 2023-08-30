import { Grid, Link, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="icono de la app"
        width={70}
        height={70}
      />

      {/* passHref le pasa el atributo href a su hijo. */}
      <NextLink href="/" passHref>
        <Grid.Container alignItems="center">
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon!
          </Text>
        </Grid.Container>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favourites">
        <Text color="white">Favoritos</Text>
      </NextLink>
    </div>
  );
};
