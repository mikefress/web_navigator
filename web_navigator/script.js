const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Home Page';
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(`\n${action}`);
  console.log(`Current Page = ${currentPage}`);
  console.log(`Back Page = ${backPages.peek()}`);
  console.log(`Next Page = ${nextPages.peek()}`)
}

const newPage = (page) => {
  backPages.push(currentPage)
  currentPage = page
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage('NEW: ');
}

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage('BACK: ');
}

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage('NEXT: ')
}
/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;
showCurrentPage('DEFAULT: ');
while(finish === false) {
  let instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions = `${instructions}, ${backInfo}`;
    showBack = true;
  } else {
    showBack = false;
  }
  if (!nextPages.isEmpty()) {
    instructions = `${instructions}, ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  }
  instructions = `${instructions}, ${quitInfo}`;
  console.log(instructions);


  // ------------------------------
  // User Interface Part 2
  // ------------------------------
  const answer = prompt(question);
  let lowerCaseAnswer = answer.toLowerCase();
  // new url answer
  if((lowerCaseAnswer != 'b') && (lowerCaseAnswer != 'n') && (lowerCaseAnswer != 'q')) {
    newPage(lowerCaseAnswer);
  // back a page
  } else if (lowerCaseAnswer == 'b' && showBack) {
    backPage()
  // next page
  } else if (lowerCaseAnswer == 'n' && showNext) {
    nextPage()
  } else if (lowerCaseAnswer == 'b' && !showBack) {
    console.log('Sorry, that option is not available at this time.')
  } else if (lowerCaseAnswer == 'n' && !showNext) {
    console.log('Sorry, that option is not available at this time.')
  } else if (lowerCaseAnswer == 'q' && !finish) {
    finish = true;
  }
}

