import { useState } from 'react'

function Square({ value, onSquareClick }) {
	const [isClicked, setIsClicked] = useState(false)

	function squareIsClicked() {
		if (!value) {
			onSquareClick()
		}
	}

	let squareStyle = {}
	if (value === 'X') {
		squareStyle = { backgroundColor: '#209cee', color: '#ffffff', cursor: 'initial' }
	} else if (value === 'O') {
		squareStyle = { backgroundColor: '#ffdd57', color: '#000000', cursor: 'initial' }
	}

	return (
		<button className="square" onClick={squareIsClicked} style={squareStyle}>
			{value}
		</button>
	)
}

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [xIsNext, setXisNext] = useState(true)

	function handleClick(index) {
		// If square is already filled, return early.
		if (squares[index]) {
			return
		}

		const nextSquares = squares.slice()
		nextSquares[index] = xIsNext ? 'X' : 'O'
		setSquares(nextSquares)
		setXisNext(!xIsNext)
	}

	return (
		<div className="board">
			<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
			<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
			<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
			<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
			<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
			<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
			<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
		</div>
	)
}
