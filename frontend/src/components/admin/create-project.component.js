import { Component } from "react";
import axios from "axios";

import isValidGithub from "../../utils/validateGithub";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    // bind this keyword to the methods
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearErrors = this.clearErrors.bind(this);

    // initialize state
    this.state = {
      key: "",
      title: "",
      description: "",
      githubLink: "",

      // error messages
      unknownError: "",
      keyError: "",
      titleError: "",
      descriptionError: "",
      githubLinkError: "",
    };
  }

  onKeyChange(e) {
    this.setState({ key: e.target.value });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onLinkChange(e) {
    if (isValidGithub(e.target.value)) {
      this.setState({ githubLink: e.target.value, githubLinkError: "" });
    } else {
      this.setState({ githubLinkError: "Invalid Github Link" });
    }
  }

  clearErrors() {
    this.setState({
      unknownError: "",
      keyError: "",
      titleError: "",
      descriptionError: "",
      githubLinkError: "",
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      key: this.state.key,
      title: this.state.title,
      description: this.state.description,
      githubLink: this.state.githubLink,
    };

    console.log(project);

    axios
      .post("http://localhost:5000/api/projects/add", project)
      .then(() => {
        window.location = "/admin";
      })
      .catch((err) => {
        const data = err.response.data;
        console.log(err.response.data);
        this.clearErrors();
        switch (data.errorKey) {
          case "title":
            this.setState({ titleError: data.message });
            break;
          case "description":
            this.setState({ descriptionError: data.message });
            break;
          case "githubLink":
            this.setState({ githubLinkError: data.message });
            break;
          case "key":
            this.setState({ keyError: data.message });
            break;
          default:
            this.setState({ unknownError: data.message });
            break;
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Create Project</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Key</label>
            <input
              type="password"
              className="form-control"
              onChange={this.onKeyChange}
            />
            {this.state.keyError.length > 0 ? (
              <div className="alert alert-danger">{this.state.keyError}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeTitle}
            />
          </div>
          {this.state.titleError.length > 0 ? (
            <div className="alert alert-danger">{this.state.titleError}</div>
          ) : null}
          <div className="form-group">
            <label>Description</label>
            <span className="text-muted"> (Optional)</span>
            <textarea
              className="form-control"
              onChange={this.onDescriptionChange}
            />
            {this.state.descriptionError.length > 0 ? (
              <div className="alert alert-danger">
                {this.state.descriptionError}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Link</label>
            <span className="text-danger"> (Required)</span>
            <input
              type="text"
              className="form-control"
              onChange={this.onLinkChange}
            />
          </div>
          {this.state.githubLinkError.length > 0 ? (
            <div className="alert alert-danger">
              {this.state.githubLinkError}
            </div>
          ) : null}
          <div className="form-group">
            <input
              type="submit"
              value="Create Project"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
