import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// NavBar component
import NavBar from "./components/home/navbar.component";
import AdminNavBar from "./components/admin/navbar.component";

// Page components
import Main from "./components/home/main.component";
import MainAdmin from "./components/admin/main.component";

import CreateProject from "./components/admin/create-project.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<NavBar />} />
          <Route path="/admin/" element={<AdminNavBar />} />
          <Route path="/admin/create" element={<AdminNavBar />} />
        </Routes>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/admin" element={<MainAdmin />} />
          <Route path="/admin/create" element={<CreateProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
