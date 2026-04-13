import { useState } from "react";

const PLACEHOLDER = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage = ({ fallback = PLACEHOLDER, onError, className, ...props }: SafeImageProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <img
      {...props}
      src={failed ? fallback : props.src}
      className={className}
      onError={(e) => {
        if (!failed) {
          setFailed(true);
        }
        onError?.(e);
      }}
    />
  );
};

export default SafeImage;
