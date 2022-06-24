import { Card } from "antd"
import "./providerCardDetail.less"

export const AddProviderCard = (props: any) => {
    const {setView} = props
    return (
        <Card className="addProviderCard h-2" onClick={()=>setView(true)}>
                <span className="addText f-14">+ Assign a provider</span>
        </Card>
    )
}

