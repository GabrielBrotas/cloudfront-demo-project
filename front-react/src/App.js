import { Routes, Route } from "react-router-dom";
import './App.css';

import SignIn from './pages/SignIn'
import Album from './pages/Album'
import Pricing from './pages/Pricing'
import NotFound from './pages/404'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/album" element={<Album />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="404" element={<NotFound />} />
        <Route path="/" element={<SignIn />} />

      </Routes>
    </div>
  );
}

export default App;
