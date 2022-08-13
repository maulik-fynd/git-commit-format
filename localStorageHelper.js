const lsLoad = (key) => {
  const stored = localStorage.getItem(key);
  return stored == null ? undefined : JSON.parse(stored);
};
const lsStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const lsModify = (key, fn) => {
  lsStore(key, fn(lsLoad(key)));
};
const lsApendItemToArray = (key, item) => {
  lsModify(key, (storage = []) => [...storage, item]);
};
const lsPrependItemToArray = (key, item) => {
  lsModify(key, (storage = []) => [item, ...storage]);
};
const lsRemoveItemFromArray = (key, item) => {
  lsModify(key, (storage = []) => storage.filter((s) => s !== item));
};
const lsSaveItemToObject = (key, item) => {
  lsModify(key, (storage = {}) => ({ ...storage, item }));
};
