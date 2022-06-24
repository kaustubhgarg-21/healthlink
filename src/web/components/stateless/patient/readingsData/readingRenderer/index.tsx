export const ReadingRenderer = (props: any ) => {
    const {value, threshold, type} = props

    const getColour = () => {
    if(threshold){
        if(value > threshold?.maxBound || value < threshold?.minBound){
            return "red"
        } else {
            return "green"
        }
    }else{
        return "#2e2e2e"
    }
        
    }
    return (
        <span style={{color:getColour()}}>{value}</span>
    )
}