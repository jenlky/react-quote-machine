import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuoteBox from './components/quote-box';
import './index.css';
// import $ from "jquery";
// import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      author: "",
      quote: "Loading..."
    }

    /* Two ways to bind method:
    1) this.getNewQuote = this.getNewQuote.bind(this);
    Before arrow func, function defined its own this value

    2) getNewQuote = () => {}
    Arrow functions capture the this value of the enclosing context */

    // why must I call the method at constructor?
    this.getNewQuote();
  }

  decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  getNewQuote = () => {
    /* $.ajax({
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      // cache false to prevent retrieved quote from being stored and allow new quotes to be retrieved
      cache: false,
      success: res => {
        console.log(res);
        let stripedAuthor = $("<h6>").html(res[0].title).text();
        let stripedContent = $("<div>").html(res[0].content).text();
        this.setState({ author: `— ${stripedAuthor}` });
        this.setState({ quote: stripedContent });
      },
      error: err => {
        console.log("ajax not working");
      }
    }); */

    fetch('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', {
      cache: "no-store"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data[0]);

        // let the Browser do the sanitation
        const dummyNode = document.createElement("div");
        let resultText = "";

        // innerHTML retrieves and sets the content in HTML format
        dummyNode.innerHTML = data[0].content;
        resultText = dummyNode.innerText;
        this.setState({ quote: resultText });

        dummyNode.innerHTML = data[0].title;
        // innerText retrieves and sets the content of the tag as plain text
        resultText = dummyNode.innerText;
        this.setState({ author: `— ${resultText}` });
      })
      .catch(error => console.log("error is", error));
  }

  render() {
    return (
      <div className="parent">
        <h1 className="title">React Quote Machine</h1>
        <div className="container quote-container">
          <QuoteBox getNewQuote={this.getNewQuote} author={this.state.author}
            quote={this.state.quote} onClickTrigger={this.onClickTrigger} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
