import React from "react";
import { useState } from "react";
import { offButton, OffTable } from "./api.js";
import "./styles.css";

export function Offence() {
  //const {loading, offence} = offLoading();
  const [query, setQuery] = useState(null);
  const [alert, setAlert] = useState(null);
  return (
    <main className="Container">
      <div>
        <h1>Offence</h1>
        {offButton((result, status) =>{
          if (status ==='fail'){
            setAlert(result);
          }
          else {
            setQuery(result);
          }
          })}
        {alert != null ? <p>{alert}</p> : null}
        {query != null ? <div className="offenceTable"><OffTable data={query} /></div> : <p>Loading...</p>}
        <table />
      </div>
    </main>
  );
}

export default Offence;
