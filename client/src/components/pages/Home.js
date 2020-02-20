import React from "react";

function Home(props) {

    let results = [];
    let image;
    let authors;
    let description;
    let saveBtn;
    let infoLink;

    if (props.books.length > 0) {
        results = props.books.map(item => {

            if (item.volumeInfo.imageLinks) {
                image = <img className="img-thumbnail" src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />;
            }
            else {
                image = <img className="img-thumbnail" src="https://www.quercusbooks.co.uk/wp-content/uploads/2018/07/missingbook.png" alt={item.volumeInfo.title} />;
            }

            if (item.volumeInfo.authors) {
                authors = <h6>Written by: {item.volumeInfo.authors.join(", ")}</h6>;
            }
            else {
                authors = <h6>Written by: <em>Not Available</em></h6>;
            }

            if (item.volumeInfo.description) {
                description = <p>{item.volumeInfo.description}</p>;
            }
            else {
                description = <p><em>Description not available.</em></p>
            }

            if (item.id && item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.description && item.volumeInfo.imageLinks && item.volumeInfo.infoLink) {
                saveBtn = <button className="btn btn-outline-success" onClick={() => props.saveBook(item.id, item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.description, item.volumeInfo.imageLinks.thumbnail, item.volumeInfo.infoLink)}>Add to Saved List</button>;
            }
            else {
                saveBtn = <button className="btn btn-outline-success disabled">Save Unavailable</button>;
            }

            if (item.volumeInfo.infoLink) {
                infoLink = <a className="btn btn-outline-warning" href={item.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">View in Google</a>;
            }
            else {
                infoLink = <a className="btn btn-outline-warning">Unavailable in Google</a>;
            }

            return (
                <li key={item.id} type="none" style={{border: "2px solid #dee2e6", padding: "10px", marginBottom: "25px", backgroundColor: "#ffffff", boxShadow: "0 8px 6px -6px #000000"}}>
                    <div className="container">
                        <h4>{item.volumeInfo.title}</h4>
                        {authors}
                        <hr />
                        
                        <div className="row">
                            <div className="col-md-2">
                                {image}
                            </div>
                            <div className="col-md-10">
                                {description}
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-md-6 text-right">
                                {saveBtn}
                            </div>
                            <div className="col-md-6 text-left">
                                {infoLink}
                            </div>
                        </div>

                    </div>
                </li>
            )
        });
    }
    else {
        results = <li type="none">There are currently no results to display. Search a book title, above!</li>;
    }
    
    
    return (
        <React.Fragment>
            <div style={{padding: "0 20px"}}>
        
                <div className="jumbotron text-center bg-dark text-white" style={{border: "1px solid #dee2e6", paddingBottom: "30px"}}>
                    <h1>(React) Google Book Search</h1>
                    <hr />
                    <br />
                    <h5>
                        Search for and save books of interest!
                    </h5>
                </div>
        
                <section className="bookSearch" style={{border: "1px solid #dee2e6", borderRadius: ".25rem", padding: "20px", overflow: "auto"}}>
                    <h3>Book Search</h3><br />
                    <label htmlFor="bookTitle">Book:</label><br />
                    <input className={props.search ? "inputFocus" : null} type="text" placeholder="Enter Book Title" style={{width: "100%", padding: "0 5px"}} onChange={props.handleInput} onKeyPress={props.enterPressed} value={props.search}></input><br /><br />
                    <div style={{float: "right"}}>
                        <button className="btn btn-outline-dark" style={{marginRight: "10px"}} onClick={props.handleClick}>Search</button>
                        <button className={results.length > 0 ? "btn btn-outline-danger" : "btn btn-outline-dark disabled"} onClick={props.clearResults}>Clear Results</button>
                    </div>
                </section>
        
                <br />
        
                <section className="bg-light" style={{border: "1px solid #dee2e6", borderRadius: ".25rem", padding: "20px", overflow: "auto"}}>
                    <h3 className={results.length > 0 ? "showResults" : null}>Results</h3><br />
                    <ul style={{padding: "0"}}>
                        {results}
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

export default Home;