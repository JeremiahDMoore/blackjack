/**
 * This file defines the fundamental types used in the Blackjack web project.
 * These types outline the structure of a playing card and represent the overall game state.
 */

/**
 * The Card interface represents an individual playing card.
 * - suit: The suit of the card (spades, clubs, hearts, or diamonds).
 * - value: The face value of the card (e.g., 'A', '2', ..., 'K').
 * - numericValue: The numerical value of the card for score calculation.
 *   Note: Aces are initially treated as 11, face cards (J, Q, K) as 10, and numbered cards are parsed as integers.
 */
export interface Card {
  suit: '♠' | '♣' | '♥' | '♦';
  value: string;
  numericValue: number;
}

/**
 * The GameState interface defines the overall state of the blackjack game.
 * - deck: The array of cards representing the current deck.
 * - playerHand: The cards held by the player.
 * - dealerHand: The cards held by the dealer.
 * - gameStatus: The current phase of the game, such as 'betting', 'playing', 'dealerTurn', or 'gameOver'.
 * - message: A string used for displaying game events or status messages.
 * - playerScore: The current score computed for the player's hand.
 * - dealerScore: The current score computed for the dealer's hand.
 * - chips: The number of chips the player has available for betting.
 * - currentBet: The amount wagered by the player in the current round.
 */
export interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  gameStatus: 'betting' | 'playing' | 'dealerTurn' | 'gameOver';
  message: string;
  playerScore: number;
  dealerScore: number;
  chips: number;
  currentBet: number;
}