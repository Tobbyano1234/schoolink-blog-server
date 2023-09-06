export const createUsername = (firstname: string): string => {
  return `${firstname.replace(/\s/g, "")}${Math.floor(Math.random() * 900) + 100}${firstname.substring(0, 1)}`;
};

/**
 * names start with capital letters.
 */
export const nameFormat = (name: string) => {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
};
