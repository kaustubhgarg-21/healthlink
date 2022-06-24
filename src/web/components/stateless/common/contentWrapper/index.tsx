import React, {useState, useEffect} from 'react';
import { getHeight } from '../../../../../utility/appUtil';
import "./customScroll.less"

export const CompWrapper = (props: any) => {
    const [ contentHeight, setContentHeight ] = useState(0);
    const name = props.name ?? 'scrollContent';

    /*********************
    
    observeOn => classname of that section which
    impacts the scroll on resize  
    
    name => classname on which scroll has to be applied
    
    **********************/

    useEffect(()=>{
    const resizeObserver = new ResizeObserver((entries) => {
        setContentHeight(getHeight(`.${name}`))
      });
      resizeObserver.observe(document.body);
      props?.observeOn && resizeObserver.observe(document.querySelector<any>(`.${props?.observeOn}`));
      setContentHeight(getHeight(`.${name}`))
      return (()=>{setContentHeight(0)})
    }, []);

    return (
        <div className={`scrollContent scrollStyle ${props?.otherClasses ?? ''}`} style={{height:contentHeight}}>
            {props.children}    
        </div>
    );
}
