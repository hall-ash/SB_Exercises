import React from "react";
import "./Joke.css";

class Joke extends React.Component {

  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this); // bind upVote to this Joke instance
    this.downVote = this.downVote.bind(this); // bind downVote to this Joke instance
  }

  upVote() {
    this.props.vote(this.props.id, +1);
  }

  downVote() {
    this.props.vote(this.props.id, -1);
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={this.upVote}>
            <i className="fas fa-thumbs-up" />
          </button>
  
          <button onClick={this.downVote}>
            <i className="fas fa-thumbs-down" />
          </button>
  
          {this.props.votes}
        </div>
  
        <div className="Joke-text">{this.props.text}</div>
      </div>
    );
  }
}

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

  // return (
  //   <div className="Joke">
  //     <div className="Joke-votearea">
  //       <button onClick={upVote}>
  //         <i className="fas fa-thumbs-up" />
  //       </button>

  //       <button onClick={downVote}>
  //         <i className="fas fa-thumbs-down" />
  //       </button>

  //       {votes}
  //     </div>

  //     <div className="Joke-text">{text}</div>
  //   </div>
  // );
// }

export default Joke;
