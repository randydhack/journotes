import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getJournal } from './redux/journalSlice';
import { login } from './redux/userSlice';



function App() {

  const dispatch = useAppDispatch()
  const journals = useAppSelector(state => state.journal.data)

  useEffect(() => {
    dispatch(getJournal())
  }, [])

  const loginData = {
    credential: 'demo@aa.io',
    password: 'password'
  }

  async function logins () {
    await dispatch(login(loginData))
  }

  return (
    <div className="App">
      <button onClick={logins}> login here</button>
      <div>
        {journals?.map((el:any) => <>{el.title}{el.description}</>)}
      </div>
    </div>
  );
}

export default App;
