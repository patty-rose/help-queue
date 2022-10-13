const rev = (str) => {
  let strArr = str.split("");
  let vowels = [];
  let isVowel = (letter) => (/[aeiou]/gi).test(letter);
  let swap = (a, b, arr) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
  let left = 0;
  let right = strArr.length - 1;
  
  while(left < right){
    if(isVowel(strArr[left]) && isVowel(strArr[right])){
      swap(left, right, strArr);
      left++;
      right--;
    } else if(isVowel(strArr[left])){
       right--;
    } else {
      left++;
    }
  }
  return strArr.join("");
}

console.log(rev("helalo"));