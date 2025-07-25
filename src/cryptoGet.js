//function 1: shuffle with crypto.getRandomValues() & logging
function cryptoShuffle1(array) {
  console.log("starting cryptoShuffle1...");
  const shuffled = [...array];
  console.log(`initial array: [${shuffled.join(", ")}]`);

  const randomValues = [];
  for (let i = shuffled.length - 1; i > 0; i--) {
    //generate a random 32-bit integer
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const rawValue = array[0];
    //scale to [0,1) for logging consistency
    const scaledValue = rawValue / (2**32);
    //pick random index from 0 to i
    const j = rawValue % (i + 1); //modulo to ensure range [0, i]
    console.log(
      `step ${shuffled.length - i}: rawValue=${rawValue}, ` +
      `scaledValue=${scaledValue.toFixed(6)}, ` +
      `i=${i}, range=[0,${i}], chosen j=${j}, ` +
      `before swap: [${shuffled.join(", ")}]`
    );
    //swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    console.log(`after swap: [${shuffled.join(", ")}]`);
    randomValues.push(scaledValue);
  }

  console.log(`final shuffled array (cryptoShuffle1): [${shuffled.join(", ")}]`);
  console.log(`all scaled random values: [${randomValues.map(v => v.toFixed(6)).join(", ")}]`);
  console.log("--- end of cryptoShuffle1 ---\n");
  return { shuffled, randomValues };
}

//function 2: identical shuffle with different name
function cryptoShuffle2(array) {
  console.log("starting cryptoShuffle2...");
  const shuffled = [...array];
  console.log(`initial array: [${shuffled.join(", ")}]`);

  const randomValues = [];
  for (let i = shuffled.length - 1; i > 0; i--) {
    //generate a random 32-bit integer
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const rawValue = array[0];
    //scale to [0,1) for logging consistency
    const scaledValue = rawValue / (2**32);
    //pick random index from 0 to i
    const j = rawValue % (i + 1); //modulo to ensure range [0, i]
    console.log(
      `Step ${shuffled.length - i}: rawValue=${rawValue}, ` +
      `scaledValue=${scaledValue.toFixed(6)}, ` +
      `i=${i}, range=[0,${i}], chosen j=${j}, ` +
      `before swap: [${shuffled.join(", ")}]`
    );
    //swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    console.log(`After swap: [${shuffled.join(", ")}]`);
    randomValues.push(scaledValue);
  }

  console.log(`Final shuffled array (cryptoShuffle2): [${shuffled.join(", ")}]`);
  console.log(`All scaled random values: [${randomValues.map(v => v.toFixed(6)).join(", ")}]`);
  console.log("--- End of cryptoShuffle2 ---\n");
  return { shuffled, randomValues };
}

//test the functions
const testArray = ["apple", "banana", "cherry", "date"];
console.log("Testing with array:", testArray);

//run both functions
const result1 = cryptoShuffle1(testArray);
const result2 = cryptoShuffle2(testArray);

//compare results
console.log("Comparing results:");
console.log(`Shuffled array (cryptoShuffle1): [${result1.shuffled.join(", ")}]`);
console.log(`Shuffled array (cryptoShuffle2): [${result2.shuffled.join(", ")}]`);
console.log(
  `Are shuffled arrays identical? ${result1.shuffled.join() === result2.shuffled.join() ? "Yes" : "No"}`
);
console.log(
  `Are random value sequences identical? ${
    result1.randomValues.join() === result2.randomValues.join() ? "Yes" : "No"
  }`
);