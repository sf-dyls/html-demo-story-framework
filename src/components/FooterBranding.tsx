import {useState} from 'react';
import type {ImageAsset,PresentationConfig} from '../types/presentation';
function FooterBrand({name,image}:{name:string;image:ImageAsset}){const [failedSrc,setFailedSrc]=useState<string>();return <span className="footer-branding__brand">{image.src&&image.src!==failedSrc?<img src={image.src} alt={image.alt||name} onError={()=>setFailedSrc(image.src)}/>:<span>{name}</span>}</span>}
export function FooterBranding({config}:{config:PresentationConfig}){return <div className="footer-branding" aria-label="Customer and vendor"><FooterBrand name={config.customer.name} image={config.customer.logo}/><span className="footer-branding__divider" aria-hidden="true"/><FooterBrand name={config.closing.vendorName} image={config.closing.vendorLogo}/></div>}
