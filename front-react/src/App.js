import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import SignIn from './pages/SignIn'
import Album from './pages/Album'
import Pricing from './pages/Pricing'
import NotFound from './pages/404'
import Unauthorized from './pages/403'

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Routes>
          <Route path="/auth/album" element={<Album />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="404" element={<NotFound />} />
          <Route path="403" element={<Unauthorized />} />
          <Route path="/" element={<SignIn />} />
        </Routes>

      </div>
    </CookiesProvider>
  );
}

export default App;
