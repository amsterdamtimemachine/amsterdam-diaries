export default function (path: string, imgOptions: ImageOptions = {}) {
  const { imageServerUri } = useRuntimeConfig().app;
  const defaultOptions: ImageOptions = {
    region: 'full',
    size: 'max',
    rotation: '0',
    quality: 'default',
    format: 'jpg',
  };
  const options = { ...defaultOptions, ...imgOptions };
  const { region, size, rotation, quality, format } = options;
  return `${imageServerUri}/${path}/${region}/${size}/${rotation}/${quality}.${format}`;
}
