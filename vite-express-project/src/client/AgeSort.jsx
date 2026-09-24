import { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./SignIn.css";

function AgeSort({allDataRedirect, onSignOut}) {
  const [name, setName] = useState('');
  const [birth_year, setbirth_year] = useState('');
  const [user_class, setuser_class] = useState('');
  const [users, setUsers] = useState([]);

  const [editName, setEditName] = useState('');
  const [editbirth_year,setEditbirth_year] = useState('');
  const [edituser_class, setEdituser_class] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  
  async function handleSubmit(event, action) {
    event.preventDefault()
    let userInfo = {
    name: name,
    birth_year: birth_year,
    user_class: user_class,
    };

    const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })

  console.log("status:", response.status)

  if (response.ok) {
    const data = await response.json()
    console.log("new user:", data)

    setUsers(prevUsers => [...prevUsers, data])
  } else {
    console.log("Submit failed")
  }
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

    const deleteUser = async function(id) {
        const response = await fetch('/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id
            })
        })
        if (response.ok) {
            setUsers(users.filter(user => user._id !== id));
        }
    }

    const editUser = function(user) {
        setEditingUser(user);
        setEditName(user.name);
        setEditbirth_year(user.birth_year);
        setEdituser_class(user.user_class);
    }

    const handleUpdate = async (event) => {
      event.preventDefault();
      const response = await fetch('/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: editingUser._id,
          name: editName,
          birth_year: editbirth_year,
          user_class: edituser_class
        })
      });

      if (response.ok) {
        const updatedUser = {
          ...editingUser,
          name: editName,
          birth_year: Number(editbirth_year),
          user_class: edituser_class,
          age: 2026 - Number(editbirth_year)
        };

        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === editingUser._id ? updatedUser : user
          )
        );

        setEditingUser(null);
      } else {
        console.log("Update failed:", response.status);
      }
    };

    useEffect(() => {
    fetch('/docs')
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [])
    
    const closeForm = () => {
        setEditingUser(null);
    }   

  async function handleAllDataRedirect() {
      allDataRedirect();
    }

  async function handleSignOut() {
     onSignOut();
    }
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
        
        <main role="main">
        <div className="container mt-4">
            <div className="box2 p-4">
                <h2>My Information</h2>
            <form id="user_form"  onSubmit={handleSubmit}>
            <fieldset>
              <legend>Insert New User Information</legend>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name *:</label>
                <input type="text" id="name" name="name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="birth_year" className="form-label">Birth Year *:</label>
                <input type="number" id="birth_year" name="birth_year" min="0" max="2026" className="form-control" value={birth_year} onChange={(event) => setbirth_year(event.target.value)} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="user_class" className="form-label">
                  <span>Class *:</span>
                </label>
                <select id="user_class" name="user_class" className="form-select" value={user_class} onChange={(event) => setuser_class(event.target.value)} required>
                  <option value="" disabled>Select a Class</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Grad Student">Grad Student</option>
                  <option value="Not in School">Not in School</option>
                </select>
              </div>
              <p className="button">
                <button type="submit" className="btn btn-primary btn-purple" >Submit!</button>
              </p>
            </fieldset>
          </form>
        </div>
      
      </div>
    </main>


    <div className="container mt-4">
      <div className="box2 p-4">
            <h2>My User Information</h2>
            <div className="table-responsive">
              <table id="age_table" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Birth Year</th>
                    <th>Age</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody id="age_table_body">
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.user_class}</td>
                            <td>{user.birth_year}</td>
                            <td>{user.age}</td>
                            <td>
                                <button type="submit" className="btn btn-primary btn-purple" onClick={() => deleteUser(user._id)}>Delete</button>
                                
                            </td>
                            <td>
                                <button type="submit" className="btn btn-primary btn-purple" onClick={() => editUser(user)}>Edit</button>
                            </td>
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

    <div className="container text-center mt-4">
      <div className="box p-4">
        <form>
            <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="allDataRedirect" className="btn btn-purple" onClick={handleAllDataRedirect}>All User Data</button>
            </div>
        </form>
      </div>
    </div>


    <div className="container text-center mt-4">
      <div className="box p-4">
        <form>
            <div className="d-flex justify-content-center align-items-center gap-3">
                <button type="button" id="sign_out_button" className="btn btn-purple" onClick={handleSignOut}>Sign Out</button>
            </div>
        </form>
      </div>
    </div>


    {editingUser && (
      <div className="box2 p-4" id="editFormDiv">
        <form id="editForm" className="form-container" onSubmit={handleUpdate}>
          <fieldset>
            <legend>Insert New Information</legend>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name *:</label>
              <input type="text" id="newName" name="newName" className="form-control" value={editName} onChange={(event) => setEditName(event.target.value)} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="birth_year" className="form-label">Birth Year *:</label>
              <input type="number" id="newbirth_year" name="newbirth_year" min="0" max="2026" className="form-control" value={editbirth_year} onChange={(event) => setEditbirth_year(event.target.value)} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="newuser_class" className="form-label">
                <span>Class* :</span>
              </label>
              <select id="editClass" name="editClass" className="form-select" value={edituser_class} onChange={(event) => setEdituser_class(event.target.value)}>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Grad Student">Grad Student</option>
                <option value="Not in School">Not in School</option>
              </select>
            </div>
            <p className="button">
              <button type="submit" className="btn btn-primary btn-purple" id="save_update">Update</button>
            </p>
            <button type="button" className="btn btn-primary btn-purple cancel" onClick={closeForm}>Close</button>
          </fieldset>
        </form>
    </div>
    )}
    


    </>

  );
}

export default AgeSort;
