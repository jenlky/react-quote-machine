import React from "react";

const QuoteBox = (props) => {

  const onClickTrigger = () => {
    window.open("https://twitter.com/intent/tweet?text="
      + encodeURIComponent(this.state.quote + this.state.author));
  }

  return (
    <div className="align-box">
      <p className="text quote">{props.quote}</p>
      <h6 className="text author">{props.author}</h6>
      <i className="fa fa-twitter-square icon" title="Tweet it!"
        onClick={onClickTrigger}>
      </i>
      <button className="btn-quote" onClick={props.getNewQuote}>New Quote</button>
    </div>
  );
}

export default QuoteBox;
