import './App.css';
import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from './components/common/ProgressBar'
import Header from './components/Header';

const Agent = lazy(() => import("./components/agent-management/Agent"));

function App() {
  const loading = useSelector(state => state.loading);
  return (
    <Suspense fallback={<div>Please wait while loading...</div>}>
      {loading ? <ProgressBar /> : ""}
      <Header />
      <Agent />
    </Suspense>
  );
}

export default App;