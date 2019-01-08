import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  handleClick = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }));
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <div className="buttons">
            <Link className="button is-light" to="/signout">
              Sign Out
            </Link>
            <Link className="button is-primary" to="/lawform">
              Post a Law
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="buttons">
            <Link className="button is-light" to="/signup">
              Sign Up
            </Link>
            <Link className="button is-primary" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          {this.props.username && (
            <div className="navbar-item">
              <strong>{this.props.username}</strong>
            </div>
          )}
          <a
            onClick={this.handleClick}
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={
            this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
          }
        >
          <div className="navbar-end">
            <div className="navbar-item">{this.renderLinks()}</div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username
  };
}

export default connect(mapStateToProps)(Header);
