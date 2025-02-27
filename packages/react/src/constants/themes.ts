const shared = {
  /* Fonts */
  '--fuel-font-family':
    '"Inter", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  '--fuel-font-size': '16px',
  '--fuel-font-size-xs': '12px',
  '--fuel-letter-spacing': '-0.64px',
  /* Spacing */
  '--fuel-border-radius': '6px',
  '--fuel-items-gap': '8px',
  /* Border */
  '--fuel-border': '1px solid var(--fuel-border-color)',
  '--fuel-color-error': '#f25a68',
} as React.CSSProperties;

const light = {
  '--fuel-color': '#141414',
  '--fuel-color-bold': '#000000',
  '--fuel-dialog-background': 'white',
  '--fuel-overlay-background': 'rgba(71,88,107,0.24)',
  '--fuel-connector-background': 'rgb(250 250 250)',
  '--fuel-connector-hover': 'rgb(241 243 244)',
  '--fuel-border-color': 'hsl(210deg 9.52% 83.53%)',
  '--fuel-border-hover': 'hsla(0, 0%, 78.04%, 1)',
  '--fuel-button-background': 'rgb(220 220 220)',
  '--fuel-button-background-hover': 'rgb(203 205 207)',
  '--fuel-loader-background':
    'linear-gradient(to right, hsl(0, 0%, 92%) 8%, hsl(0, 0%, 85%) 18%, hsl(0, 0%, 92%) 33%)',
  '--fuel-green-3': '#D9FCE3',
  '--fuel-green-11': '#008347',
  '--fuel-blue-3': '#E6F4FE',
  '--fuel-blue-6': '#ACD8FC',
  '--fuel-blue-11': '#0D74CE',
  '--fuel-blue-a3': 'color(display-p3 0.7686 0.898 1/0.334)',
  '--fuel-blue-a11': 'color(display-p3 0 0.3059 0.7333/0.794)',
  '--fuel-gray-10': '#838383',
  '--fuel-gray-11': '#646464',
  '--fuel-gray-12': '#202020',
  '--fuel-separator-color': 'rgb(83 79 79 / 13%)',
  '--fuel-black-color': '#FFFFFF',
} as React.CSSProperties;

const dark = {
  '--fuel-color': '#e4e7e7',
  '--fuel-color-bold': '#ffffff',
  '--fuel-dialog-background': 'rgb(25 26 26)',
  '--fuel-overlay-background': 'rgba(20, 20, 20, 0.8)',
  '--fuel-connector-background': 'rgba(255, 255, 255, 0.02)',
  '--fuel-connector-hover': 'rgba(255, 255, 255, 0.05)',
  '--fuel-border-color': 'rgba(255, 255, 255, 0.05)',
  '--fuel-border-hover': 'hsla(0, 0%, 50%, 1)',
  '--fuel-button-background': 'hsla(0, 0%, 30%, 1)',
  '--fuel-button-background-hover': 'hsla(0, 0%, 40%, 1)',
  '--fuel-loader-background':
    'linear-gradient(to right, hsl(0, 0%, 20%) 8%, hsl(0, 0%, 25%) 18%, hsl(0, 0%, 20%) 33%)',
  '--fuel-green-3': '#0F2E1B',
  '--fuel-green-11': '#00DD75',
  '--fuel-blue-3': '#0D2847',
  '--fuel-blue-6': '#104D87',
  '--fuel-blue-11': '#70B9FF',
  '--fuel-blue-a3': 'color(display-p3 0.1216 0.4627 1/0.219)',
  '--fuel-blue-a11': 'color(display-p3 0.5176 0.7373 1/0.975)',
  '--fuel-gray-10': '#7b7b7b',
  '--fuel-gray-11': '#b4b4b4',
  '--fuel-gray-12': '#eee',
  '--fuel-separator-color': 'rgb(165 165 165 / 13%)',
  '--fuel-black-color': '#141414',
} as React.CSSProperties;

const themes: Record<'light' | 'dark', React.CSSProperties> = {
  light,
  dark,
};

export const getThemeVariables = (
  theme: 'light' | 'dark',
): React.CSSProperties => {
  const colors = themes[theme];
  return {
    ...shared,
    ...colors,
  };
};
