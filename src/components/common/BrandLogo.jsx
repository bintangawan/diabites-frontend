const BrandLogo = ({
  className = '',
  imageClassName = '',
  alt = 'DiaBites',
  priority = false,
}) => {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <img
        src="/images/diabiteslogo.svg"
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        draggable="false"
        className={`h-full w-full object-cover object-center ${imageClassName}`}
      />
    </span>
  );
};

export default BrandLogo;
