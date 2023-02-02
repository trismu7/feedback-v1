import { useState } from "react";
import { db } from "./firebase";

export function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [radioOption, setRadioOption] = useState("");
  const [dropdownOption, setDropdownOption] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    db.collection("form-r01")
      .add({
        firstName: firstName,
        lastName: lastName,
        nota: radioOption,
        servico: dropdownOption,
      })
      .then(() => {
        alert("Message submitted.");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid">
        <label htmlFor="firstname">
          First name
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label htmlFor="lastname">
          Last name
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <fieldset
        style={{
          display: "flex",
          justifyContent: "space-around",
          lineHeight: "110%",
        }}
      >
        <legend>Nota</legend>
        <label htmlFor="nota1">
          <input
            type="radio"
            name="nota1"
            value="1"
            checked={radioOption === "1"}
            onChange={(event) => setRadioOption(event.target.value)}
          />
          1
        </label>
        <label htmlFor="nota2">
          <input
            type="radio"
            name="nota2"
            value="2"
            checked={radioOption === "2"}
            onChange={(event) => setRadioOption(event.target.value)}
          />
          2
        </label>
        <label htmlFor="nota3">
          <input
            type="radio"
            name="nota3"
            value="3"
            checked={radioOption === "3"}
            onChange={(event) => setRadioOption(event.target.value)}
          />
          3
        </label>
        <label htmlFor="nota4">
          <input
            type="radio"
            name="nota4"
            value="4"
            checked={radioOption === "4"}
            onChange={(event) => setRadioOption(event.target.value)}
          />
          4
        </label>
        <label htmlFor="nota5">
          <input
            type="radio"
            name="nota5"
            value="5"
            checked={radioOption === "5"}
            onChange={(event) => setRadioOption(event.target.value)}
          />
          5
        </label>
      </fieldset>

      <legend>Serviço</legend>
      <select
        required
        value={dropdownOption}
        onChange={(e) => setDropdownOption(e.target.value)}
      >
        <option selected={true}>Selecione um serviço</option>
        <option value="servico-01">Serviço 01</option>
        <option value="servico-02">Serviço 02</option>
        <option value="servico-03">Serviço 03</option>
        <option value="servico-04">Serviço 04</option>
        <option value="servico-05">Serviço 05</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
