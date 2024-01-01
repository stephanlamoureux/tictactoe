export function calculateWinner(squares) {
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
			return lines[i] // Return the winning line indices
		}
	}
	return null
}

export function checkTie(squares) {
	return squares.every(square => square !== null)
}

export function getNextPlayer(currentPlayer) {
	return currentPlayer === 'X' ? 'O' : 'X'
}
