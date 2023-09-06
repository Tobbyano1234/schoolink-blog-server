type dataType = {
  [key: string]: string;
};

export const sorter = (list: dataType) => sorter2(
  sorter1(
    list
  )
);

const sorter1 = (list: dataType) => Object.entries(list).sort((a,b) => {
  return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
});

const sorter2 = (list: [string, string][]) => list.map((elem: string[]) => {
  let data: dataType = {}
  data = {
    value : elem[0],
    text: elem[1],
  };
  return data;
});

// The Fisher-Yates algorith
// https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
export const fisherYatesShuffleSortingAlgorithm = <T>(inputArray: any): T[] => {
  const outputArray = [...inputArray];
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = outputArray[i];
    outputArray[i] = outputArray[j];
    outputArray[j] = temp;
  }
  return outputArray;
};
