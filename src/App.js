import { useState } from 'react'

function Square({ value, onSquareClick, isWinner }) {
	function squareIsClicked() {
		if (!value) {
			onSquareClick()
		}
	}

	let squareStyle = {}
	if (value === 'X') {
		squareStyle = { backgroundColor: '#209cee', cursor: 'initial' }
	} else if (value === 'O') {
		squareStyle = { backgroundColor: '#ffdd57', cursor: 'initial' }
	}

	// Removes the hover effect when the game ends.
	const squareButton = isWinner ? 'square-winner' : 'square'

	return (
		<button className={squareButton} onClick={squareIsClicked} style={squareStyle}>
			{value}
		</button>
	)
}

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [xIsNext, setXisNext] = useState(true)

	function handleClick(index) {
		// If square is already filled, return early.
		if (squares[index] || calculateWinner(squares)) {
			return
		}

		const nextSquares = squares.slice()
		nextSquares[index] = xIsNext ? 'X' : 'O'
		setSquares(nextSquares)
		setXisNext(!xIsNext)
	}

	// Game status
	const winner = calculateWinner(squares)
	const isWinner = winner !== null
	let status
	let statusStyle = {}

	if (winner) {
		status = `Winner: ${winner}!`
		statusStyle = { color: '#30ce3d', textTransform: 'uppercase' }
	} else if (!squares.includes(null)) {
		status = 'Tie Game!'
		statusStyle = { color: '#f64c4c', textTransform: 'uppercase' }
	} else {
		status = 'Player: ' + (xIsNext ? 'X' : 'O')
		statusStyle = { textShadow: 'none' }
	}

	function resetGame() {
		setSquares(Array(9).fill(null))
		setXisNext(true)
	}

	return (
		<>
			<div className="status" style={statusStyle}>
				{status}
			</div>

			{/* Create the game board */}
			<div className="board">
				{squares.map((square, index) => (
					<Square
						key={index}
						value={square}
						onSquareClick={() => handleClick(index)}
						isWinner={isWinner}
					/>
				))}
			</div>

			<button className="reset" onClick={resetGame}>
				Reset Game
			</button>
		</>
	)
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2], // Top row
		[3, 4, 5], // Middle row
		[6, 7, 8], // Bottom row
		[0, 3, 6], // Left column
		[1, 4, 7], // Middle column
		[2, 5, 8], // Right column
		[0, 4, 8], // Left-to-right diagonal
		[2, 4, 6], // Right-to-left diagonal
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}
