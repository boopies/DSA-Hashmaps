const HashMap = require('./hashmap');

function main() {
  const LOR = new HashMap();

  LOR.set('Hobbit', 'Bilbo');
  LOR.set('Hobbit', 'Frodo');
  LOR.set('Wizard', 'Gandolf');
  LOR.set('Human', 'Aragon');
  LOR.set('Elf', 'Legolas');
  LOR.set('Maiar', 'The Necromancer');
  LOR.set('Maiar', 'Sauron');
  LOR.set('RingBearer', 'Gollum');
  LOR.set('LadyOfLight', 'Galadriel');
  LOR.set('HalfElven', 'Arwen');
  LOR.set('Ent', 'Treebeard');
  //console.log(LOR._hashTable);
  //for (let i = 0; i < LOR._hashTable.length; i++) {
  //  console.log(LOR._hashTable[i]);
  //}
  console.log(LOR.get('Maiar'));
  console.log(LOR.get('Hobbit'));
}

main();

// 1.
// Two of the items that were set were overwritten with tow other items with identical keys
// Values we got were Sauron and Frodo. Bilbo and the Necromancer were overwritten by Sauron and Frodo
// 24 because it gets scaled up once we get four items in the table.

const WhatDoesThisDo = function() {
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1, 10);
  map1.set(str2, 20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3, 20);
  map2.set(str4, 10);

  //console.log(map1.get(str1));
  //console.log(map2.get(str3));
};
//WhatDoesThisDo();

// We defined two identical strings and passed them as keys to a new hashmap map 1,
// because the keys were identical the second set of value overrides the first set,
// We then do the same exact thing on map 2. Then we console.log the values in each map.

function removeDuplicates(string) {
  let hashMap = new Map();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!hashMap.has(string[i])) {
      hashMap.set(string[i], '');
    }
  }

  for (let [key, value] of hashMap) {
    result += key;
  }
  return result;
}

//console.log(removeDuplicates('google'));
//console.log(removeDuplicates('google all that you can think of'));

function checkPalindromes(string) {
  let hashMap = new Map();
  const maxOdds = string.length % 2;

  for (let i = 0; i < string.length; i++) {
    if (!hashMap.has(string[i])) {
      hashMap.set(string[i], 1);
    } else {
      hashMap.set(string[i], hashMap.get(string[i]) + 1);
    }
  }
  let odds = 0;
  for (let [key, value] of hashMap) {
    if (value % 2 === 1) {
      odds++;
    }
    if (odds > maxOdds) {
      return false;
    }
  }
  return true;
}

console.log(checkPalindromes('acecarr'));
console.log(checkPalindromes('north'));

function anagram(array) {
  let hashMap = new Map();
  for (let i = 0; i < array.length; i++) {
    const sortedWord = array[i]
      .split('')
      .sort()
      .join('');

    if (!hashMap.has(sortedWord)) {
      hashMap.set(sortedWord, [array[i]]);
    } else {
      hashMap.set(sortedWord, [...hashMap.get(sortedWord), array[i]]);
    }
  }
  const returnArray = [];
  for (let [key, value] of hashMap) {
    returnArray.push(value);
  }
  return returnArray;
}

//console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
