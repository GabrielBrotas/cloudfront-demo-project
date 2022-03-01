import { Routes, Route } from "react-router-dom";
import './App.css';

import SignIn from './pages/SignIn'
import Pricing from './pages/Pricing'
import NotFound from './pages/404'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
