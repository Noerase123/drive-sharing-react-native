export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const subStrValue = (value: string, limiter: number) => {
  if (value === undefined) return;
  return value.length < limiter ? value : `${value.substring(0, limiter)}...`;
};
