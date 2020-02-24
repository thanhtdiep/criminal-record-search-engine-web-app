import React from "react";
import { serButton, filBtn, cookiesGetter, areasFetch } from "./api";
import { useState } from "react";
import Cookies from 'universal-cookie';
import Chart from './Chart';
import Map from './Map';
import Select from 'react-select';

import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps";

const cookies = new Cookies();

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <form className="search-form">
        <input
          aria-labelledby="search-button"
          className="serBarInput"
          name="search"
          id="search"
          type="search"
          value={innerSearch}
          onChange={e => {
            if (e.target.value === null) {
              setInnerSearch(null);
            }
            else {
              setInnerSearch(e.target.value);
              props.onChange(e.target.value);
            }
          }}
        />
        <button
          id="search-button"
          className="serBarInput"
          type="button"
          onClick={() => {
            if (innerSearch != null) {
              serButton(innerSearch, (result) => {
                props.onSubmit(result);
              })
            } else {
              props.data("Please enter your search key!");
            };
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

function AreasDropdown(props) {
  const [option, setOption] = useState('');
  const content = props.data.areas;
  if (content[0] !== '')
    content.unshift('');
  return (
    <>
      <select value={option} className="select-css"
        onChange={e => {
          setOption(e.target.value);
          props.onChange(e.target.value);
        }}
      >
        {content.map(element => (
          <option key={element.id} value={element} >{element}</option>
        ))}
      </select>
    </>
  )
}

function AgesDropdown(props) {
  const [option, setOption] = useState('');
  const content = props.data.ages;
  if (content[0] !== '')
    content.unshift('');
  return (
    <>
      <select value={option}
        onChange={e => {
          setOption(e.target.value);
          props.onChange(e.target.value);
        }}
        className="select-css">
        {content.map(element => (
          <option key={element.id} value={element}>{element}</option>
        ))}
      </select>
    </>
  )
}

function GendersDropdown(props) {
  const [option, setOption] = useState('');
  const content = props.data.genders;
  if (content[0] !== '')
    content.unshift('');
  return (
    <>
      <select value={option} className="select-css"
        onChange={e => {
          setOption(e.target.value);
          props.onChange(e.target.value);
        }}
      >
        {content.map(element => (
          <option key={element.id} value={element}>{element}</option>
        ))}
      </select>
    </>
  )
}

function YearsDropdown(props) {
  const [option, setOption] = useState('');
  const content = props.data.years;
  if (content[0] !== '')
    content.unshift('');
  return (
    <>
      <select value={option} className="select-css"
        onChange={e => {
          setOption(e.target.value);
          props.onChange(e.target.value);
        }}
      >
        {content.map(element => (
          <option key={element.id} value={element}>{element}</option>
        ))}
      </select>
    </>
  )
}

export function Search() {
  const [query, setQuery] = useState(null);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  const API_KEY = 'AIzaSyBQgoNiN7YWZpTJUGaVONNClZFKi1B8PW0';
 
  //{/* Get data for areas */}
  areasFetch((result) => {
    cookies.set('area', result);}
     ,"areas");
  //{/* Get data for ages */}
  areasFetch((result) => {
    cookies.set('age', result);
  }, "ages");
  //{/* Get data for genders */
  areasFetch((result) => {
    cookies.set('gender', result);
  }, "genders");
  //{/* Get data for years */}
  areasFetch((result) => {
    cookies.set('year', result);
  }, "years");

  if (cookiesGetter() !== null) {
    return (<h1>Please login, then you can have access to this feature</h1>);
  } else {
    return (
      <main className="Container">
        <div>
          <h1>Search</h1>
          <SearchBar data={setAlert} onSubmit={setQuery} onChange={setSearch} />
          <div>
            <div className="filterBtn">
              <p>Area</p>
              <AreasDropdown data={cookies.get('area')} onChange={setArea} />
              <p>Age </p>
              <AgesDropdown data={cookies.get('age')} onChange={setAge} />
              <p>Gender </p>
              <GendersDropdown data={cookies.get('gender')} onChange={setGender} />
              <p> Year </p>
              <YearsDropdown data={cookies.get('year')} onChange={setYear} />
            </div>
            <div className="filterBtn">
              <button onClick={() => {
                filBtn(search, area, age, gender, year, (result) => {
                  setQuery(result);
                })
              }}>Apply Filters</button>
            </div>
          </div>

          {/* Charts */}
          <div>
            {query != null ? < Chart data={query} /> : null}
            {alert != null ? <p>{alert}</p> : null}
          </div>
          <div className="map">
            {query != null ?
              <WrappedMap
                data={query}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
        &key=${API_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              : null}
          </div>
        </div>
      </main>
    );
  }
}
export default Search;
