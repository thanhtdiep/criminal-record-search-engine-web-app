import React from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function regFetch(emailInput, passwordInput, cb) {
  fetch("https://cab230.hackhouse.sh/register", {
    method: "POST",
    body: "email=" + emailInput + "&password=" + passwordInput,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function (response) {
      if (response.ok) {
        //cb(response.message, "success");
        return response.json().then(json => {
          cb(json, "sucess");
          console.log(json.message);
        });
      }
      response.json().then(json => {
        cb(json, "error");
        console.log(json.message);
      });
      // throw new Error(response.json());
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

export function logFetch(emailInput, passwordInput, cb) {
  fetch("https://cab230.hackhouse.sh/login", {
    method: "POST",
    body: "email=" + emailInput + "&password=" + passwordInput,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function (response) {
      if (response.ok) {
        return response.json().then(json => {
          cookies.set('JWT', json.token);
          //JWT = json.token;
          cb(
            "You have logged in successfully! Your access token is now saved",
            "success"
          );
          console.log(json);
        });
      }
      response.json().then(json => {
        cb(json, "error");
        console.log(json);
      });
      throw new Error("Network response was not ok");
    })
    .catch(function (error) {
      console.log("There has been a problem with your fetch operation");
    });
}

export function offButton(cb) {
  fetch("https://cab230.hackhouse.sh/offences")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      cb(response.message, "fail");
      throw new Error("Network response was not ok.");
    })
    .then(function (result) {
      cb(JSON.stringify(result));
    })
    .then(articles =>
      articles.map(article => ({
        offence: article.offence
      }))
    )
    .catch(function (error) {
      console.log("There has been a problem with your feth operation");
    });
}

export function areasFetch(cb, filter) {
  fetch("https://cab230.hackhouse.sh/" + filter)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      cb(response.message, "fail");
      throw new Error("Network response was not ok.");
    })
    .then(function (result) {
      console.log(result)
      cb(JSON.stringify(result));
    })
    .then(articles =>
      articles.map(article => ({
        area: article.area
      }))
    )
    .catch(function (error) {
      console.log("There has been a problem with your feth operation");
    });
}

export function serButton(serKey, cb) {
  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${cookies.get('JWT')}` };
  getParam.headers = head;

  //The URL
  const baseUrl = "https://cab230.hackhouse.sh/search?";
  const query = "offence=" + serKey;
  const url = baseUrl + query;

  fetch(encodeURI(url), getParam)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (result) {
      cb(JSON.stringify(result));
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

export function cookiesGetter() {
  return cookies.get('JWT');
}

export function filBtn(serKey, area, age, gender, year, cb) {
  let filter = "";
  if (area !== '') {
    filter += "&area=" + area;
  }
  if (age !== '') {
    filter += "&age=" + age;
  }
  if (gender !== '') {
    filter += "&gender=" + gender;
  }
  if (year !== '') {
    filter += "&year=" + year;
  }
  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${cookies.get('JWT')}` };
  getParam.headers = head;

  //The URL
  const baseUrl = "https://cab230.hackhouse.sh/search?";
  const query = "offence=" + serKey;
  const url = baseUrl + query + filter;

  fetch(encodeURI(url), getParam)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (result) {
      cb(JSON.stringify(result));
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

export function OffTable(props) {
  const title = JSON.parse(props.data).offences;
  //return null;
  return (
    <table id="table">
      <thead>
        <tr>
          <th>Offences</th>
        </tr>
      </thead>
      <tbody>
        {title.map(element => (
          <tr>
            <td key={element.id}>{element}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export function logOut() {
  cookies.remove('JWT');
  window.location.replace("/Login");
}
