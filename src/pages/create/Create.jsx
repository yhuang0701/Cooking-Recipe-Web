import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'

// styles
import './Create.css'

export default function Create() {

	const [title, setTitle] = useState("")
	const [method, setMethod] = useState("")
	const [cookingTime, setCookingTime] = useState("")
	const [newIngredient, setNewIngredient] = useState("")
	const [ingredients, setIngredients] = useState([])
	const ingredientInput = useRef(null)
	const history = useHistory()
	const { color, mode } = useTheme()

	const { postData, data, error } = useFetch('http://localhost:3000/recipes', "POST")

	const handleAdd = (e) => {
		e.preventDefault()
		const ing = newIngredient.trim()

		// check if duplicate
		if (ing && !ingredients.includes(ing)) {
			setIngredients(prevIngredients => [...prevIngredients, ing])
		}

		setNewIngredient("")
		ingredientInput.current.focus()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(title, method, cookingTime, ingredients)
		postData({ title, ingredients, method, cookingTime: cookingTime + " minutes" })
	}

	// redirect the user when we get a data response
	useEffect(() => {
		if (data) {
			history.push('/')
		}

	}, [data])

	return (
		<div className={`create ${mode}`}>
			<h2 className="page-title">Build a new recipe!</h2>

			<form onSubmit={handleSubmit}>

				<label>
					<span>Recipe title:</span>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>

				<label>
					<span>Recipe ingredients:</span>
					<div className="ingredients">
						<input
							type="text"
							onChange={e => setNewIngredient(e.target.value)}
							value={newIngredient}
							ref={ingredientInput}
						/>
						<button
							onClick={handleAdd}
							className="btn"
							style={{ background: color }}>
							add
						</button>
					</div>
				</label>
				<p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

				<label>
					<span>Recipe method: </span>
					<textarea
						onChange={(e) => setMethod(e.target.value)}
						value={method}
						required
					/>
				</label>

				<label>
					<span>Approximated Cooking Time (minutes):</span>
					<input
						type="number"
						onChange={(e) => setCookingTime(e.target.value)}
						value={cookingTime}
						required
					/>
				</label>

				<button className="btn" style={{ background: color }}>submit</button>

			</form>

		</div>
	)
}