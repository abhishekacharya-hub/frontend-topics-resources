// A generic Hashing implementation following from the book - Data Structures and Algorithms with JavaScript by Michael McMillan

class HashTable {
  constructor() {
    this.table = new Array(137);
    this.value = [];
  }

/* The Hash-function takes a key and converts it to a number which will be the index at which to store it. In my hash() function below, I am computing a hash value by summing the ASCII value of each character of the string (the argument passed-in) using the JavaScript function charCodeAt() to return a character’s ASCII value after multiplying the ASCII value by a multiplier H, which in this case, is an odd prime 37. And the reason to choose 37 being, by some empirical research, if we take over 50,000 English words (formed as the union of the word lists provided in two variants of Unix), using the constants 31, 33, 37, 39, and 41 will produce less than 7 collisions in each case, while creating a hashing function.

Note that this remainder method (modulo arithmetic) will typically be present in some form in all hash functions, since the result must be in the range of slot names. In the below cae (total %= this.table.length). Because, the hash function will turn its passed-in argument and return an integer in the range of slot names, between 0 and m-1.
A perfect hash can be created if the number and construction of the keys are known factors. For example, a perfect hash for a list of ten product numbers that are sure to differ in their 4th and 5th digits can be easily constructed like so,
unsigned hash(unsigned pid)
{
    return pid / 1000 % 100;
}
*/

  // the first implementation of my hash table
  hash(string) {
    const H = 37;
    let total = 0;

    for (var i = 0; i < string.length; i++) {
      total += (H * total + string.charCodeAt(i));
    }
    total %= this.table.length;
    if (total < 1) {
      this.table.length - 1
    }
    return parseInt(total);
  }

  // function to console.log the distribution of the key-values. They key being the ones that were generated by the Hash Function after hashing and values what was passed in the hashing function as the arguments.
  showDistro() {
    for (const key in this.table) {
      if (this.table[key] !== undefined) {
        console.log(key, " : ", this.table[key]);
      }
    }
  }

  // The put() function receives the array index value from the simpleHash() function and stores the data element in that position.
  put(data) {
    const pos = hash(data);
    this.table[pos] = data;
  }

  // define the get() function so that we can retrieve data stored in a hash table. This function must, again, hash the key so that it can determine where the data is stored, and then retrieve the data from its position in the table.
  get(key) {
    return this.table[this.hash[key]];
  }
}

/* ***************************************************************
  HashTable with Build Chains/Seperate Chaining technique class example for exercise 2. To implement separate chaining, after we create the array to store the hashed keys, we call a function that assigns an empty array to each array element of the hash table. This creates a two-dimensional array. The buildChains() function, creates the second array
  ****************************************************************** */
class HashTableChains extends HashTable {
  constructor() {
    super();
    this.buildChains();
  }

  buildChains() {
    for (i = 0; i < this.table.length; i++) {
      this.table[i] = new Array(); //assigning an empty array to each array element of the hash table.
    }
  }
  /* We need to modify the showDistro() function in the following way to recognize that the hash table is now a multidimensional array under the build-chain technique */
  showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; ++i) {
      if (this.table[i] != undefined) {
        console.log(i + " : " + this.table[i]);
      }
    }
  }

  /*This put function (under Build Chains/Seperate Chaining) contains the logic for handling collisions, the instances in which there are multiple values at a particular index, called the bucket. This is accomplished by looping through all tuples in the hash table’s index of interest to find the desired tuple.
    The put() function hashes the key and then attempts to store the data in the first cell (index = 0) of the chain at the hashed position. If that cell already has data in it, the function searches for the first open cell and stores the data in that cell.
    Also note, here with buildChains() function we have created a two-diamensional array. And so we are assigning/storing the data in the inner array of the hash-table. So here the variable "pos" is the key for the outer array and "index" is the key of the inner arrray.
    */
  putChain(key, data) {
    const pos = this.hash(key);
    let index = 0; // put() will try to store the data starting from this index position
    if (this.table[pos][index] === undefined) {
      this.table[pos][index] = data;
    } else {
      ++index; //pre-increment "index" meaning, at this step of code execution, the value of "index" is the final value after incrementing. This is necessary here, because, now the next piece of code will need to check the next index postion under this same if condition, so we necessarily have to pre-increment "index"
      // Check if the next "index" has a value already
      while (this.table[pos][index] !== undefined) {
        index++;
      }
      this.table[pos][index] = data;
    }
  }
  // The get() function starts out by hashing the key to get the position of the key in the hash table. Then the function searches the cells until it finds the key it is looking for. And the inequality condition checked under the while loop is just syntactical to check that the key and values of a position are different.
  getChain(key) {
    const pos = this.hash(key);
    let index = 0;
    while (this.table[pos][key] !== key) {
      if (this.table[pos][key] !== undefined) {
        return this.table[pos][key];
      } else {
        return undefined;
      }
      index++
    }
  }
}
  /* ****************************************************************
  HashTable with Linear Probing technique
******************************************************************* */
class HashTableLinearP extends HashTable {
  constructor() {
    super();
    this.values = new Array();
    // Unlike the build-chain method here, for the values, I dont create an inner array.
  }

  /* With linear probing, when there is a collision, the program simply looks to see if the next  element of the hash table is empty. If so, the key is placed in that element. If the element is not empty, the program continues to search for an empty hash-table element until one is found. */
  putLinearP(key, data) {
    var pos = this.hash(key);
    if (this.table[pos] !== undefined) {
      this.table[pos] = key;
      this.values[pos] = data;
    } else {
      while (this.table[pos] !== undefined) {
        pos++;
      }
      this.table[pos] = key;
      this.values[pos] = data;
    }
  }

  getLinearP(key) {
    const hash = this.hash(key);
    if (hash > -1) {
      for (let i = hash; this.table[i] !== undefined; i++) {
        if (this.table[i] === key) {
          return this.values[i];
        }
      }
    }
    return undefined;
  }

  showDistro() {
    for (const key in this.table) {
      if (this.table[key] !== undefined) {
        console.log(key, " : ", this.values[key]);
      }
    }
  }
}

  // Implemet some performance test cases. The makeid function is from - https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/1349426#1349426 to generate 100 character string composed of characters picked randomly from the set [a-zA-Z0-9] .

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 1000; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  }

  const hashChains = new HashTableChains();
  const hashLinear = new HashTableLinearP();

  var keys = [];
  var values = [];

  // Create a set of 100 data points for values and keys
  for (var i = 0; i < 1000; i++) {
    keys.push(makeid());
    values.push(Math.random(i));
  }

  // Put the above randomly generated data into the HasTable under Seperate Chaining
  console.time("putChains");
  for (var i = 0; i < keys.length; i++) {
    hashChains.putChain(keys[i], values[i]);
  }
  console.timeEnd("putChains");

  // Now Get those data from the HasTable
  console.time("getChains");
  for (var i = 0; i < keys.length; i++) {
    hashChains.getChain(keys[i], values[i]);
  }
  console.timeEnd("getChains");


  // Now Put those randomly generated data into the HasTable under Linear Probing
  console.time("putLinearProbing");
  for (var i = 0; i < keys.length; i++) {
    hashLinear.putLinearP(keys[i], values[i]);
  }
  console.timeEnd("putLinearProbing");

  // And Get those data from the HashTable
  console.time("getLinearProbing");
  for (var i = 0; i < keys.length; i++) {
    hashLinear.getLinearP(keys[i], values[i]);
  }
  console.timeEnd("getLinearProbing");
