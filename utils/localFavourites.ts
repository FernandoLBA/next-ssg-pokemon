/**
 * Esta función recibe un id del pokemon de tipo number,
 * y lo almacena en un array de ids en el local storage
 * si existe lo remueve.
 * @param id : number
 */
const toggleFavourite = (id: number): void => {
  let favourites: number[] = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  if (favourites.includes(id)) {
    favourites = favourites.filter((pokeId) => pokeId != id);
  } else {
    favourites.push(id);
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
};

const existsInFavourites = (id: number): boolean => {
  // los componentes de next se ejecutan del lado del servidor
  // por lo tanto al correr en el server no encuentra el objeto window
  // y retorna un false, pero cuando corre en el client si ejecuta
  // la función y trabaja con el localstorage.
  if (typeof window === "undefined") return false;

  const favourites: number[] = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  return favourites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("favourites") || "[]");
};

export default {
  toggleFavourite,
  existsInFavourites,
  pokemons,
};
