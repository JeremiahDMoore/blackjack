# Blackjack Web

## Overview
A web-based blackjack game to play in the browser. Built with React, TypeScript, Vite, and Tailwind CSS. Best used in Google Chrome.

Play the game at [basic-blackjack-21.netlify.app](https://basic-blackjack-21.netlify.app/)

## Getting Started

### Prerequisites
- Node.js v14 or newer.
- npm (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd blackjack-web
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Project
Start the development server:
```bash
npm run dev
```
Open your browser at: [http://localhost:3000](http://localhost:3000)

## How to Play

### Game Objective
The objective of blackjack is to beat the dealer by acquiring a hand value closest to 21 without exceeding it.

### Game Flow
- **Betting:** Begin by placing a bet. Each wager deducts chips from your total.
- **Dealing:** When the game starts, both you and the dealer receive two cards. The dealer's second card remains hidden until your turn is over.
- **Player Actions:**
  - **Hit:** Request an additional card to improve your hand value.
  - **Stand:** End your turn, prompting the dealer's play.
- **Dealer's Turn:** The dealer reveals their hidden card and continues drawing cards until reaching a minimum score of 17 or busting (exceeding 21).

### Rules of the Game
- **Card Values:**
  - **Numbers (2-10):** Face value.
  - **Face Cards (J, Q, K):** Valued at 10.
  - **Aces:** Valued at 11, but can be reduced to 1 if needed to avoid busting.
- **Winning Conditions:**
  - Achieving a blackjack (an Ace and a 10-value card) typically wins immediately unless the dealer also has blackjack.
  - If the player’s final hand value is greater than the dealer’s without exceeding 21, the player wins.
  - Exceeding 21 results in a bust, and the dealer wins.
  - A tie (push) results in the bet being returned without winnings.

## Conclusion
This project showcases modern web development practices with a focus on creating clean code. The project has room for improvement, such as adding split, double down, etc. to the game logic and enhancing the user interface. The code has been well commented and organized with AI assistance, making it easy to understand and maintain.