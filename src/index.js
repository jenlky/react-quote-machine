import React from 'react';
import ReactDOM from 'react-dom';
import QuoteBox from './components/quote-box';
//import registerServiceWorker from './registerServiceWorker';

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
    Arrow functions capture the this value of the enclosing context
    */
    this.getNewQuote();
    // why must I call the method at the constructor?
  }

  getNewQuote = () => {
    $.ajax({
      url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      // cache false to prevent retrieved quote from being stored and allow new quotes to be retrieved
      cache: false,
      success: res => {
        console.log(res);
        let stripedContent = $("<div>").html(res[0].content).text();
        let stripedAuthor = $("<h6>").html(res[0].title).text();
        this.setState({ author: `— ${stripedAuthor}` });
        this.setState({ quote: stripedContent });
      },
      error: err => {
        console.log("ajax not working");
      }
    });
  }

  render() {
    return (
      <div>
        <QuoteBox getNewQuote={this.getNewQuote} author={this.state.author}
          quote={this.state.quote} onClickTrigger={this.onClickTrigger} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
