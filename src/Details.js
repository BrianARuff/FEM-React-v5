import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel.js";
import ErrorBoundary from "./ErrorBoundary.js";
import ThemeContext from "./ThemeContext.js";
import { navigate } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.adopt = this.adopt.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    }, console.error);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  adopt() {
    navigate(this.state.url);
  }

  handleFocus() {
    document.getElementById("modal").focus();
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    } else {
      const {
        animal,
        breed,
        location,
        description,
        name,
        media,
        showModal
      } = this.state;
      return (
        <ThemeContext.Consumer>
          {themeHook => {
            return (
              <div className="details">
                <div>
                  <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={media[0].small}
                      style={{ position: "absolute", top: "0", left: "0" }}
                      alt={name}
                    />
                  </div>
                  <h1>{name}</h1>
                  <h2>{`${animal} - ${breed} - ${location}`}</h2>
                  <button
                    onClick={this.toggleModal}
                    style={{ backgroundColor: themeHook[0] }}
                  >
                    Adopt {name}
                  </button>
                  <p>{description}</p>
                  {showModal ? (
                    <Modal>
                      <div style={{ position: "relative" }}>
                        <button
                          aria-label="Close Modal"
                          onClick={this.toggleModal}
                          style={{
                            position: "absolute",
                            right: "0px",
                            top: "-25px",
                            padding: "5px",
                            width: "50px"
                          }}
                        >
                          X
                        </button>
                        <h1 style={{ padding: "20px 0 0 0" }}>
                          Would you like to adopt {name}?
                        </h1>
                        <div className="buttons">
                          <button onClick={this.adopt}>Yes</button>
                          <button
                            aria-label="exit boundary"
                            onClick={this.toggleModal}
                          >
                            No, I&apos;m a monster
                          </button>
                        </div>
                      </div>
                      <button
                        onFocus={this.handleFocus}
                        style={{
                          float: "right",
                          backgroundColor: "white",
                          border: "none",
                          height: "0",
                          width: "0"
                        }}
                        id="exitBoundary"
                        aria-label="exit boundary"
                      ></button>
                    </Modal>
                  ) : null}
                </div>
                <Carousel media={media} />
              </div>
            );
          }}
        </ThemeContext.Consumer>
      );
    }
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
