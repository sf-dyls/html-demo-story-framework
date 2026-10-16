import {createContext,useContext,useReducer,type Dispatch,type ReactNode} from 'react';
import {useContent} from '../cms/content';
import {createPresentationReducer,visibleInitialState,type Action,type PresentationState} from './presentationReducer';
const Context=createContext<{state:PresentationState;dispatch:Dispatch<Action>}|null>(null);
export function PresentationProvider({children}:{children:ReactNode}){const presentation=useContent();const reducer=createPresentationReducer(presentation.personas.map(p=>p.id),Object.fromEntries(presentation.personas.map(p=>[p.id,p.recapTouchpoints.length])),presentation.valuePoints.length,presentation.hiddenScreens??[],presentation.slideOrder??[]);
const [state,dispatch]=useReducer(reducer,visibleInitialState(presentation.personas.map(p=>p.id),presentation.hiddenScreens??[],presentation.slideOrder??[]));return <Context.Provider value={{state,dispatch}}>{children}</Context.Provider>}
export function usePresentation(){const value=useContext(Context);if(!value)throw Error('PresentationProvider is required');return value}
