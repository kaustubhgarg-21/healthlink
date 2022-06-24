import BaseState from "../../../core/states/baseState";

interface AppState extends BaseState {
    selectedSideBarItem : string[]
    isCollapsed: boolean
    filesList: any
}

export default AppState