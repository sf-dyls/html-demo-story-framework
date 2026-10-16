import type {PresentationConfig} from '../types/presentation';
export function TitleScreen({config}:{config:PresentationConfig}) {
 const {presentation,customer}=config;
 return <div className="title-screen">
   <div className="title-screen__copy">
     <div className="title-screen__brand">{customer.logo.src?<img src={customer.logo.src} alt={customer.logo.alt} style={{objectFit:customer.logo.fit}}/>:<span>{customer.name}</span>}</div>
     <h1 id="screen-title">{presentation.title}</h1>
     {presentation.subtitle&&<p>{presentation.subtitle}</p>}
     {presentation.date&&<p className="title-screen__date">{presentation.date}</p>}
   </div>
   {presentation.heroImage.src&&<div className="title-screen__image"><img src={presentation.heroImage.src} alt={presentation.heroImage.alt} style={{objectFit:presentation.heroImage.fit}}/></div>}
 </div>;
}
