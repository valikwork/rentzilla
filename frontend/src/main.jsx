import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import App from './App';
import PrivateRoute from './components/PrivatRoute';
import { PROFILE_ROUTE } from './constants/routes';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import store from './store';
import MyProfileScreen from './screens/MyProfileScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path={PROFILE_ROUTE} element={<MyProfileScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

