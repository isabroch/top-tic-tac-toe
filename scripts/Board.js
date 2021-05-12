const Board = (() => {
  let _board = new Array(9).fill(null);

  function _getBoard() {
    return Array.from(_board);
  }

  function _getField(id) {
    return _board[id];
  }

  function _setField(id, value) {
    if (_board[id]) {
      throw "Can't overwrite existing field.";
    }

    _board[id] = value;
  }

  function clear() {
    return _board.fill(null);
  }

  const _winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function _checkThree(a, b, c) {
    return a !== null && a === b && b === c;
  }

  function _checkHasNull(board) {
    return board.some((field) => field === null);
  }

  function _checkWin(board) {
    // win if the same marker in row, column, or diagonal.

    const hasWon = _winConditions.some((winCondition) => {
      const fields = winCondition.map((id) => board[id]);
      return _checkThree(...fields);
    });

    return hasWon;
  }

  // if winning play, return "win";
  // if all fields are full but no winning play, return "draw";
  // else returns "continue";
  function _checkResults (board) {
    const hasWon = _checkWin(board);
    const hasNull = _checkHasNull(board);

      if (hasWon) {
        return "win";
      }

      if (!hasNull) {
        return "draw";
      }

      return "continue";
  }

  function play(el, player) {
    try {
      const marker = player.getMark();
      _setField(el.dataset.index, marker);
      el.textContent = marker;

      return _checkResults(_getBoard());
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return { clear, play };
})();

export default Board;
