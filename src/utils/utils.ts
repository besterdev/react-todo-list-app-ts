import _ from "lodash";

export const uuid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useSort2Array = () => {
  const array1 = _.map(_.range(10), () => _.random(10));
  const array2 = _.map(_.range(10), () => _.random(10));
  const newArray1: number[] = [];

  _.forEach(array1, (number) => {
    const isDuplicate = _.includes(array2, number);
    if (isDuplicate) {
      newArray1.push(number);
    }
  });
  console.log(array1);
  console.log(array2);
  console.log(newArray1);
};
