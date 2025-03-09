import { Card } from './types';

// createDeck: Generates a full deck of cards.
// Iterates over each suit and value to create each card with a suit, a value, and its corresponding numeric value.
// Notable: Aces are initially valued at 11, face cards (J, Q, K) are valued at 10, and numbered cards are parsed as integers.
export const createDeck = (): Card[] => {
  const suits: Card['suit'][] = ['♠', '♣', '♥', '♦'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        suit,
        value,
        numericValue: value === 'A' ? 11 : ['K', 'Q', 'J'].includes(value) ? 10 : parseInt(value)
      });
    }
  }

  // Shuffle the deck using the Fisher-Yates algorithm for an unbiased random order.
  return shuffle(deck);
};

// shuffle: Implements the Fisher-Yates (Knuth) Shuffle algorithm.
// Iterates backward through the deck and swaps each card with a random earlier card.
// This ensures every permutation of the deck is equally likely.
export const shuffle = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

// calculateScore: Computes the total score of a hand of cards.
// Initially, Aces count as 11. If the score exceeds 21, each Ace can be reduced from 11 to 1 (by subtracting 10) one at a time.
// This algorithm ensures the best possible score under 21 is calculated.
export const calculateScore = (hand: Card[]): number => {
  let score = 0;
  let aces = 0;

  // Sum the numeric values in the hand; count the number of Aces.
  for (const card of hand) {
    if (card.value === 'A') {
      aces += 1;
    }
    score += card.numericValue;
  }

  // Adjust for Aces: If score exceeds 21 and there are Aces counted as 11,
  // reduce the score by 10 for each Ace until the score is <=21 or no Aces remain.
  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
};