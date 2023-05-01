// 1. Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223 
function reverseNumber(n){
    let reversedNum = parseInt(num.toString().split('').reverse().join(''));
    return reversedNum;
}

let x = 32243;
let reversedX = reverseNumber(x);
console.log(reversedX); 

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g.,
// madam or nurses run.
function isPalindrome(str) {
    let cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
  }
  
  let input1 = "qabaq";
  let input2 = "verify";
  console.log(isPalindrome(input1));
  console.log(isPalindrome(input2)); 
  

// 3. Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g 
function stringCombinations(str) {
    let combinations = [];
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j <= str.length; j++) {
        combinations.push(str.slice(i, j));
      }
    }
    return combinations;
  }

  let input = "dog";
  let output = stringCombinations(input);
  console.log(output);

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
function sortAlphabetically(str) {
    let charArray = str.split('');
    charArray.sort();
    let sortedStr = charArray.join('');
    return sortedStr;
  }
  let input = "webmaster";
  let output = sortAlphabetically(input);
  console.log(output);
  

// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of
// each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '
function capitalizeFirst(str) {
    let words = str.split(' ');
    let capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let capitalizedStr = capitalizedWords.join(' ');
    return capitalizedStr;
  }
  
  let input = "the quick brown fox";
  let output = capitalizeFirst(input);
  console.log(output); 
  

// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word
// within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'
function findLongestWord(str) {
    let words = str.split(' ');
    let longestWord = "";
    let maxLength = 0;

    words.forEach(word => {
      if (word.length > maxLength) {
        maxLength = word.length;
        longestWord = word;
      }
    });

    return longestWord;
  }
  
  let input = "Web Development Tutorial";
  let output = findLongestWord(input);
  console.log(output); 
  

// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of
// vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as
// vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5
function countVowels(str) {
  let vowels = "aeiouAEIOU";
  let vowelCount = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      vowelCount++;
    }
  }

  return vowelCount;
}

let input = "The quick brown fox";
let output = countVowels(input);
console.log(output); 


// 8. Write a JavaScript function that accepts a number as a parameter and check the number is
// prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive
// divisors other than 1 and itself.
function isPrime(num) {
    if (num <= 1) {
      return false;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
  
    return true;
  }
  
  let input1 = 7;
  console.log(isPrime(input1)); 

  

// 9. Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string,
// and undefined.
function getType(value) {
    return typeof value;
  }

  console.log(getType(42));   

// 10. Write a JavaScript function which returns the n rows by n columns identity matrix. 
function identityMatrix(n) {
    let matrix = [];
  
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        matrix[i][j] = i === j ? 1 : 0;
      }
    }
  
    return matrix;
  }

  let n = 4;
  let result = identityMatrix(n);
  console.log(result);
  
  

// 11. Write a JavaScript function which will take an array of numbers stored and find the second
// lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4 
function secondLowestAndGreatest(arr) {
    let sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    let secondLowest = sortedArray[1];
    let secondGreatest = sortedArray[sortedArray.length - 2];
  
    return [secondLowest, secondGreatest];
  }

  let sampleArray = [1, 2, 3, 4, 5];
  let result = secondLowestAndGreatest(sampleArray);
  console.log(result); 
  

// 12. Write a JavaScript function which says whether a number is perfect. 
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to
// the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the
// number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is
// half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1
// + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 +
// 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the
// perfect numbers 496 and 8128.
function isPerfectNumber(num) {
    let sumOfDivisors = 0;
  
    for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) {
        sumOfDivisors += i;
      }
    }
  
    return sumOfDivisors === num;
  }

  console.log(isPerfectNumber(6));  
  


// 13. Write a JavaScript function to compute the factors of a positive integer. 
function computeFactors(num) {
    let factors = [];
  
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
  
    return factors.sort((a, b) => a - b);
  }
  
  let input = 28;
  let output = computeFactors(input);
  console.log(output); 
  

// 14. Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
function amountToCoins(amount, coins) {
    let result = [];
  
    for (let i = 0; i < coins.length; i++) {
      while (amount >= coins[i]) {
        amount -= coins[i];
        result.push(coins[i]);
      }
    }
  
    return result;
  }
 
  let amount = 46;
  let coinDenominations = [25, 10, 5, 2, 1];
  let output = amountToCoins(amount, coinDenominations);
  console.log(output); 
  

// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the
// bases. Accept b and n from the user and display the result. 
function power(b, n) {
    return Math.pow(b, n);
  }
  

// 16. Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"
function extractUniqueChars(str) {
    let uniqueChars = '';
  
    for (let i = 0; i < str.length; i++) {
      if (uniqueChars.indexOf(str[i]) === -1) {
        uniqueChars += str[i];
      }
    }
  
    return uniqueChars;
  }
  
  let inputString = "thequickbrownfoxjumpsoverthelazydog";
  let outputString = extractUniqueChars(inputString);
  console.log(outputString); 

// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string.
function countLetterOccurrences(str) {
    let letterCount = {};
  
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
      if (letterCount[letter]) {
        letterCount[letter]++;
      } else {
        letterCount[letter] = 1;
      }
    }
  
    return letterCount;
  }

  let inputString = "xwxwxwxw";
  let output = countLetterOccurrences(inputString);
  console.log(output);
 
  

// 18. Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds
// the desired value.
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
  
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return -1;
  }
  
  let sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let targetValue = 13;
  let index = binarySearch(sortedArray, targetValue);
  console.log(index);
  

// 19. Write a JavaScript function that returns array elements larger than a number. 
function filterLargerElements(arr, num) {
    let result = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > num) {
        result.push(arr[i]);
      }
    }
  
    return result;
  }

  let inputArray = [7, 9, 11, 13];
  let threshold = 10;
  let outputArray = filterLargerElements(inputArray, threshold);
  console.log(outputArray); 

// 20. Write a JavaScript function that generates a string id (specified length) of random characters.
// Sample   character   list:
// "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function generateRandomId(length) {
    const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
  
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charList.length);
      result += charList[randomIndex];
    }
  
    return result;
  }
  let idLength = 10;
  let randomId = generateRandomId(idLength);
  console.log(randomId);
  
  

// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2)
// combinations in an array. 
// Sample array: [1, 2, 3] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
function getSubsets(arr, subsetLength) {
    let result = [];
    let f = (n, src, got, all) => {
      if (n === 0) {
        if (got.length > 0) {
          all.push(got);
        }
        return;
      }
      for (let i = 0; i < src.length; i++) {
        f(n - 1, src.slice(i + 1), got.concat([src[i]]), all);
      }
      return;
    };
    f(subsetLength, arr, [], result);
    return result;
  }

  let inputArray = [1, 2, 3];
  let subsetLength = 2;
  let subsets = getSubsets(inputArray, subsetLength);
  console.log(subsets); 
  

// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function
// will count the number of occurrences of the specified letter within the string. 
// Sample arguments: 'microsoft.com', 'o' 
// Expected output: 3 
function countLetterOccurrences(str, letter) {
    let count = 0;
  
    for (let i = 0; i < str.length; i++) {
      if (str[i] === letter) {
        count++;
      }
    }
  
    return count;
  }

  let inputString = "microsoft.com";
  let targetLetter = "o";
  let occurrences = countLetterOccurrences(inputString, targetLetter);
  console.log(occurrences); 
  

// 23. Write a JavaScript function to find the first not repeated character. 
// Sample arguments: 'abacddbec' 
// Expected output: 'e' 
function firstNonRepeatedChar(str) {
    let charCount = {};
  
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (charCount[char]) {
        charCount[char]++;
      } else {
        charCount[char] = 1;
      }
    }
  
    for (let i = 0; i < str.length; i++) {
      if (charCount[str[i]] === 1) {
        return str[i];
      }
    }
  
    return null;
  }
 
  let inputString = "abacddbec";
  let firstUniqueChar = firstNonRepeatedChar(inputString);
  console.log(firstUniqueChar); 
  

// 24. Write a JavaScript function to apply Bubble Sort algorithm. 
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple
// sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing
// each pair of adjacent items and swapping them if they are in the wrong order". 
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
function bubbleSort(arr) {
    let len = arr.length;
    let swapped;
  
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] < arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  
    return arr;
  }

  let inputArray = [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
  let sortedArray = bubbleSort(inputArray);
  console.log(sortedArray); 
  
// 25. Write a JavaScript function that accept a list of country names as input and returns the
// longest country name as output. 
// Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"
function longestCountryName(countryNames) {
    let longestName = "";
  
    for (let i = 0; i < countryNames.length; i++) {
      if (countryNames[i].length > longestName.length) {
        longestName = countryNames[i];
      }
    }
  
    return longestName;
  }

  let countryList = ["Australia", "Germany", "United States of America"];
  let longestName = longestCountryName(countryList);
  console.log(longestName); 
  

// 26. Write a JavaScript function to find longest substring in a given a string without repeating
// characters. 
function longestSubstringWithoutRepeatingChars(str) {
    let longestSubstring = "";
    let currentSubstring = "";
  
    for (let i = 0; i < str.length; i++) {
      let index = currentSubstring.indexOf(str[i]);
      if (index !== -1) {
        currentSubstring = currentSubstring.slice(index + 1);
      }
      currentSubstring += str[i];
      if (currentSubstring.length > longestSubstring.length) {
        longestSubstring = currentSubstring;
      }
    }
  
    return longestSubstring;
  }

  let inputString = "abcabcbb";
  let longestSubstring = longestSubstringWithoutRepeatingChars(inputString);
  console.log(longestSubstring); 
  

// 27. Write a JavaScript function that returns the longest palindrome in a given string. 
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest
// symmetric factor problem is the problem of finding a maximum-length contiguous substring of a
// given string that is also a palindrome. For example, the longest palindromic substring of
// "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for
// example, in the string "abracadabra", there is no palindromic substring with length greater than
// three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all
// substrings that are themselves palindromes and cannot be extended to larger palindromic
// substrings) rather than returning only one substring or returning the maximum length of a
// palindromic substring.
function longestPalindrome(str) {
    let longestPal = "";
  
    for (let i = 0; i < str.length; i++) {
      for (let j = i; j < str.length; j++) {
        let substring = str.substring(i, j + 1);
        if (isPalindrome(substring) && substring.length > longestPal.length) {
          longestPal = substring;
        }
      }
    }
  
    return longestPal;
  }
  
  function isPalindrome(str) {
    let reversed = str.split("").reverse().join("");
    return str === reversed;
  }

  let inputString = "bananas";
  let longestPal = longestPalindrome(inputString);
  console.log(longestPal);
  

// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function square(x) {
    return x * x;
  }
  
  function applyFunction(func, arg) {
    return func(arg);
  }
  
  let result = applyFunction(square, 5);
  console.log(result); 
  

// 29. Write a JavaScript function to get the function name. 
function foo() {
    // test
  }
  
  function getFunctionName(func) {
    return func.name;
  }
  
  let functionName = getFunctionName(foo);
  console.log(functionName); 
  
