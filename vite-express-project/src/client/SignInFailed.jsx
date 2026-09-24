import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./SignIn.css";

function SignInFailed({ returnSignIn }) {
    async function handleSubmit() {
        returnSignIn();
    }
    
    return (
    <>
    <main role="main">
      <div className="container text-center mt-4">
        <div className="box p-4">
          <h1>Sign in Error</h1>
            <p>
            Sign in Failed<br/>
            Account does not exist, Password is incorrect, or you've <br/>
            attempted to create an already existent account
            </p>
        </div>
      </div>
    </main>
    

     <div className="container text-center mt-4">
      <div className="box p-4">
        <form action="/signin_redirect" method="POST">
            <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="signin_redirect" className="btn btn-purple" onClick={handleSubmit}>Back to Sign In</button>
            </div>
        </form>
      </div>
    </div>
    </>
  );
}
 
    


export default SignInFailed;
