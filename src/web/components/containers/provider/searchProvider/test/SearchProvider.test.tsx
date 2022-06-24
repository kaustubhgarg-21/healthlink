import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SearchProviders } from "..";
configure({ adapter: new Adapter() });
describe("Search Provider", () => {
 const wrapper = shallow(<SearchProviders />);
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
   expect(wrapper.exists(".providerSearchCard")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".card-dropdown")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".with-search")).toBe(true);
 });
 it('Class Check', () => {
   expect(wrapper.exists(".providerSearchTable")).toBe(true);
 });
 it("SelectInput check",() => {
   expect(wrapper.exists('SelectInput[placeholder="Select Provider Type"][name="providerType"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(wrapper.exists('InputBox[name="providerName"]')).toBe(true);
 });
 it("Button Check", () => {
   var fun=jest.fn();
   const but = wrapper.find("Button").at(0);   
   but.simulate("click");
   expect(fun).toBeCalled;
 });
});