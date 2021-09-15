export const computeHash = (title, event, program, output, result) => {
  const obj = { title, event, program, output, result };
  const s = JSON.stringify(obj);
  return btoa(s);
}