import type {PresentationConfig} from '../types/presentation';
import {customerStory} from '../data/customerStory';
import './CustomerStory.css';
export function CustomerStoryScreen({config}:{config:PresentationConfig}){
 const story=config.customerStory??customerStory;
 const link=/^https?:\/\//i.test(story.sourceUrl)?story.sourceUrl:customerStory.sourceUrl;
 return <div className="customer-story"><header><span className="eyebrow">Customer story · {story.context}</span><h1 id="screen-title">{story.title}</h1><p className="customer-story__name">{story.name}</p></header><div className="customer-story__metrics">{story.metrics.slice(0,3).map((m,i)=><article tabIndex={0} key={i}><strong>{m.value}</strong><h2>{m.label}</h2><p>{m.detail}</p></article>)}</div><div className="customer-story__relevance"><p>{story.relevance}</p></div><footer><span>Results reported by WCHG</span><a href={link} target="_blank" rel="noopener noreferrer">Read the full customer story</a></footer></div>;
}
