import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import SuperAdminDashBoard from './pages/Dashboard/SuperAdminDashBoard';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import PrivateRoute from './utils/privateRoute';
import SignIn from './pages/Authentication/SignIn';
import History from './pages/History';

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
            <PrivateRoute>
              <SuperAdminDashBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-edit"
          element={
            <PrivateRoute>
              <FormLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-edit/:id"
          element={
            <PrivateRoute>
              <FormLayout />
            </PrivateRoute>
          }
        />
        <Route path="/auth/sign-in" element={<SignIn />} />

        <Route
          path="/recruiter"
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
