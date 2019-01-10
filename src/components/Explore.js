import React from "react";
import ScrollRecent from "./ScrollRecent";
import ScrollTop from "./ScrollTop";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "recent"
    };
  }

  handleFilter = e => {
    this.setState({
      filter: e.currentTarget.getAttribute("name")
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <div className="container is-fluid">
          <div className="buttons has-addons is-right">
            <span
              name="recent"
              onClick={this.handleFilter}
              className={filter === "recent" ? "button is-primary" : "button"}
            >
              Most Recent
            </span>
            <span
              name="top"
              onClick={this.handleFilter}
              className={filter === "top" ? "button is-primary" : "button"}
            >
              Most Upvote
            </span>
          </div>
          {filter === "recent" ? <ScrollRecent /> : <ScrollTop />}
        </div>
      </div>
    );
  }
}

export default Explore;
