import "./App.css";
import AddTaskV2 from "./app/components/AddTaskV2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ListTasksV2 from "./app/components/ListTasksV2";

function App() {
  
  
 
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="container d-flex  justify-content-center flex-column ">
          <h3 className="text-center text-primary m-3">Welcome</h3>
         
          <>

          <AddTaskV2></AddTaskV2>
          <ListTasksV2></ListTasksV2>
          </>
        </div>
      </LocalizationProvider>
    </>
  );
}

export default App;
