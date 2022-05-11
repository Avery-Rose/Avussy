import { Component } from "react";
import { Link } from "react-router-dom";

export default class AdminNavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Avussy.dev
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin/create" className="nav-link">
                Create Project
              </Link>
            </li>
            <li>
              <Link to="/admin/edit" className="nav-link">
                Edit Project
              </Link>
            </li>
            <li>
              <Link to="/admin/delete" className="nav-link">
                Delete Project
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
