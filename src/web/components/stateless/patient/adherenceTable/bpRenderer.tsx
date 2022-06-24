


export const BpRenderer = (props: any)=>{
    const {biometric, type} = props
    const getValue = () => {
        if(biometric?.biometricName == type){
            return biometric?.adherencePerc
        }
    }
    return(
        <span>
            {getValue()}
        </span>
    
    )
}