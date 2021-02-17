import React from "react";
import SignIn from "./SignIn";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Characters from "./Characters";
import Episodes from "./Episodes";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/forgotpassword" exact component={ForgotPassword} />
      <Route path="/characters" exact component={Characters} />
      <Route path="/episodes" exact component={Episodes} />
    </BrowserRouter>
  );
};

export default App;
