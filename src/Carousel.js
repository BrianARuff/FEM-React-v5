import React from "react";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      active: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps({ media }) {
    let photos = ["https://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos, thiz: this };
  }

  handleClick(e) {
    this.setState({
      active: Number(e.target.dataset.index)
    });
  }

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <button
              style={{
                background: "none",
                maring: 0,
                padding: 0,
                border: "none"
              }}
              onKeyDown={() => 1}
              key={photo}
              onClick={this.handleClick}
            >
              <img
                data-index={index}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
                src={photo}
                height="100px"
                minwidth="100px"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
}
