import React, {useState, useEffect} from 'react'
import { createHashRouter, RouterProvider, Link, Outlet } from 'react-router-dom'

function PageLayout({user}) {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Patrick's Used Cars</h2>
        <nav>
          <ul>
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/cars">Available Cars</Link></li>
            <li className="nav-item"><Link to="/sell">Sell Your Car</Link></li>
            <li className="nav-item"><Link to="/reviews">Reviews</Link></li>
          </ul>
        </nav>
        {!user ? (
          <a href="/auth/github" id="login-button" className="btn bg-light">Log In (GitHub)</a>
        ): (
          <p>Logged in as {user.displayName || user.username}</p>
        )}
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <section id="page-home" className="page">
      <header>
        <h1 className="title">Patrick's Used Cars</h1>
        <h2 className='tagline'>Great Used Cars at Great Prices</h2>
      </header>
      <img src="Used_Cars.jpg" alt="Image of Used Cars" id="car-image" />
      <p>Welcome to Patrick's Used Cars!</p>
      <p>Browse our selection or let us inspect your car to determine its Miles Per Gallon (MPG) so we can give you an estimated price!</p>
    </section>
  )
}

function CarPage() {
  return (
    <section id="page-cars" className="page">
      <h2>Available Cars</h2>
        <table className="available-cars">
          <thead>
            <tr>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>MPG</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Honda Odyssey</td>
              <td>2010</td>
              <td>Blue</td>
              <td>25</td>
              <td>$17000</td>
            </tr>
            <tr>
              <td>Toyota Corolla</td>
              <td>1998</td>
              <td>Silver</td>
              <td>18</td>
              <td>$5000</td>
            </tr>
            <tr>
              <td>Ford Mustang</td>
              <td>2005</td>
              <td>Red</td>
              <td>22</td>
              <td>$11500</td>
            </tr>
            <tr>
              <td>Subaru Outback</td>
              <td>2012</td>
              <td>Green</td>
              <td>28</td>
              <td>$21000</td>
            </tr>
            <tr>
              <td>Chevrolet Civic</td>
              <td>2002</td>
              <td>Black</td>
              <td>16</td>
              <td>$5000</td>
            </tr>
            <tr>
              <td>Mazda 3</td>
              <td>2018</td>
              <td>White</td>
              <td>32</td>
              <td>$28000</td>
            </tr>
            <tr>
              <td>Jeep Wrangler</td>
              <td>1995</td>
              <td>Yellow</td>
              <td>12</td>
              <td>$5000</td>
            </tr>
            <tr>
              <td>Hyundai Elantra</td>
              <td>2022</td>
              <td>Grey</td>
              <td>30</td>
              <td>$28000</td>
            </tr>
          </tbody>
        </table>
    </section>
  )
}

function SellPage({ carEstimates, sellCar, setSellCar, submitCar, deleteCar }) {
  return (
    <section id="page-sell" className="page">
      <h2>Sell Us Your Car!</h2>
      <p>Enter some details about your car!</p>
      <p>We will determine the Miles Per Gallon and give a price estimate!</p>
      <p>See what your friends' cars are worth too while you're at it!</p>
      <form onSubmit={submitCar} className="mb-5">
        <input type='text' id='model' placeholder='Enter Model' required value={submitCar.model} onChange={(e) => setSellCar({ ...sellCar, model: e.target.value })} />
        <input type='number' id='year' placeholder='Enter Year' required value={submitCar.year} onChange={(e) => setSellCar({ ...sellCar, year: e.target.value })} min="1900" max="2026" />
        <input type='text' id='color' placeholder='Enter Color' required value={submitCar.color} onChange={(e) => setSellCar({ ...sellCar, color: e.target.value })} />
        <button className="submit">Submit</button>
      </form>
      <div id="car-estimates" className="list-group">
        <ul className="oneCar">
          {carEstimates.map((car, index) => (
              <li key={index}>
                Model: {car.model}, Year: {car.year}, Color: {car.color}, MPG: {car.mpg}, {' '}
                <span>Our Price: ${car.price}</span>
                <button onClick={() => deleteCar(index)} className="delete-button">Delete</button>
              </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReviewsPage({ reviews, reviewComment, setReviewComment, submitReview }) {
  return (
    <section id="page-reviews" className="page">
      <h2>Leave a Review!</h2>
      <p>Let your voice be heard! Leave a review so we can improve!</p>
      <form onSubmit={submitReview} id="review-form" className="d-flex flex-row align-items-center mb-5 gap-3">
        <textarea id="review-textbox" placeholder="Write review..." required value={submitReview.reviewComment} onChange={(e) => setReviewComment(e.target.value)}></textarea>
        <button type="submit" className="submit">Submit</button>
      </form>
      <div>
        {reviews.map((r, index) => (
          <div key={index} className="list-group-item d-flex align-items-flex-start text-start gx-3  border border-black">
            <img src="/blank-pfp.png" width="60" height="60" className="rounded-circle" />
            <div>
              <h4>{r.displayName}</h4>
              <p className="text-wrap">{r.comment}</p>
              <p>{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])
  const [carEstimates, setCarEstimates] = useState(
    [
      { model: 'Toyota', year: 1999, color: 'red', mpg: 23, price: 9500 },
      { model: 'Honda', year: 2004, color: 'blue', mpg: 30, price: 24000 },
      { model: 'Ford', year: 1987, color: 'grey', mpg: 14, price: 5000 }
    ]
  )
  const [reviewComment, setReviewComment] = useState('')
  const [sellCar, setSellCar] = useState({ model:'', year:'', color:'' })

  useEffect(() => {
    checkAuth()
    loadReviews()
  })

  const checkAuth = async function() {
    try {
      const response = await fetch('/api/user')
      const loggedIn = await response.json()

      if (loggedIn.authenticated) {
        setUser(loggedIn.user)
      }
    }
    catch (err) {
      console.error('Could not fetch auth from server.js: ', err)
    }
  }

  const loadReviews = async function() {
    try {
      const response = await fetch('/api/reviews')
      if (!response.ok) return
      const reviews = await response.json()
      setReviews(reviews)
    }
    catch (err) {
      console.error('Could not fetch reviews from database: ', err)
    }
  }

  const submitReview = async function( event ) {
    if (event) event.preventDefault()
  
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: reviewComment })
    })
  
    if (response.ok) {
      setReviewComment('')
      await loadReviews()
    }
    else {
      alert("Failed to submit, are you logged in?")
    }
  }

  const calculateStats = function( yearString ) {
    const year = parseInt(yearString, 10)
    let max_mpg, min_mpg = 0
  
    if (year <= 2000) {
      max_mpg = 25
      min_mpg = 10
    }
    else if (year <= 2010) {
      max_mpg = 30
      min_mpg = 15
    }
    else {
      max_mpg = 35
      min_mpg = 20
    }
  
    const mpg = Math.floor(Math.random() * (max_mpg - min_mpg)) + min_mpg
  
    let price = mpg * (1000) - ( (2026 - year) * 500 )
  
    if ( price < 5000 ) { price = 5000 }
  
    return { mpg, price }
  }

  const submitCar = async function( event ) {
    if (event) event.preventDefault()
    
    const { mpg, price } = calculateStats( sellCar.year )
    
    const newCar = {
      model: sellCar.model,
      year: sellCar.year,
      color: sellCar.color,
      mpg: mpg,
      price: price
    }

    setCarEstimates([...carEstimates, newCar])
    setSellCar({ model:'', year:'', color:'' })
  }

  const deleteCar = async function ( index ) {
    setCarEstimates(carEstimates.filter((_, i) => i !== index))
  }

  const router = createHashRouter([
    {
      path:'/',
      element: <PageLayout user={user} />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/cars', element: <CarPage /> },
        { path: '/sell', element: <SellPage carEstimates={carEstimates} sellCar={sellCar} setSellCar={setSellCar} submitCar={submitCar} deleteCar={deleteCar} /> },
        { path: '/reviews', element: <ReviewsPage reviews={reviews} reviewComment={reviewComment} setReviewComment={setReviewComment} submitReview={submitReview} /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App