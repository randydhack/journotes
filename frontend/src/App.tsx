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
    credential: 'user1@aa.io',
    password: 'password'
  }

  async function logins () {
    await dispatch(login(loginData))
  }

  console.log(journals.title)

  return (
    <div className="App">
      <button onClick={logins}> login here</button>
      <div>
      </div>
    </div>
  );
}

export default App;
