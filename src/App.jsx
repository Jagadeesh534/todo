
import './App.css'
import AddTask from './app/components/AddTask'
import ListTasks from './app/components/ListTasks'

function App() {
  return (
   
    <>
    <div className="container d-flex  justify-content-center flex-column ">
      <h3 className="text-center text-primary m-3">Welcome</h3>
 <><AddTask></AddTask><ListTasks></ListTasks></>
    </div>
    </>
  )
}

export default App
