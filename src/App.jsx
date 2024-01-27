
import './App.css'
import AddTask from './app/components/AddTask'
import ListTasks from './app/components/ListTasks'
import { GoogleOAuthProvider } from '@react-oauth/google';
import OAuthLogin from './app/components/OAuthLogin';
import { CLIENT_ID } from './app/constants/todoConstants';
import { useSelector } from 'react-redux';

function App() {
  const clientId = CLIENT_ID;
  const token = useSelector((state)=>state.accessToken);
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <>
    <div className="container d-flex  justify-content-center flex-column ">
      <OAuthLogin></OAuthLogin>
   { token!='' && ( <><AddTask></AddTask><ListTasks></ListTasks></>)}
    </div>
    </>
    </GoogleOAuthProvider>
  )
}

export default App
