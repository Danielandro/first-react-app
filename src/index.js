// create Square, Board, Game components
// File written in JSX

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// React.Component is the Super class
// class Square extends React.Component {  
//   render() {
//     // JavaScript is contained in curly braces. 
//     // Explicit return
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     ); 
//   }
// }

// Function component
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // create an array with length = 9. Fill all elements with null
      squares: Array(9).fill(null),
      xIsNext: true, // set first move to X      
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // shallow copy
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // renderSquare is method of Board class
  renderSquare(i) {
    return (
      <Square 
      // value + onClick props passed down to Square component
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    ); 
  }

  render() {
    const status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)} {/* call method, pass in parameter */}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board /> {/*include Board component defined above*/}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  // possible winning combos
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // returns X or O
    }
  }
}