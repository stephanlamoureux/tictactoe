import { useState } from 'react'

function Square({ value, onSquareClick, isWinner }) {
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
		statusStyle = { color: '#30ce3d' }
	} else if (!squares.includes(null)) {
		status = 'Tie Game!'
		statusStyle = { color: '#f64c4c' }
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O')
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
			<div className="board">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinner={isWinner} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinner={isWinner} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinner={isWinner} />
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinner={isWinner} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinner={isWinner} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinner={isWinner} />
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinner={isWinner} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinner={isWinner} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinner={isWinner} />
			</div>
			<button className="reset" onClick={resetGame}>
				Reset Game
			</button>
		</>
	)
}

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
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}
