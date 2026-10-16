import {useState} from 'react';
import type {ImageAsset,PresentationConfig} from '../types/presentation';
import './ClosingScreen.css';
function ClosingBrand({name,image}:{name:string;image:ImageAsset}){
 const [failed,setFailed]=useState(false);
 return <div className="closing-screen__brand">{image.src&&!failed?<img src={image.src} alt={image.alt} onError={()=>setFailed(true)} style={{objectFit:image.fit}}/>:<span>{name}</span>}</div>;
}
export function ClosingScreen({config}:{config:PresentationConfig}){
 return <div className="closing-screen">
  <div className="closing-screen__branding"><ClosingBrand key={config.customer.logo.src??config.customer.name} name={config.customer.name} image={config.customer.logo}/><span className="closing-screen__divider" aria-hidden="true"/><ClosingBrand key={config.closing.vendorLogo.src??config.closing.vendorName} name={config.closing.vendorName} image={config.closing.vendorLogo}/></div>
  <h1 id="screen-title">{config.closing.title}</h1>
  {config.closing.subtitle&&<p className="closing-screen__subtitle">{config.closing.subtitle}</p>}
 </div>;
}
