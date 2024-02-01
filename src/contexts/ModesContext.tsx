import React, { createContext, ReactNode, useContext } from 'react';
import { useColorScheme } from 'react-native';

type FontColorContextProps = {
  fontColor: string;
}
export const FontColorContext = createContext<FontColorContextProps>({
  fontColor: ''
});

export const useFontColor = () => useContext(FontColorContext);

export const FontColorProvider = ({children}: {children: ReactNode}) => {
  const colorScheme = useColorScheme();

  const fontColor = (): string => {
    if (colorScheme === 'dark') {
      return 'white';
    }

    return 'black';
  }

  const value = {
    fontColor: fontColor(),
  }

  return (
    <FontColorContext.Provider value={value}>
      {children}
    </FontColorContext.Provider>
  );
}
