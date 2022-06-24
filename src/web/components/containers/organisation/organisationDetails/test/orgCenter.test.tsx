import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { OrganizaionCentres } from "../../../../stateless/organisation/centres";
configure({ adapter: new Adapter() });
describe('Organization Centre Test', () => {
   var obj = {
       abc: ''
   }
   let wrapper = shallow(<OrganizaionCentres onCentreCreate={undefined} onCentreUpdate={undefined} centres={undefined} />)
   it("Class Check", () => {
       expect(wrapper.exists(".centres-container")).toBe(true);
   });
   it("Class Check", () => {
       expect(wrapper.exists(".tableContainer")).toBe(true);
   });
   it("Add Centre Button", () => {
       let fun = jest.fn();
       let but = wrapper.find("Button").at(0);
       console.log(but.debug());
       but.simulate("click");
       expect(fun).toBeCalled;
   });
   it("Add Department Button", () => {
       let fun = jest.fn();
       let but = wrapper.find("Button").at(1);
       console.log(but.debug());
       but.simulate("click");
       expect(fun).toBeCalled;
   });
});