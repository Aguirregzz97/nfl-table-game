export const generateRandomArray = () => {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], // used for nfl game board
    ranNums = [],
    i = nums.length,
    j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }
  return ranNums;
};
