export default (ctx: Context) => {
  const { isMobile } = useDevice();

  if (isMobile) {
    ctx.meta.layout = 'mobile';
  }
};
