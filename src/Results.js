import React from "react";
import Pet from "./Pet.js";
import Carousel from "./Carousel";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h1>No pets found</h1>
      ) : (
        pets.map(pet => {
          return (
            <React.Fragment key={pet.id || Math.random() * 10000000000}>
              <Pet
                animal={pet.type}
                name={pet.name}
                breed={pet.breeds.primary}
                media={pet.photos}
                location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
                id={pet.id}
                style={{ border: "1px solid black", margin: "20px 0" }}
              />
              <Carousel media={pet.photos} />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};

export default Results;
