import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [dataArray, setDataArray] = useState(["Tea", "Coffee", "Tea", "Milk", "Squash"]);

  return <DataContext.Provider value={{ dataArray, setDataArray }}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
