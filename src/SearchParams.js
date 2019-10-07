import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [themeHookColor, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  function changeTheme() {
    return "green";
  }

  return (
    <ThemeContext.Consumer>
      {({ theme, changeTheme }) => {
        return (
          <div className="search-params">
            <form
              onSubmit={e => {
                e.preventDefault();
                requestPets();
              }}
            >
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  value={location}
                  placeholder="Location"
                  onChange={e => setLocation(e.target.value)}
                />
              </label>
              <AnimalDropdown />
              <BreedDropdown />
              <label htmlFor="theme">
                Theme
                <select
                  value={themeHookColor}
                  onChange={e => setTheme(e.target.value)}
                  onBlur={e => setTheme(e.target.value)}
                >
                  <option value="peru">Peru</option>
                  <option value="darkblue">Dark Blue</option>
                  <option value="mediumorchid">Medium Orchid</option>
                  <option value="chartreuse">Chartreuse</option>
                </select>
              </label>
              <button
                onTouchMove={changeTheme}
                style={{ backgroundColor: themeHookColor }}
              >
                Submit
              </button>
            </form>
            <Results style={{ padding: "20px" }} pets={pets} />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default SearchParams;
