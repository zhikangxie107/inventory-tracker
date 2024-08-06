import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedContextType {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedContext = createContext<SelectedContextType | undefined>(undefined);

interface SelectedProviderProps {
  children: ReactNode;
}

export const SelectedProvider: React.FC<SelectedProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = (): SelectedContextType => {
  const context = useContext(SelectedContext);
  if (context === undefined) {
    throw new Error('useSelected must be used within a SelectedProvider');
  }
  return context;
};
