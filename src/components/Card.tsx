import React from 'react';
import { Card as CardType } from '../types';

// CardProps interface: defines the properties expected by the Card component.
// - card: A playing card object with suit, value, and numericValue.
// - hidden: Optional boolean; if true, the card is displayed face down.
interface CardProps {
  card: CardType;
  hidden?: boolean;
}

// Card Component: Renders a playing card.
// Notable implementations:
// - Determines the card color based on its suit (red for hearts and diamonds).
// - Supports a hidden state to render the card back (e.g., for a dealer's hidden card).
// - Displays the card's value and suit with proper styling when visible.
export const Card: React.FC<CardProps> = ({ card, hidden }) => {
  // Identify if the card's suit should be rendered in red.
  const isRed = card.suit === '♥' || card.suit === '♦';
  
  // Render a face-down card when hidden is true.
  if (hidden) {
    return (
      <div className="w-24 h-36 bg-white rounded-lg shadow-md border-2 border-gray-300 flex items-center justify-center m-2">
        <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
          <div className="text-white text-4xl rotate-45">♠</div>
        </div>
      </div>
    );
  }
  
  // Render the face-up card displaying its value and suit.
  return (
    <div className="w-24 h-36 bg-white rounded-lg shadow-md border-2 border-gray-300 flex flex-col justify-between p-2 m-2">
      {/* Top-left: Card value with dynamic color */}
      <div className={`text-lg font-bold ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.value}
      </div>
      {/* Center: Card suit with dynamic color */}
      <div className={`text-4xl ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.suit}
      </div>
      {/* Bottom-right: Card value again for balance */}
      <div className={`text-lg font-bold self-end ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.value}
      </div>
    </div>
  );
};