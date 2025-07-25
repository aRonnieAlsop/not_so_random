//first function-->shuffle with detailed logging
function shuffleWithLogs1(deck) {
  console.log("Starting shuffleWithLogs1...");
  //create a copy to avoid modifying the original
  const shuffled = [...deck];
  console.log(`Initial deck: [${shuffled.join(", ")}]`);

  for (let i = shuffled.length - 1; i > 0; i--) {
    //generate random number
    const randomValue = Math.random();
    //calculate random index from 0 to i
    const j = Math.floor(randomValue * (i + 1));
    //log details
    console.log(
      `Step ${shuffled.length - i}: randomValue=${randomValue.toFixed(6)}, ` +
      `i=${i}, range=[0,${i}], chosen j=${j}, ` +
      `before swap: [${shuffled.join(", ")}]`
    );
    //swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    console.log(`After swap: [${shuffled.join(", ")}]`);
  }

  console.log(`Final shuffled deck (shuffleWithLogs1): [${shuffled.join(", ")}]`);
  console.log("--- End of shuffleWithLogs1 ---\n");
  return shuffled;
}

//2nd function: identical shuffle with logging (different name)
function shuffleWithLogs2(deck) {
  console.log("Starting shuffleWithLogs2...");
  //create a copy to avoid modifying the original
  const shuffled = [...deck];
  console.log(`Initial deck: [${shuffled.join(", ")}]`);

  for (let i = shuffled.length - 1; i > 0; i--) {
    //generate random number
    const randomValue = Math.random();
    //calculate random index from 0 to i
    const j = Math.floor(randomValue * (i + 1));
    //log process details
    console.log(
      `Step ${shuffled.length - i}: randomValue=${randomValue.toFixed(6)}, ` +
      `i=${i}, range=[0,${i}], chosen j=${j}, ` +
      `before swap: [${shuffled.join(", ")}]`
    );
    //swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    console.log(`After swap: [${shuffled.join(", ")}]`);
  }

  console.log(`Final shuffled deck (shuffleWithLogs2): [${shuffled.join(", ")}]`);
  console.log("--- End of shuffleWithLogs2 ---\n");
  return shuffled;
}

//same tests for both functions
const testdeck = ["Ace♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "Jack♥", "Queen♥", "King♥", "Ace♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "Jack♠", "Queen♠", "King♠", "Ace♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "Jack♣", "Queen♣", "King♣", "Ace♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "Jack♦", "Queen♦", "King♦"];
console.log("Testing with deck:", testdeck);

//run both shuffle functions
const result1 = shuffleWithLogs1(testdeck);
const result2 = shuffleWithLogs2(testdeck);

//compare results
console.log("Comparing results:");
console.log(`Result from shuffleWithLogs1: [${result1.join(", ")}]`);
console.log(`Result from shuffleWithLogs2: [${result2.join(", ")}]`);
console.log(
  `Are results identical? ${result1.join() === result2.join() ? "Yes" : "No"}`
);