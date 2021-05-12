import Board from "./Board.js";
import Player from "./Player.js";

const GameController = (() => {
  // set players
  const _players = [Player("Player 1", "X"), Player("Player 2", "O")];
  let _currentPlayer;
  _changeCurrentPlayer(0);

  // boardgame fields
  const fieldEls = document.getElementsByClassName("board-field");
  (function _activateBoard(fieldEls) {
    for (const fieldEl of fieldEls) {
      fieldEl.addEventListener("click", function () {
        const gameState = Board.play(this, _currentPlayer);
        switch (gameState) {
          case "win":
            alert(`${_currentPlayer.getName()} won!`);
            _reset();
            break;

          case "draw":
            alert(`It's a draw!`);
            _reset();
            break;

          default:
            _disableInputs(true);
            break;
        }
        _changeCurrentPlayer();
      });
    }
  })(fieldEls);

  // player inputs
  const playerInputEls = document.getElementsByClassName("input-field");
  function _disableInputs(state) {
    for (const input of playerInputEls) {
      if (state) {
        input.setAttribute("disabled", true);
      } else {
        input.removeAttribute("disabled");
      }
    }
  }
  (function _syncInputs(inputFields) {
    for (const input of inputFields) {
      const [, id, key] = input.id.split("-");
      const _playerInfo = _players[id - 1];

      if (key === "name") {
        input.value = _playerInfo.getName();
      }
      if (key === "mark") {
        input.value = _playerInfo.getMark();
      }

      input.addEventListener("change", function () {
        if (key === "name") {
          _playerInfo.setName(this.value);
        }
        if (key === "mark") {
          _playerInfo.setMark(this.value);
        }
        _updateTurnMarker(_currentPlayer);
      });
    }
  })(playerInputEls);

  // reset
  function _reset() {
    Board.clear();
    for (const fieldEl of fieldEls) {
      fieldEl.textContent = "";
      _disableInputs(false);
    }
    _changeCurrentPlayer(0)
  }

  document.getElementById("reset").addEventListener("click", _reset);

  // functions
  function _changeCurrentPlayer(index) {
    if (index !== undefined) {
      _currentPlayer = _players[index];
    } else {
      _currentPlayer =
        _currentPlayer === _players[0] ? _players[1] : _players[0];
    }

    _updateTurnMarker(_currentPlayer);
  }

  function _updateTurnMarker(player) {
    document.getElementById(
      "current-turn-marker"
    ).textContent = `${player.getName()} (${player.getMark()})`;
  }
})();

export default GameController;