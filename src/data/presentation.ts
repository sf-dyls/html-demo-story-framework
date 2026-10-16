import type {ImageAsset, JourneyTouchpoint, PresentationConfig} from '../types/presentation';
const portrait = (name: string): ImageAsset => ({src:`/images/${name.toLowerCase()}.jpg`,alt:`Portrait of ${name}`,recommendedWidth:1600,recommendedHeight:1200,fit:'cover'});
const points = (prefix: string, titles: string[]): JourneyTouchpoint[] => titles.map((title,i)=>({id:`${prefix}-${i+1}`,title}));
export const presentation: PresentationConfig = {
  schemaVersion:1,
  team:{title:'Meet your team',members:[{id:'dylan',name:'Dylan Pham',role:'Specialist Solution Engineer',specialty:'Service Cloud',image:{alt:'Dylan Pham',recommendedWidth:800,recommendedHeight:800,fit:'cover'}}]},
  customer:{name:'Vera Living',logo:{alt:'Vera Living logo',recommendedWidth:600,recommendedHeight:240,fit:'contain'},primaryColor:'#597bb8',secondaryColor:'#b6a4d8'},
  presentation:{title:'Connected care. Effortless service.',subtitle:'A service experience built around people',heroImage:{src:'/images/resident-lobby.jpg',alt:'A welcoming residential lobby with seating and natural light',recommendedWidth:1920,recommendedHeight:1080,fit:'cover'}},
  challenges:[
    {id:'disconnected',title:'Disconnected experiences',description:'Context is spread across systems.',benefitId:'connected'},
    {id:'manual',title:'Too much manual effort',description:'Repetitive tasks slow down support.',benefitId:'effortless'},
    {id:'visibility',title:'Limited service visibility',description:'Teams need a clearer view.',benefitId:'intelligent'}
  ],
  benefits:[
    {id:'connected',title:'Connected Experiences',shortDescription:'Customer context stays connected.'},
    {id:'effortless',title:'Effortless Service',shortDescription:'Less effort, faster resolution.'},
    {id:'intelligent',title:'Intelligent Operations',shortDescription:'Visibility to improve service.'}
  ],
  personas:[
    {id:'lauren',name:'Lauren',role:'Customer',quote:'I just want this sorted.',image:portrait('Lauren'),chapterTitle:"Lauren’s Journey",overviewTouchpoints:points('lauren-overview',['Reach out','Get help','Stay informed']),recapTouchpoints:points('lauren-recap',['Lauren reaches out','AI understands intent','Context retrieved','Request captured','Escalated with context'])},
    {id:'jane',name:'Jane',role:'Service Agent',quote:'Give me the context to help.',image:portrait('Jane'),chapterTitle:"Jane’s Journey",overviewTouchpoints:points('jane-overview',['Understand','Resolve','Follow through']),recapTouchpoints:points('jane-recap',['Jane receives the case','Customer context appears','Guidance surfaces','Action coordinated','Lauren receives an update'])},
    {id:'john',name:'John',role:'Service Supervisor',quote:'Help me see where we can improve.',image:portrait('John'),chapterTitle:"John’s Journey",overviewTouchpoints:points('john-overview',['See demand','Support teams','Improve service']),recapTouchpoints:points('john-recap',['John reviews demand','Service trends emerge','Workload becomes clear','Coaching opportunities surface','Improvement action identified'])}
  ],
  valuePoints:[{id:'resolution',title:'Faster resolution'},{id:'effort',title:'Less customer effort'},{id:'productivity',title:'Higher agent productivity'},{id:'visibility',title:'Clearer service visibility'},{id:'consistency',title:'More consistent care'}],
  valueAudience:[{personaId:'lauren',label:'Customers'},{personaId:'jane',label:'Service Reps'},{personaId:'john',label:'Supervisors'}],
  closing:{title:'Where do we go from here?',vendorName:'Salesforce',vendorLogo:{alt:'Salesforce logo',recommendedWidth:600,recommendedHeight:420,fit:'contain'}},
  labels:{discovery:'What we heard',focus:"What we’ll focus on today",journeyHub:"Today’s Demo Journey",customerValue:'What does this translate to?',beginDemo:'Begin Demo',journeyComplete:'Journey Complete',continue:'Continue'}
};
