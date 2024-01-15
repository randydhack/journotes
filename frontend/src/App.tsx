import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getJournal } from './redux/journalSlice';

function App() {

  const dispatch = useAppDispatch()

  const journal = useAppSelector(state => state.journal.data)
  useEffect(() => {
    dispatch(getJournal())
  }, [])

  console.log(journal)


  return (
    <div className="App">
      {journal?.map((user:any) => <>
      {user.email}
      </>)}
    </div>
  );
}

export default App;
