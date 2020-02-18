import React from "react";
import { useState } from "react";
import { logFetch, cookiesGetter } from "./api.js";
import "./styles.css";

export function Login() {
  const [name, setName] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(null);
  if (cookiesGetter() != null) {
    return (<h1>Please logout, then you can register a new account</h1>);
  } else {
    return (
      <main>
        <div className="Form">
          {error != null ? <div className="alert">
            <span class="closebtn" onClick={() => setError(null)}>&times;</span>
            {error} </div> : null}
          <h1>Login</h1>
          <form className="form-log"
            onSubmit={event => {
              event.preventDefault();
              //  fetch here
              logFetch(
                event.target.elements.name.value,
                event.target.elements.password.value,
                (result, status) => {
                  if (status === "success") {
                    setError(result);
                    window.location.replace("/Offence");
                    this.context.router.history.push("/Offence");
                  } else if (status === "error") {
                    setError(result.message);
                  }
                }
              );
            }}
          >
            <div>
              <img
                src="https://img.icons8.com/windows/32/000000/gender-neutral-user.png"
                alt="A login icon on the Internet"
              />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Email"
              value={name}
              onChange={event => {
                const { value } = event.target;
                if (
                  !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                    value
                  )
                ) {
                  setError("Email should have @xxx.xxx.xx");
                } else {
                  setError(null);
                }
                setName(value);
              }}
            />{" "}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={pass => {
                setPassword(pass.target.value);
              }}
            />{" "}
            <br />
            <br />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
        <div className="spacing" />
      </main>
    );
  }
}
export default Login;
