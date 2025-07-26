# Deck Shuffling Comparison: Math.random() vs crypto.getRandomValues()

## Overview
In this project, we're comparing two methods for shuffling a standard 52-card deck: `Math.random()` and `crypto.getRandomValues()`. Our goal is to evaluate how each method performs in terms of randomness, statistical properties, and suitability for a real-world card shuffle.

A real-world shuffle (think riffle shuffle) is random, fair, and unpredictable, ensuring no patterns can be exploited. This is crucial for card games, simulations, or anything that requires unbiased results.

We will analyze both methods using a **Fisher-Yates shuffle** and run some tests to compare their randomness.

## Goals

- **Shuffle the Deck**: Use both `Math.random()` and `crypto.getRandomValues()` with the Fisher-Yates algorithm.
- **Log the Process**: We'll show the random values and swaps to help visualize how the shuffling works.
- **Compare Randomness**: We'll test how evenly the deck is shuffled over many iterations to check for uniformity and fairness.
- **Determine Suitability**: We'll assess which method better mirrors the unpredictability and fairness of a physical card shuffle.

## Why Compare These Methods?

### Math.random()

#### Pros:
- **Fast & Built-in**: It's a quick, easy-to-use built-in JavaScript function.
- **Good for Casual Games**: Great for non-critical applications where performance matters more than cryptographic security.

#### Cons:
- **Not Secure**: It’s not cryptographically secure. If someone knows the seed, they might predict future numbers.
- **Statistical Bias**: While generally decent, it can sometimes have subtle biases in certain situations.

#### Real-World Fit:
- Suitable for casual games, but less ideal for applications where fairness or security is critical (e.g., professional card games or simulations).

### crypto.getRandomValues()

#### Pros:
- **Cryptographically Secure**: Uses system entropy, providing high-quality randomness.
- **Better Distribution**: Ideal for fairness-critical applications, like gambling or cryptographic simulations.

#### Cons:
- **Slightly Slower**: Takes a bit longer than `Math.random()` because it draws from system entropy.
- **No Seed Control**: It’s non-reproducible, which means you can't replicate the exact shuffle.

#### Real-World Fit:
- Mirrors physical shuffling well due to its unpredictability and fairness, perfect for professional or simulation card games where fairness is paramount.

## Real-World Card Shuffling
A good physical shuffle ensures:
- **Uniformity**: Every possible permutation is equally likely.
- **Unpredictability**: You can’t guess the outcome without cheating.
- **Fairness**: No biases toward any specific card or sequence.

### For Digital Shuffling:
To match this behavior, our method needs to:
- Produce unbiased permutations.
- Be unpredictable.
- Avoid patterns that could be exploited.

## Code Implementation

We’re using **Fisher-Yates algorithm** to shuffle the deck. Here’s the code:

### Code: JavaScript Shuffle Functions

```javascript
// Deck of 52 cards
const testdeck = [
  "Ace♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "Jack♥", "Queen♥", "King♥",
  "Ace♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "Jack♠", "Queen♠", "King♠",
  "Ace♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "Jack♣", "Queen♣", "King♣",
  "Ace♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "Jack♦", "Queen♦", "King♦"
];

// Shuffle using Math.random()
function shuffleWithMathRandom(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomValue = Math.random();
    const j = Math.floor(randomValue * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle using crypto.getRandomValues()
function shuffleWithCryptoRandom(array) {
  const shuffled = [...array];
  const randomInts = new Uint32Array(shuffled.length - 1);
  crypto.getRandomValues(randomInts);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const rawValue = randomInts[shuffled.length - 1 - i];
    const j = rawValue % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
