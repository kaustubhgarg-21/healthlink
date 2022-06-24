import React from "react";
import "./chartplaceholder.less";
import charAxisPlaceholder from '../../../../../assets/chartAxisPlaceholder.svg'
import charAxisPlaceholdersm from '../../../../../assets/chartAxisPlaceholder-sm.svg'
const Chartplaceholder = (props: any) => {
    const {text,sm}= props;
    return (
        <>
        <div className="chartplaceholder">
        <div className="text">{text}</div>
        <img src={sm? charAxisPlaceholdersm : charAxisPlaceholder}/>
        </div>
        </>
    );
};
export default Chartplaceholder;
