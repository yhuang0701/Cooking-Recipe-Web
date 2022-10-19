import { useState } from 'react'
import { useHistory } from 'react-router-dom'

// styles
import './Searchbar.css'

export default function Searchbar() {

  const [term, setTerm] = useState("")
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setTerm("")
    history.push(`/search?q=${term}`)
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={e => setTerm(e.target.value)}
          value={term}
          required
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  )
}