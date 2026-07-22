import Image from "next/image";

export function PhoneMockup({src,alt,className="",priority=false}:{src:string;alt:string;className?:string;priority?:boolean}) {
  return (
    <div className={`device-shot ${className}`}>
      <Image src={src} width={1390} height={2943} alt={alt} priority={priority} sizes="(max-width: 850px) 68vw, 320px" />
    </div>
  );
}
