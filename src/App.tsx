import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import ViewProfile from './pages/ViewProfile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ECommerce />
            </>
          }
        />
        <Route path="/add-edit" element={<FormLayout />} />
        <Route path="/add-edit/:id" element={<FormLayout />} />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <>
              <ViewProfile />
            </>
          }
        />
        <Route
          path="/recruiter"
          element={
            <>
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Settings />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
