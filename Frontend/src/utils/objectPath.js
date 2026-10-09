// immutable set: setIn(obj, ['hero','headline'], 'New') returns a new object
export function setIn(obj, path, value) {
  const [key, ...rest] = path;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[key] = rest.length ? setIn(obj?.[key] ?? {}, rest, value) : value;
  return copy;
}

export const getIn = (obj, path) => path.reduce((o, k) => (o == null ? o : o[k]), obj);

// move an array item up (-1) or down (+1)
export function moveItem(arr, index, dir) {
  const to = index + dir;
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  [copy[index], copy[to]] = [copy[to], copy[index]];
  return copy;
}

export const newId = () => Date.now() + Math.floor(Math.random() * 1000);
