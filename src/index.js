// TIC-TAC-TOE GAME
// COMMENT-HEAVY
// TIFFANY HODGES 9/2/2021



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



// Square is a React component class
// components take params called props
// renders a button
// class Square extends React.Component {
//     // adding constructor to initialize the state of X
//     // always call super in js classes when defining constructor of subclass
//     constructor(props) {super(props); this.state={value:null,};}
//     //method that returns description of what u want to see, aka returns a React element
//     render() {
//         //returning built-in DOM components (<div>, <li>, etc.)
//         return (
//             //can also use onClick={() => console.log('click')}
//             // <button className="square" onClick={function() {this.setState({value: 'X'})}}>
//             //setState will re-render the square class when button clicked
//             <button className="square" onClick={() => this.setState({value: 'X'})}>
//             {/* passing prop value from renderSquare method */}
//             {/*this.props.value*/}
//             {/* changing from prop to state */}
//             {this.state.value}
//             </button>
//         );
//     }
// }
// now, the Square class component can be referred to as <Square />

// MODIFIED Square
// Passing 2 props from Board: value and onClick
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }


// NEW Square using function component that takes props as input
// does not have its own state
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// history = [
//     // before first move
//     {
//         squares: [
//             null, null, null,
//             null, null, null,
//             null, null, null,
//         ]
//     },
//     // after first move
//     {
//         squares: [
//             null, null, null,
//             null, null, null,
//             null, null, null,
//         ]
//     },
// ]
  
// renders 9 squares
// maintains which squares are filled
class Board extends React.Component {
    //*****don't need this anymore since added constructor to Game component ********//
    // constructor(props) {
    //     super(props);

    //     //setting Board's initial state to array of 9 nulls
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true, //a boolean that is flipped to determine which player goes next
    //     };
    // }



    // to handle onClick method
    // slice() makes a copy of the array to modify rather than modifying original array
    //*****MOVED to Game component*******/
    // handleClick(i) {
    //     const squares = this.state.squares.slice();

    //     // ignores a click if game is won or Square already filled
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares, 
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    // a method called renderSquare
    // renderSquare(i) {
    //     //passing prop: value={i}
    //     // return <Square value={i}/>;

    //     //modifying Board renderSquare method to read from constructor above
    //     return <Square value={this.state.squares[i]}/>;
    // }


    // Changing renderSquare method in order to pass down a function to Square
    // This creates a way for the Square to update the Board's state
    //Square will call this function when a square is clicked
    renderSquare(i) {
        //paranthesis added around return statement so js doesn't insert semicolon after return and break code
        return (
            // passing to Square
            <Square
                //value={this.state.squares[i]}
                value={this.props.squares[i]}
                //specifying onClick prop which is called in Square
                //onClick={() => this.handleClick(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
  
    render() {
        //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        // replacing status with calculateWinner to check if player has won
        //****don't need anymore since Game comp. is rending game's status*******/
        // const winner = calculateWinner(this.state.sqaures);
        // let status;

        // if (winner) {
        //     status = 'Winner: ' + winner;
        // }
        // else {
        //     status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        // const history = this.state.history;
        // const current = history[history.length - 1];
        // const winner = calculateWinner(current.squares);

        // const moves = history.map((step, move) => {
        //     const desc = move ?
        //     'Go to move #' + move :
        //     'Go to game start';
        //     return (
        //         <li>
        //             <button onClick={() => this.jumpTo(move)}>{desc}</button>
        //         </li>
        //     );
  
        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
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
} // END BOARD


  
// renders a board with placeholder values
class Game extends React.Component {
    //setting up initial state for Game within constructor
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        //const squares = this.state.squares.slice();
        const squares = current.squares.slice();

        // ignores a click if game is won or Square already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            //squares: squares, 
            //xIsNext: !this.state.xIsNext,
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    // updates the stepNumber
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            // setting to true if # changing to stepNumber is even
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        //const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next person: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}
  
// ========================================
  
ReactDOM.render(
    <Game />,
        document.getElementById('root')
);


// helper function to show when game is won and no other turns to make
// checks for a winner and returns X, O or null
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}