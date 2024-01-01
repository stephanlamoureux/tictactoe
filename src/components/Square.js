export default function Square({ value, onSquareClick, isWinner, gameEnded }) {
	function squareIsClicked() {
		if (!value) {
			onSquareClick()
		}
	}

	let squareBackground = {}
	if (isWinner) {
		squareBackground.backgroundColor = '#30ce3d'
		squareBackground.cursor = 'initial'
	} else if (value === 'X') {
		squareBackground.backgroundColor = '#209cee'
		squareBackground.cursor = 'initial'
	} else if (value === 'O') {
		squareBackground.backgroundColor = '#ffdd57'
		squareBackground.cursor = 'initial'
	}

	// Removes the hover effect when the game ends.
	const squareButton = gameEnded ? 'square-winner' : 'square'

	return (
		<button className={squareButton} onClick={squareIsClicked} style={squareBackground}>
			{value}
		</button>
	)
}
