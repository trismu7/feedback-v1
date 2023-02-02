import { useState } from "react";
import { db } from "./firebase";

interface ResponseItem {
  firstName: string;
  lastName: string;
  telefone: string;
  nota: string;
  servico: string;
}

export function Form() {
  const [firstName, setFirstName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [lastName, setLastName] = useState("");
  const [radioOption, setRadioOption] = useState("");
  const [dropdownOption, setDropdownOption] = useState("");
  const [info, setInfo] = useState([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const respostasEnviadas = db.collection("form-r01");

    await respostasEnviadas.doc(telefone).set({
      firstName: firstName,
      lastName: lastName,
      telefone: telefone,
      nota: radioOption,
      servico: dropdownOption,
    });

    setFirstName("");
    setTelefone("");
    setLastName("");
    setRadioOption("");
    setDropdownOption("");
  }

  async function handleGet() {
    const respostasRecebidas = await db.collection("form-r01").get();

    console.log(respostasRecebidas.docs.map((doc) => doc.data()));

    const result = respostasRecebidas.docs.map((doc) => doc.data());

    if (!result) {
      console.error("error: Empty result");
    } else {
      setInfo(result as []);
    }
  }

  return (
    <>
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

        <label htmlFor="telefone">
          Telefone
          <input
            type="text"
            name="telefone"
            placeholder="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>

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
          <option value="" disabled>
            Selecione um serviço
          </option>
          <option value="servico-01">Serviço 01</option>
          <option value="servico-02">Serviço 02</option>
          <option value="servico-03">Serviço 03</option>
          <option value="servico-04">Serviço 04</option>
          <option value="servico-05">Serviço 05</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <button onClick={handleGet}>Get</button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          border: "2px solid #2d4150",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <p>Respostas:</p>
        {info.map((item: ResponseItem) => (
          <div
            style={{
              display: "flex",
              gap: "2rem",
              borderBottom: "2px solid #364c5e",
              marginBottom: "1rem",
              minWidth: "55%",
            }}
          >
            <p>
              Nome: <strong>{item.firstName}</strong>
            </p>
            <p>
              Sobrenome: <strong>{item.lastName}</strong>
            </p>
            <p>
              Serviço: <strong>{item.servico}</strong>
            </p>
            <p>
              Nota: <strong>{item.nota}</strong>
            </p>
            <p>
              Telefone: <strong>{item.telefone}</strong>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

//create/update specified collection, generates random ID to the doc containing the info

// db.collection("form-r01")
//   .add({
//     firstName: firstName,
//     lastName: lastName,
//     nota: radioOption,
//     servico: dropdownOption,
//   })
//   .then(() => {
//     alert("Message submitted.");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// create/set specified doc

// const citiesRef = db.collection("cities");
// await citiesRef.doc("SF").set({
//   name: "San Francisco",
//   state: "CA",
//   country: "USA",
//   capital: false,
//   population: 860000,
// });

//get data from specified doc

// const cityRef = db.collection("cities").doc("SF");
// const doc = await cityRef.get();
// if (!doc.exists) {
//   console.log("No such document!");
// } else {
//   const responseData = doc.data();
//   console.log("Document data:", responseData?.name);
// }
