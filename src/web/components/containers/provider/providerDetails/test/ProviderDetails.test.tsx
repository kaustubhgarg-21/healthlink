
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { createStore } from "redux";
configure({ adapter: new Adapter() });
import "./../index";
import ProviderDetailsForm from "./../index";
const initialState={
  counter:0
}
const reducer=(state=initialState)=>{
  return state;
}
describe("Provider Details", () => {
  let store=createStore(reducer);
 const wrapper = shallow(<Provider store={store}><ProviderDetailsForm/></Provider>);
 it("Delete Button Check", () => {
   var fun=jest.fn();
   const but = wrapper.find("Button").at(0);   
   but.simulate("click");
   expect(fun).toBeCalled;
 });
 it("Reset password Button Check", () => {
   var fun=jest.fn();
   const but = wrapper.find("Button").at(1);   
   but.simulate("click");
   expect(fun).toBeCalled;
 });
 it("Save changes Button Check", () => {
   var fun=jest.fn();
   const but = wrapper.find("Button").at(2);   
   but.simulate("click");
   expect(fun).toBeCalled;
 });
 it('Class Check', () => {
   expect(wrapper.exists(".addUserScreen")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".innerHeader")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".brdUserName")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".f-20")).toBe(true);
 });
 
 it('Class Check', () => {
   expect(wrapper.exists(".userButtons")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".material-icons-outlined")).toBe(true);
 });
 
});