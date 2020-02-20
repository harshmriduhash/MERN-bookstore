import React from "react";
import axios from "axios";

class Saved extends React.Component {

  state = {
    results: []
  }

  componentDidMount() {
    axios.get("/api/books").then((response) => {
      this.setState({results: response.data})
    });
  }

  deleteBook = (id) => {
    axios.delete("/api/books/" + id).then((response) => {
      alert("Book Removed");
    }).then(() => {
      this.componentDidMount();
    });
  }

  render() {

    let results = this.state.results;
    let savedList;
  
    if (results.length > 0) {
      savedList = results.map(item => {
          return (
          <li key={item._id} type="none" style={{border: "2px solid #dee2e6", padding: "10px", marginBottom: "25px", backgroundColor: "#ffffff", boxShadow: "0 8px 6px -6px #000000"}}>
            <div className="container">
              <h4>{item.title}</h4>
              <h6>Written by: {item.authors.join(", ")}</h6>
              <hr />
                      
              <div className="row">
                <div className="col-md-2">
                  <img className="img-thumbnail" src={item.image} alt={item.title} />
                </div>
                <div className="col-md-10">
                  <p>{item.description}</p>
                </div>
              </div>
              <hr />
  
              <div className="row">
                <div className="col-md-6 text-right">
                  <button className="btn btn-outline-danger" onClick={() => this.deleteBook(item._id)}>Remove from Saved List</button>
                </div>
                <div className="col-md-6 text-left">
                  <a className="btn btn-outline-warning" href={item.link} target="_blank" rel="noopener noreferrer">View in Google</a>                            
                </div>
              </div>
            </div>
          </li>
        )
      });
    }
    else {
      savedList = <li type="none">There are currently no results to display. Search a book on the Home page to get started!</li>;
    }
  
    return (
      <React.Fragment>
        <div style={{padding: "0 20px"}}>
    
          <div className="jumbotron text-center bg-dark text-white" style={{border: "1px solid #dee2e6", paddingBottom: "30px"}}>
              <h1>(React) Google Book Search</h1>
              <hr />
              <br />
              <h5>
                  View your saved books, below!
              </h5>
          </div>
    
          <section style={{border: "1px solid #dee2e6", borderRadius: ".25rem", padding: "20px", overflow: "auto", background: "#ffffff"}}>
              <h3 className={savedList.length > 0 ? "showResults" : null}>Saved Books</h3><br />
              <ul style={{padding: "0"}}>
                  {savedList}
              </ul>
          </section>
        </div>
        <div>
          <section style={{position: "fixed", bottom: "0", left: "0", border: "1px solid #999999", background: "#ffffff", borderStyle: "solid solid none solid", borderTopRightRadius: ".25rem", padding: "5px 10px 0 10px", fontWeight: "bold"}}>
            myBookStore &copy;
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Saved;
