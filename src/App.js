import {useReducer} from 'react'

// initState
const initState = {
  job: '',
  jobs: []
}

// Actions
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

// Dispatch
const setJob = payload => {
  return {
    type: SET_JOB,
    payload
  }
}

const addJob = payload => {
  return {
    type: ADD_JOB,
    payload
  }
}

const deleteJob = payload => {
  return {
    type: DELETE_JOB,
    payload
  }
}
// Reducer
const reducer = (state, action) =>{
    let newState
    switch(action.type){
      case SET_JOB:
        newState = {
          ...state,
          job: action.payload
        }
      break

      case ADD_JOB:
        newState = {
          ...state,
          jobs: [...state.jobs, action.payload]
        }
      break

      case DELETE_JOB:
        const newJobs = [...state.jobs]
        newJobs.splice(action.payload, 1)
        newState = {
          ...state,
          jobs: newJobs
        }
        break
      default:
        throw new Error('Invalid action')
    }
    return newState
}

function App(){
    const [state, dispatch] = useReducer(reducer, initState)
    const {job, jobs} = state

    const handleSubmit = () =>{
      dispatch(setJob(''))
      dispatch(addJob(job))
    }

    return (
      <div style={{padding : '0 20px'}}>
        <h3 className='todo-list-title'>Todo List</h3>
        <input className='todolist-input'
          value={job}
          placeholder = 'Enter todo ...'
          onChange={e => {dispatch(setJob(e.target.value))}}
        />
        <button className='handle-submit' onClick={handleSubmit}>Add</button>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job}
            <span className='delete-button' onClick={() => dispatch(deleteJob(index))}> Delete</span>
            </li>
          ))}
        </ul>
      </div>
    )
}
export default App;
