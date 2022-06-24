import { Card } from "antd"
import { useState } from "react"
import FamilyMemberModal from "../../../common/familyMemberModal"
import "./familyCard.less"

export const AddFamilyCard = () => {
    const [showModalView , setShowModalView] = useState(false)
    

    const onModalClose= ()=>{
        setShowModalView(false)
    }

    const onModalOpen=()=>{
        setShowModalView(true);
    }

    return (
        <>
        <Card className="addFamilyCard h-2" onClick={onModalOpen}>
                <span className="addText f-14">+ Add a Family member</span>
        </Card>
      <FamilyMemberModal 
        cancelButton={null}
        isModalVisible= {showModalView}
        setIsModalVisible={setShowModalView}
        confirmButton={null}
        cancelCallback={onModalClose}

      />
</>
    )
}