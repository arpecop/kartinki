import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);

    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div class="container">
      <>
        {!login && (
          <FacebookLogin
            appId="281985576166744"
            autoLoad={false}
            fields="name,email"
            callback={responseFacebook}
            icon="fa-facebook"
          />
        )}

        {login && (
          <>
            {data.name}
            {data.email}
          </>
        )}
      </>
    </div>
  );
}

export default App;
