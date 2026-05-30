import Image, { type ImageProps } from "next/image";
import { resolveMediaSrc, type CdnImageOptions } from "@/lib/cdn";

type CdnImageProps = Omit<ImageProps, "src"> & {
  src: string;
  cdnOptions?: CdnImageOptions;
};

/**
 * next/image wrapper that resolves asset keys through Cloudflare CDN helpers.
 */
export function CdnImage({ src, cdnOptions, alt = "", ...props }: CdnImageProps) {
  const resolved = resolveMediaSrc(src, cdnOptions);
  return <Image src={resolved} alt={alt} {...props} />;
}
