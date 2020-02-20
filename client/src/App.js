import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Home from "./components/pages/Home";
import Saved from "./components/pages/Saved";
import axios from "axios";

class App extends Component {
  state = {
    currentPage: "Home",
    search: "",
    books: []
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleInput = event => {
    this.setState({search: event.target.value});
  };

  enterPressed = event => {
    let code = event.keyCode || event.which;

    if (code === 13) {
      this.handleClick();
    }
  }

  handleClick = () => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.search).then((res) => {
      let searchResults = res.data.items.map(item => item);
      this.setState({books: searchResults, search: ""})
    });
  };

  clearResults = () => {
    this.setState({books: [], search: ""});
  }

  saveBook = (id, title, authors, description, image, link) => {
    let book = {
      bookId: id,
      title: title,
      authors: authors,
      description: description,
      image: image,
      link: link
    }

    console.log(book);

    axios.post("/api/books", book, (data) => {
      console.log(data);
    }).then(() => {
      alert("Book Saved");
    });
  }

  render() {
    return (
      <Router>
        <div>
          <NavTabs currentPage={this.state.currentPage} handlePageChange={this.handlePageChange} />
          <br />
          <Route exact path="/" render={(props) => <Home {...props} handlePageChange={this.handlePageChange} handleInput={this.handleInput} handleClick={this.handleClick} clearResults={this.clearResults} enterPressed={this.enterPressed} books={this.state.books} currentPage={this.state.currentPage} search={this.state.search} saveBook={this.saveBook} />} />
          <Route exact path="/saved" render={(props) => <Saved {...props} handlePageChange={this.handlePageChange} />} />
        </div>
      </Router>
    );
  };
}

export default App;