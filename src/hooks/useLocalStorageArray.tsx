import { useState, useEffect } from 'react';

export const useLocalStorageArray = (key: string, initialValue: string[] = []) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);

    return savedData ? JSON.parse(savedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  const addItem = (item: string) => {
    if (!data.includes(item)) {
      setData((updateData: string[]) => ([...updateData, item]));
    }
  };

  const removeItem = (item: string) => {
    const newData = data.filter((dataItem: string) => dataItem !== item);

    setData(newData);
  };

  const clearItems = () => {
    setData([]);
  };

  return [data, addItem, removeItem, clearItems];
};
