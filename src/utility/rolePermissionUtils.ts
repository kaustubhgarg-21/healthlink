import { PermissionTypes } from "../web/constants/enums";

// get unique permission with editable and viewable
export const getRolesUniquePermissions = async (permissions:any[]): Promise<any[]> =>{
    let filteredPermissionsCopy:any[]= [];
    permissions && permissions.map((element:any) => {
        const elementsIndex = filteredPermissionsCopy.findIndex(
          (item:any) => item?.name === element?.name
        );
  
        if (elementsIndex >= 0) {
          if (element.action === PermissionTypes.VIEW ) {
            filteredPermissionsCopy[elementsIndex] = {
              ...filteredPermissionsCopy[elementsIndex],
              isView: true
            };
          } else if(element.action === PermissionTypes.CREATE || element.action === PermissionTypes.EDIT || element.action === PermissionTypes.DELETE){
            filteredPermissionsCopy[elementsIndex] = {
              ...filteredPermissionsCopy[elementsIndex],
              isEdit: true
            };
          }
        } else {
          let modifiedElement:any;
          if (element.action === PermissionTypes.VIEW ) {
            modifiedElement = {...element, isView:true}
            filteredPermissionsCopy.push(modifiedElement);
          } else if(element.action === PermissionTypes.CREATE || element.action === PermissionTypes.EDIT || element.action === PermissionTypes.DELETE) {
            modifiedElement = {...element, isEdit:true}
            filteredPermissionsCopy.push(modifiedElement);
          }
        }
      });
      return filteredPermissionsCopy;
}


// filter permissions on the basis of name and type
export const getFilteredPermissions = (type: string, permissionName: string, permissions: any[]) => {
  return permissions && permissions.filter((element:any) => {
      if (type === PermissionTypes.VIEW) {
          return element.name === permissionName && ( element.action === PermissionTypes.VIEW);
      } else {
          return element.name === permissionName && (element.action === PermissionTypes.CREATE || element.action === PermissionTypes.EDIT || element.action === PermissionTypes.DELETE);
      }
  })
}

// after transformation get permission id's array
export const getPermissionIds = async(selectedPermissions:any[], allPermissions:any[]): Promise<any[]> =>{
  let permissionIdsArray: any[] = [];
  selectedPermissions.map(function(x: any) {
    if(x?.isEdit){
      let permissionList = getFilteredPermissions(PermissionTypes.EDIT, x?.name, allPermissions);
      permissionList.forEach((item:any) => {
        permissionIdsArray.push(item.id);
      });
    }
    if(x?.isView){
      let permissionList = getFilteredPermissions(PermissionTypes.VIEW, x?.name, allPermissions);
      permissionList.forEach((item:any) => {
        permissionIdsArray.push(item.id);
      });
    }
  })
  return permissionIdsArray;
}

// filter permission to show unique permissions
export const getUniquePermissions = async(permissions:any[]): Promise<any[]> => {
  const uniquePerm: any = permissions.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.name === item.name
      ))
  )
  return uniquePerm;
}

// concatinating selected permissions and unique original permissions
export const getUniquePermissionForEditing = async(origPerm: any[], rolePerm: any[]): Promise<any[]> =>{
  const origUniquePermission = await getUniquePermissions(origPerm);
  const diffResult = origUniquePermission.filter(
    ({ name: name1 }) => !rolePerm.some(({ name: name2 }) => name2 === name1)
  );
  var result = rolePerm.concat(diffResult);
  return result;
}

export const allowedPermissionValues = async (permission: any[]) => {
  const permissionVal = permission.map((item:any)=>{
    return {name: item.permission, view: item?.view? true: false, edit: item?.create? true: false}
  })
  return permissionVal;
}

export const getPermissionFor = (temp: any[], name: string) => {
  for(var i=0; i<temp?.length; i++){
    if(temp[i]?.name === name){
        return temp[i]?.edit;
    }
  }
}

// get self permissions
export const getSelfPermissions = async(permissions: any[]) => {
  const selfPerm = permissions.filter((item:any) => item?.permissionType.includes('self')).map((item:any)=>item?.permissionId);
  return selfPerm;
}