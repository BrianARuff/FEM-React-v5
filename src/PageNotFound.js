import React from "react";

const PageNotFound = props => {
  return (
    <React.Fragment>
      <h1 style={{ color: "red" }}>Page Not Found</h1>
      <p>{JSON.stringify(props || "", null, 4)}</p>
    </React.Fragment>
  );
};

export default PageNotFound;
