//deck of 52 cards
const testdeck = [
  "Ace♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "Jack♥", "Queen♥", "King♥",
  "Ace♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "Jack♠", "Queen♠", "King♠",
  "Ace♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "Jack♣", "Queen♣", "King♣",
  "Ace♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "Jack♦", "Queen♦", "King♦"
];

//shuffle using Math.random() with logging
function shuffleWithMathRandom(array) {
  console.log("Starting shuffleWithMathRandom...");
  const shuffled = [...array];
  console.log(`Initial array: [${shuffled.slice(0, 5).join(", ")}...]`); // Show first 5 cards for brevity
  const randomValues = [];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomValue = Math.random();
    const j = Math.floor(randomValue * (i + 1));
    randomValues.push(randomValue);
    console.log(
      `Step ${shuffled.length - i}: randomValue=${randomValue.toFixed(6)}, ` +
      `i=${i}, range=[0,${i}], chosen j=${j}, ` +
      `before swap: [${shuffled.slice(0, 5).join(", ")}...]`
    );
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    console.log(`After swap: [${shuffled.slice(0, 5).join(", ")}...]`);
  }

  console.log(`Final shuffled array: [${shuffled.slice(0, 5).join(", ")}...]`);
  console.log(`All random values: [${randomValues.slice(0, 5).map(v => v.toFixed(6)).join(", ")}...]`);
  console.log("--- End of shuffleWithMathRandom ---\n");
  return { shuffled, randomValues };
}

//shuffle using crypto.getRandomValues() with logging
function shuffleWithCryptoRandom(array) {
  console.log("Starting shuffleWithCryptoRandom...");
  const shuffled = [...array];
  console.log(`Initial array: [${shuffled.slice(0, 5).join(", ")}...]`); //show first 5 cards for brevity
  const randomValues = [];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const rawValue = array[0];
    const scaledValue = rawValue / (2**32); //scale to [0,1) for comparison
    const j = rawValue % (i + 1); //modulo for range [0, i]
    randomValues.push(scaledValue);
    console.log(
      `Step ${shuffled.length - i}: rawValue=${rawValue}, ` +
      `scaledValue=${scaledValue.toFixed(6)}, ` +
      `i=${i}, range=[0,${i}], chosen j=${j}, ` +
      `before swap: [${shuffled.slice(0, 5).join(", ")}...]`
    );
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    console.log(`After swap: [${shuffled.slice(0, 5).join(", ")}...]`);
  }

  console.log(`Final shuffled array: [${shuffled.slice(0, 5).join(", ")}...]`);
  console.log(`All random values: [${randomValues.slice(0, 5).map(v => v.toFixed(6)).join(", ")}...]`);
  console.log("--- End of shuffleWithCryptoRandom ---\n");
  return { shuffled, randomValues };
}

//test permutation uniformity over many shuffles
function testPermutationUniformity(shuffleFn, deck, iterations = 10000) {
  console.log(`Testing uniformity for ${shuffleFn.name} (${iterations} shuffles)...`);
  //track position of a specific card (e.g., "Ace♥") in the shuffled deck
  const positionCounts = Array(deck.length).fill(0); //count occurrences at each position
  const samplePermutations = new Set(); //track unique permutations (sample for analysis)

  for (let i = 0; i < iterations; i++) {
    const { shuffled } = shuffleFn(deck);
    //track where "Ace♥" ends up
    const aceIndex = shuffled.indexOf("Ace♥");
    positionCounts[aceIndex]++;
    //store a sample of permutations (join as string for uniqueness)
    if (i < 100) samplePermutations.add(shuffled.join(","));
  }

  //expected frequency per position (uniform distribution)
  const expectedFreq = iterations / deck.length;
  console.log(`position counts for "Ace♥":`, positionCounts.map(c => c.toFixed(0)).join(", "));
  console.log(`expected frequency per position: ${expectedFreq.toFixed(2)}`);
  console.log(`unique permutations (sample of 100): ${samplePermutations.size} (max 100)`);
  //simple chi-squared statistic for uniformity
  const chiSquared = positionCounts.reduce((sum, count) => {
    return sum + ((count - expectedFreq) ** 2) / expectedFreq;
  }, 0);
  console.log(`chi-squared statistic: ${chiSquared.toFixed(2)} (lower is better, expect ~52 for uniform)`);
  console.log(`--- end of uniformity test for ${shuffleFn.name} ---\n`);
  return { positionCounts, chiSquared };
}

//run a single shuffle for inspection
console.log("Single shuffle comparison:");
const mathResult = shuffleWithMathRandom(testdeck);
const cryptoResult = shuffleWithCryptoRandom(testdeck);

//compare single shuffle results
console.log("comparing single shuffle results:");
console.log(`Math.random() result: [${mathResult.shuffled.slice(0, 5).join(", ")}...]`);
console.log(`crypto.getRandomValues() result: [${cryptoResult.shuffled.slice(0, 5).join(", ")}...]`);
console.log(
  `are results identical? ${mathResult.shuffled.join() === cryptoResult.shuffled.join() ? "Yes" : "No"}`
);

//run uniformity test
console.log("\nRunning uniformity tests...");
const mathStats = testPermutationUniformity(shuffleWithMathRandom, testdeck, 10000);
const cryptoStats = testPermutationUniformity(shuffleWithCryptoRandom, testdeck, 10000);

//compare uniformity
console.log("comparing uniformity:");
console.log(`Math.random() chi-squared: ${mathStats.chiSquared.toFixed(2)}`);
console.log(`crypto.getRandomValues() chi-squared: ${cryptoStats.chiSquared.toFixed(2)}`);
console.log(
  `which is more uniform? ${
    mathStats.chiSquared < cryptoStats.chiSquared ? "Math.random()" : "crypto.getRandomValues()"
  } (lower chi-squared is better)`
);