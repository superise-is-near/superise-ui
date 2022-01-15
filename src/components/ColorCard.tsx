import React from 'react';

export const cardTheme = {
  blue: { fg: '#004E70', bg: '#C7EEFF' },
  pink: { bg: '#FFAEAE', fg: '#7D0A0A' },
  purple: { fg: '#1B42B5', bg: '#ACC1FF'},
  yellow: { bg: '#FFEC94', fg: '#705E09' },
  green: { fg: '#396909', bg: '#B0E57C' },
  lightGreen: { fg: '#1C9954', bg: '#BBF5D5' },
}

export const ColorCard = ({ children, theme = "blue" } : { children: React.ReactNode, theme?: string }) => {
  return <div className="h-full p-6 rounded-lg" style={{ backgroundColor: cardTheme[theme].bg }}>
    {children}
    </div>  
}

export const ColorCardTitle = ({ theme = "blue", children } : { children: React.ReactNode, theme?: string }) => {
  return <h1 className="text-4xl font-bold leading-10" style={{ color: cardTheme[theme].fg }}>{children}</h1>
}
