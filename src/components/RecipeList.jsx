import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import deleteIcon from '../assets/delete-icon.svg'
import { projectFirestore } from '../firebase/config'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {

  const { mode } = useTheme()

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  const handleClick = (id) => {
    try {
      projectFirestore
        .collection("recipes")
        .doc(id)
        .delete()
    } catch (err) {
      console.log(err.message);
    }

  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
          <img
            className="delete"
            src={deleteIcon}
            alt="recipe delete icon"
            onClick={() => { handleClick(recipe.id) }}
          />
        </div>
      ))}
    </div>
  )
}