import {useReducer} from 'react'
const initState = {
  job: '',
  jobs: []
}

const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

const setJob = payload =>{
    return {
      type: SET_JOB,
      payload
    }
}

const addJob = payload =>{
    return {
      type: ADD_JOB,
      payload
    }
}

const deleteJob = payload =>{
    return {
      type: DELETE_JOB,
      payload
    }
}

console.log(setJob());

const reducer = (state, action) =>{
  console.log('action : ',action);
  console.log('prev state : ', state);

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
        // const newJobs = [...state.jobs]
        // newJobs.splice(action.payload, 1)
        newState = {
          ...state,
          jobs: state.jobs.splice(action.payload, 1)
        }
        break
      default:
        throw new Error('Invalid action')
    }
    console.log('new state : ', newState);
  return newState
}

function App(){
  const [state, dispatch] = useReducer(reducer, initState)
  const {job, jobs} = state

  const handleSubmit = () =>{
      dispatch(addJob(job))
      dispatch(setJob(''))
  }
    return (
      <div style={{padding : '0 20px'}}>
        <h3>Todo</h3>
        <input 
            value={job}
            placeholder='Enter todo ...'
            onChange={e =>{
              dispatch(setJob(e.target.value))
            }}
        />
        <button onClick={handleSubmit}>Add</button>
        <ul>
          {jobs.map((job, index) =>(
            <li key={index}>{job}
            <span onClick={() => dispatch(deleteJob(index))}>  X</span>
            </li>
          ))}
        </ul>
      </div>
    )
}
export default App;
