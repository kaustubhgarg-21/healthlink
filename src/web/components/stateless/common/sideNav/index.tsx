import React, { useEffect, useState } from "react"
import { Menu } from "antd"
import { useHistory } from "react-router-dom";

import { hlCollapsed,hlFull } from "../../../../images";
import "./sideNavStyles.less"
import { SideNavItems } from "../../../../constants/sideNavConstants";
import { SideBarStateSelector, setSideBarItem } from "../../../../../redux/reducers/sideBarReducer";
import { useDispatch, useSelector } from "react-redux";
import { UserRoles } from "../../../../constants/enums";

const getIcon = (props: any) => {
    return <span className="material-icons-outlined">{props}</span>
}
const { SubMenu } = Menu;
export const SideBar = (props: any) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {selectedSideBarItem} = useSelector(SideBarStateSelector)
    const [menuOptions,setMenuOptions] = useState<any>([])
    const {collapsed, appUser} = props;
    const handleItemSelect = (selectedItem: any) => {
        dispatch(setSideBarItem(selectedItem.title))
        history.push(selectedItem.url)
    }
    useEffect(()=>{
        switch( appUser?.roleName){
            case UserRoles.SUPER_ADMIN:{
                return setMenuOptions(SideNavItems.platformAdminItems)
            }
            case UserRoles.PLATFORM_ADMIN:{
                return setMenuOptions(SideNavItems.platformAdminItems)
            }
            case UserRoles.ORG_ADMIN:{
               return setMenuOptions(SideNavItems.organizationAdminItems)
            }
            case UserRoles.PROVIDER:{
               return setMenuOptions(SideNavItems.providerItems)
            }
            case UserRoles.PATIENT:{
                return setMenuOptions(SideNavItems.patientItems)
             }
            case UserRoles.FAMILY:{
                return setMenuOptions(SideNavItems.patientItems)
            }
            default:{
                return setMenuOptions(SideNavItems.patientItems)
            }
        }
    },[appUser])

    return (
        <div>
            <div className={collapsed? "colLogo" : "logoContainer"}>
                <img style={{height: "100%", width:"100%" }}src={collapsed? hlCollapsed : hlFull}/>
            </div>
            <Menu className="sideBar-menu" mode="inline" selectedKeys={selectedSideBarItem}>
                {menuOptions.map((item: any) => {
                    return (
                        item.children ?
                            <SubMenu key={item.title} className="menu-item-row f-14" icon={getIcon(item.icon)} title={item.title} level={1}>
                                {item.children.map((subItem: any) => {
                                    return (
                                        <Menu.Item key={subItem.title} className="menu-item-row subItem" onClick={() => handleItemSelect(subItem)} >{subItem.title}</Menu.Item>
                                    )
                                })
                                }
                            </SubMenu>
                            :
                            <Menu.Item key={item.title} className="menu-item-row f-14" icon={getIcon(item.icon)} onClick={() => handleItemSelect(item)}>{item.title}</Menu.Item>
                    )
                })}
            </Menu>
        </div>
    )
}