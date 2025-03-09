import React, { useState, useEffect } from 'react';
import { Card as CardComponent } from './components/Card';
import { createDeck, calculateScore } from './utils';
import type { Card, GameState } from './types';
import { Coins } from 'lucide-react';

// Main Application Component: Manages the blackjack game logic and UI.
// This component maintains the entire game state and orchestrates the gameplay.
function App() {
  // Initialize game state with default parameters.
  // GameState includes deck, players' hands, scores, available chips, game status, and messages.
  const [gameState, setGameState] = useState<GameState>({
    deck: [],
    playerHand: [],
    dealerHand: [],
    gameStatus: 'betting', // Modes: 'betting', 'playing', 'gameOver'
    message: 'Place your bet!',
    playerScore: 0,
    dealerScore: 0,
    chips: 1000, // Starting chip count
    currentBet: 0
  });

  // useEffect with an empty dependency array ensures resetGame is run only once on component mount.
  // This initializes a fresh deck and resets game variables.
  useEffect(() => {
    resetGame();
  }, []);

  // resetGame: Resets the game state to start a new round.
  // Uses the createDeck algorithm from utils to generate a full, shuffled deck.
  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      deck: createDeck(), // Generate a new shuffled deck using Fisher-Yates algorithm in utils.
      playerHand: [],
      dealerHand: [],
      gameStatus: 'betting',
      message: 'Place your bet!',
      playerScore: 0,
      dealerScore: 0,
      currentBet: 0
    }));
  };

  // placeBet: Handles the betting phase.
  // Deducts the bet amount from available chips, transitions game status to 'playing',
  // and calls dealInitialCards to distribute cards to player and dealer.
  const placeBet = (amount: number) => {
    // Ensure the player has sufficient chips to bet.
    if (gameState.chips >= amount) {
      setGameState(prev => ({
        ...prev,
        chips: prev.chips - amount,
        currentBet: amount,
        gameStatus: 'playing',
        message: 'Game in progress'
      }));
      dealInitialCards();
    }
  };

  // dealInitialCards: Deals the initial two cards to both the player and the dealer.
  // For the dealer, only one card's score is considered initially to keep gameplay suspense.
  const dealInitialCards = () => {
    // Copy the current deck array to safely modify it.
    const newDeck = [...gameState.deck];
    // Pop two cards from the end of the deck for the player.
    const playerCards = [newDeck.pop()!, newDeck.pop()!];
    // Pop two cards from the deck for the dealer.
    const dealerCards = [newDeck.pop()!, newDeck.pop()!];

    // Update game state with new hands and calculate initial scores using the calculateScore algorithm.
    setGameState(prev => ({
      ...prev,
      deck: newDeck,
      playerHand: playerCards,
      dealerHand: dealerCards,
      playerScore: calculateScore(playerCards), // Sum card values; adjust Aces from 11 to 1 if necessary.
      dealerScore: calculateScore([dealerCards[0]]) // Only show first dealer card's score initially.
    }));
  };

  // hit: Handles player's decision to take another card.
  // It draws one more card from the deck and updates player's hand and score.
  // If the score exceeds 21, it sets the game to 'gameOver' with a bust condition.
  const hit = () => {
    // Ensure action is only allowed during an active game.
    if (gameState.gameStatus !== 'playing') return;

    // Create a new deck copy and draw a card.
    const newDeck = [...gameState.deck];
    const newCard = newDeck.pop()!; // Pops next card from deck.
    const newHand = [...gameState.playerHand, newCard];
    // Recalculate the player's score based on the updated hand.
    const newScore = calculateScore(newHand);

    // Check for bust condition: If score exceeds 21, player busts.
    if (newScore > 21) {
      setGameState(prev => ({
        ...prev,
        deck: newDeck,
        playerHand: newHand,
        playerScore: newScore,
        gameStatus: 'gameOver',
        message: 'Bust! Dealer wins!'
      }));
    } else {
      // If the player is still in the game, simply update hand and score.
      setGameState(prev => ({
        ...prev,
        deck: newDeck,
        playerHand: newHand,
        playerScore: newScore
      }));
    }
  };

  // stand: Finalizes the player's turn.
  // Allows the dealer to draw cards until reaching a minimum score threshold (17) and then determines the winner.
  const stand = () => {
    // Only allow stand if game is in the 'playing' state.
    if (gameState.gameStatus !== 'playing') return;

    // Initialize dealer's hand and deck copies.
    let currentDealerHand = [...gameState.dealerHand];
    let currentDeck = [...gameState.deck];
    let dealerScore = calculateScore(currentDealerHand);

    // Dealer must draw cards until reaching a score of at least 17.
    while (dealerScore < 17) {
      const newCard = currentDeck.pop()!;
      currentDealerHand.push(newCard);
      dealerScore = calculateScore(currentDealerHand);
    }

    // Calculate the final player score using the calculateScore function.
    const playerScore = calculateScore(gameState.playerHand);
    let message = '';
    let chips = gameState.chips;

    // Determine game outcome:
    // - If dealer busts (score > 21) or player's score is higher, declare player as winner and reward chips.
    // - If dealer's score is higher, dealer wins.
    // - If scores are equal, it's a push and bet is returned.
    if (dealerScore > 21 || playerScore > dealerScore) {
      message = 'Player wins!';
      chips += gameState.currentBet * 2;
    } else if (dealerScore > playerScore) {
      message = 'Dealer wins!';
    } else {
      message = 'Push!';
      chips += gameState.currentBet;
    }

    // Update game state with final results: dealer hand, scores, chips, and game outcome message.
    setGameState(prev => ({
      ...prev,
      deck: currentDeck,
      dealerHand: currentDealerHand,
      dealerScore,
      gameStatus: 'gameOver',
      message,
      chips
    }));
  };

  return (
    <div className="min-h-screen bg-green-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {/* Title and icon spawn: Displays the game title and current chip count with icon */}
          <h1 className="text-4xl font-bold text-white">Blackjack</h1>
          <div className="flex items-center bg-green-700 rounded-lg p-3">
            <Coins className="text-yellow-400 w-6 h-6 mr-2" />
            <span className="text-white font-bold">{gameState.chips}</span>
          </div>
        </div>

        {gameState.gameStatus === 'betting' ? (
          // Betting Phase: Display betting options if game is in 'betting' mode.
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl text-white mb-4">{gameState.message}</h2>
            <div className="flex gap-4">
              {[10, 25, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => placeBet(amount)}
                  disabled={gameState.chips < amount}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Playing or Game Over Phase: Show dealer and player hands along with control buttons.
          <>
            {/* Dealer's Hand Section */}
            <div className="mb-8">
              <h2 className="text-xl text-white mb-2">Dealer's Hand</h2>
              <div className="flex flex-wrap">
                {gameState.dealerHand.map((card, index) => (
                  // If the game is still in 'playing' phase, hide the dealer's second card.
                  <CardComponent
                    key={index}
                    card={card}
                    hidden={index === 1 && gameState.gameStatus === 'playing'}
                  />
                ))}
              </div>
              <p className="text-white mt-2">
                Score: {gameState.gameStatus === 'playing' ? gameState.dealerScore : calculateScore(gameState.dealerHand)}
              </p>
            </div>

            {/* Player's Hand Section */}
            <div className="mb-8">
              <h2 className="text-xl text-white mb-2">Your Hand</h2>
              <div className="flex flex-wrap">
                {gameState.playerHand.map((card, index) => (
                  <CardComponent key={index} card={card} />
                ))}
              </div>
              <p className="text-white mt-2">Score: {gameState.playerScore}</p>
            </div>

            {/* Action Buttons: Show options for hitting, standing, or starting a new game */}
            <div className="flex justify-center gap-4">
              {gameState.gameStatus === 'playing' ? (
                <>
                  <button
                    onClick={hit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Hit
                  </button>
                  <button
                    onClick={stand}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Stand
                  </button>
                </>
              ) : (
                <button
                  onClick={resetGame}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
                >
                  New Game
                </button>
              )}
            </div>

            {/* Outcome Message: Displays game result messages (win, lose, push) */}
            {gameState.message && (
              <div className="mt-4 text-center">
                <p className="text-2xl text-white font-bold">{gameState.message}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;