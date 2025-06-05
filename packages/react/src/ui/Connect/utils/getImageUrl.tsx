import type { ConnectorMetadata } from 'fuels';

export const getImageUrl = (connector: ConnectorMetadata, theme?: string) => {
  const { image } = connector;
  if (typeof image === 'object') {
    return theme !== 'dark' ? image.light : image.dark;
  }
  return image;
};
