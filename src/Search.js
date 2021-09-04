import React, { useState } from "react";

export default function Search(props) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.updateSelectedCity(city);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="Search"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Which city are You looking for?"
          onChange={updateCity}
        />
        <input
          type="submit"
          className="btn btn-primary"
          autoComplete="off"
          value="Search"
        />
      </div>
    </form>
  );
}
