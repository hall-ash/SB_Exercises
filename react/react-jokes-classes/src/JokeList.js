//import React, { useState, useEffect } from "react";
import React from 'react';
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10,
  }

  constructor(props) {
    super(props);
    this.state = {
      'jokes': []
    };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  async fetchJokes() {
    const allJokes = this.state.jokes;
    const seenJokes = new Set();
 
    try {
      while (allJokes.length < this.props.numJokesToGet) {
        const res = await axios.get("https://icanhazdadjoke.com", {
                     headers: { Accept: "application/json" }
                   });
         const { status, ...jokeObj } = res.data;
 
         if (!seenJokes.has(jokeObj.id)) {
           seenJokes.add(jokeObj.id);
           allJokes.push({ ...jokeObj, votes: 0 });
         } else {
           console.error('duplicate found!')
         }
      } // end while
 
      this.setState({ jokes: allJokes });
    } catch(e) {
      console.error(e);
    }
  }

  // fetch jokes after 1st render
  componentDidMount() {
    const { jokes } = this.state;
    const { numJokesToGet } = this.props;
    if (jokes.length < numJokesToGet) this.fetchJokes();
  }

  // fetch new jokes
  componentDidUpdate() {
    const { jokes } = this.state;
    const { numJokesToGet } = this.props;
    if (jokes.length < numJokesToGet) this.fetchJokes();
  }

  // empty joke list 
  generateNewJokes() {
    this.setState({ jokes: [] });
  }

  /* change vote for this id by delta (+1 or -1) */
  vote(id, delta) {
    const updatedJokes = this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j));
    this.setState({ jokes: updatedJokes });
  }

  /* render: either loading spinner or list of sorted jokes. */
  render() {
    const { jokes } = this.state;
    if (jokes.length) {
      const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
    
          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    } // end if

    return null;
  }
  
}


// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

export default JokeList;
