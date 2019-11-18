import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner) {
      alert('Jogo finalizado!');
      return null;
    }
    if (board[index] !== '') {
      alert('Posição Ocupada!');
      return null;
    }

    setBoard(
      board.map((item, itemIndex) => (itemIndex === index ? currentPlayer : item)),
    );

    setCurrentPlayer(
      currentPlayer === 'X' ? 'O' : 'X',
    );
  };

  const checkDraw = () => {
    if (board.every((item) => item !== '')) setWinner('E');
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === 'O')) setWinner('O');
      if (cells.every((cell) => cell === 'X')) setWinner('X');
    });

    checkDraw();
  };

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer('O');
    setBoard(emptyBoard);
    setWinner(null);
  };

  return (
    <main>
      <h1 className="title">Tic Tac Toe</h1>

      <div className={`board ${winner ? 'game-over' : ''}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {winner
        && (
          <footer>
            <h2 className="winner-message">
              <span className={winner}>
                {winner === 'E'
                  ? 'Jogo Empatado'
                  : `${winner} venceu`}
              </span>
            </h2>

            <button onClick={resetGame}>Recomeçar jogo</button>
          </footer>
        )}
    </main>
  );
}

export default TicTacToe;
