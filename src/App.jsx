import 'flowbite/dist/flowbite.min.css'; // Import flowbite
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Component from "./Component";
import DetailsPage from "./DetailsPage";
import Dstock from './Dstock';
import Gujaratinews from './Gujaratinews';
import Indianindex from './Indianindex';
import IPO from './Ipo';
import Layout from './Layout';
import Login from './Login';
import News from './News';
import PrivateRoute from './PrivateRoute';
import RegistrationForm from "./Registration"; // Import PrivateRoute
import Stock from "./Stock";
import VolumeChart from "./VolumeChart1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute element={<Component />} />} />
          <Route path="/details" element={<PrivateRoute element={<DetailsPage />} />} />
          <Route path="/Stock" element={<PrivateRoute element={<Stock />} />} />
          <Route path="/DStock" element={<PrivateRoute element={<Dstock />} />} />
          <Route path="/IPONews" element={<PrivateRoute element={<News />} />} />
          <Route path="/Indianindex" element={<PrivateRoute element={<Indianindex />} />} />
          <Route path="/Gujaratinews" element={<PrivateRoute element={<Gujaratinews />} />} />
          <Route path="/VolumeChart" element={<PrivateRoute element={<VolumeChart />} />} />
          <Route path="/login" element={<Login />} /> {/* Public Route */}
          <Route path="*" element={<Login />} />
          <Route path='/Ipo'element={<PrivateRoute element={<IPO />} />}/>
        </Route>
        <Route path="/@pass" element={<RegistrationForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
