import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AgeSort from './AgeSort.jsx'
import SignIn from './SignIn.jsx'
import AllData from './AllData.jsx'
import SignInFailed from './SignInFailed.jsx'


function App() {
  const [currentPage, setPage] = useState("SignIn");

  if (currentPage === "SignIn") {
    return <SignIn onSignIn={() => setPage("AgeSort")}
                   onSignInFailed={() => setPage("SignInFailed")}
                    onCreateAccount={() => setPage("AgeSort")}/>
  }
  if (currentPage === "SignInFailed") {
    return <SignInFailed returnSignIn={() => setPage("SignIn")}/>
  }
  if (currentPage === "AgeSort") {
    return <AgeSort allDataRedirect={() => setPage("AllData")}
                   onSignOut={() => setPage("SignIn")}/>
  }
  if (currentPage === "AllData") {
    return <AllData userDataRedirect={() => setPage("AgeSort")}
                   onSignOut={() => setPage("SignIn")}/>
  }
}

export default App;
