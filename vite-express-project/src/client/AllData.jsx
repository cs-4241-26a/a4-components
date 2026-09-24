import { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./SignIn.css";

function AllData({userDataRedirect, onSignOut}) {
  const [users, setUsers] = useState([]);

  async function handleUserDataRedirect() {
        userDataRedirect();
    }

  async function handleSignOut(event, action) {
        onSignOut();
    }


    const ageSortOldest = function() {
        const sortedUsers = [...users].sort(function(user_a, user_b){
            return user_b.age - user_a.age;
        });
        setUsers(sortedUsers);
    }

    const ageSortYoungest = function() {
        const sortedUsers = [...users].sort(function(user_a, user_b){
            return user_a.age - user_b.age;
        });
        setUsers(sortedUsers);
    }

    useEffect(() => {
    fetch('/alldocs')
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [])


  return (
    <>
    <div className="container text-center mt-4">
        <div className="box p-4">
            <h1>Welcome to Age Sort</h1>
            <p>
            Insert you and your friends' Name, Birth Year, and your Class and we will sort by the age you all turn in 2026!
            </p>
        </div>
        </div>
        
        <div className="container text-center mt-4">
      <div className="box p-4">
        <form>
            <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="userdata_redirect" className="btn btn-purple" onClick={handleUserDataRedirect}>Back to User Data</button>
            </div>
        </form>
      </div>
    </div>
    
    <main role="main">
      <div className="container mt-4">
        <div className="box2 p-4">
              <h2>All Users Information</h2>
              <div className="table-responsive">
                <table id="age_table" className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Added By</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Birth Year</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody id="age_table_body">
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.user_class}</td>
                            <td>{user.birth_year}</td>
                            <td>{user.age}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="young_button" className="btn btn-purple" onClick={ageSortYoungest}>Sort Youngest -{'>'} Oldest</button>
                <button type="button" id="old_button" className="btn btn-purple" onClick={ageSortOldest}>Sort Oldest -{'>'} Youngest</button>
                </div>
              </div>
            </div>
      </div>
    </main>
    

    <div className="container text-center mt-4">
      <div className="box p-4">
        <form >
            <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="sign_out_button" className="btn btn-purple" onClick={handleSignOut}>Sign Out</button>
            </div>
        </form>
      </div>
    </div>


    </>

  );
}

export default AllData;
