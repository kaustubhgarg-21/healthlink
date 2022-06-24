export const RegExpressions = {
    UserName : new RegExp(/^\S{6,}$/),
    Email : new RegExp("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"),
    OrgName : new RegExp(/^[^-\s_\W][A-Za-z0-9_@.,)('/#&+-\s-]*$/),
    FirstName :  new RegExp(/^[^-\s_\W][A-Za-z0-9\s]*$/),
    Middlename :  new RegExp(/^[^-\s_\W][A-Za-z0-9\s]*$/),
    LastName :  new RegExp(/^[^-\s_\W][A-Za-z0-9\s]*$/),
    City : new RegExp(/^[^-\s_\W][A-Za-z0-9\s]*$/),
    State : new RegExp(/^[^-\s_\W][A-Za-z0-9\s]*$/),
    ZipCode : new RegExp(/^\d{5}(?:[-]\d{4})?$/),
    MRN : new RegExp(/^\S{10,}$/),
    CompanyName : new RegExp(/^[^-\s_\W][A-Za-z0-9_@.,)('/#&+-\s-]*$/),
    RoleName : new RegExp(/^[^-\s0-9\W][A-Za-z_\s-]*$/),
    SpecialityName : new RegExp(/^[^\s][A-Za-z\s]*$/),
    Designation : new RegExp("^[a-zA-Z]+$")
}