import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const workout = {
      title,
      load: Number(load),
      reps: Number(reps)
    }
  
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(workout)
      })
  
      const json = await response.json()
  
      if (!response.ok) {
        setError(json.error || 'Failed to create workout')
        return
      }
  
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
  
    } catch (err) {
      setError('Failed to connect to server')
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm