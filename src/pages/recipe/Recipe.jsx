import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'

export default function Recipe() {

  const { id } = useParams()
  // const url = 'http://localhost:3000/recipes/' + id
  // const { error, isPending, data: recipe } = useFetch(url);
  const { mode } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)

    projectFirestore
      .collection('recipes')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          setIsPending(false)
          setRecipe(doc.data())
        } else {
          setIsPending(false)
          setError("Could not find this recipe")
        }
      })
      .catch(err => {
        setError(err.message)
        setIsPending(false)
      })

  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error"> {error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>This recipe takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}