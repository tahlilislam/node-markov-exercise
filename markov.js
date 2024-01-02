/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;
      // does the chains obj have the current word as key? if so push next word values into existing array,
      // else create a new arry with the next word as the current word
      this.chains[currWord]
        ? this.chains[currWord].push(nextWord)
        : (this.chains[currWord] = [nextWord]);
    }
  }

  /** Pick random choice from array */
  static choice(ar) {
    // picking arr element at random index
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let word = MarkovMachine.choice(Object.keys(this.chains));
    let wordsArr = [];

    while (wordsArr.length < numWords && word !== null) {
      wordsArr.push(word);
      // Choose the next word randomly from the array associated with the current word
      let nextWord = this.chains[word];
      word = MarkovMachine.choice(nextWord);
    }
    return wordsArr.join(" ");
  }
}

module.exports = {MarkovMachine};
