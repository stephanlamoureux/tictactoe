import { useState } from 'react'
import Square from './Square'
import { calculateWinner } from '../utils/gameLogic'

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [xIsNext, setXisNext] = useState(true)

	function handleClick(index) {
		// If square is already filled, return early.
		if (squares[index] || winningLine) {
			return
		}

		const nextSquares = squares.slice()
		nextSquares[index] = xIsNext ? 'X' : 'O'
		setSquares(nextSquares)
		setXisNext(!xIsNext)
	}

	// Game status
	const winningLine = calculateWinner(squares)
	const gameEnded = winningLine !== null || !squares.includes(null)
	let status
	let statusStyle = {}

	if (winningLine) {
		status = `Winner: ${squares[winningLine[0]]}!`
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
						isWinner={winningLine && winningLine.includes(index)}
						gameEnded={gameEnded}
					/>
				))}
			</div>

			<button className="reset" onClick={resetGame}>
				Reset Game
			</button>
		</>
	)
}
