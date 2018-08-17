export const  storageKey = 'state';

const Storage = (function(){

  const getStore = () => {
    try {
      const serializedState = localStorage.getItem(storageKey);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch(err) {
      return undefined;
    }
  }

  const setStore = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(storageKey, serializedState);
    } catch(err) {
      // @todo?
    }
  }

  const removeStore = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (err) {
      // @todo?
    }
  }

  return {
    setStore,
    getStore,
    removeStore
  }
}());

export default Storage;
