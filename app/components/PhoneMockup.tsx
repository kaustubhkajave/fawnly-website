import Image from "next/image";
export function PhoneMockup({src,alt,className=""}:{src:string;alt:string;className?:string}){return <div className={`phone ${className}`}><Image src={src} width={500} height={1050} alt={alt}/></div>}
