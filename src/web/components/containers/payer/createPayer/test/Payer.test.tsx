import { PayerForm } from "../../../../stateless/payer/payerForm";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow} from "enzyme";
configure({ adapter: new Adapter() });
describe("Creat Payer", () => {
 var obj = {
   companyName: "aa",
   contactName: "aaa",
   emailAddress: "aaaa245@gmail.com",
   contactNumber: "1234 123 123",
   mobilNumber: "1234 123 123",
   payerAddress1: "aaaa",
   payerAddress2: "aaaa",
   payerCity: "aaa",
   payerState: "aaaa",
   payerCountry: "aaa",
   payerPostalCode: "123456",
 };
 const container = shallow(<PayerForm payerDetails={obj} />);
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Company Name"][name="companyName"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Contact Name"][name="contactName"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Email Address"][name="email"]')).toBe(true);
 });
 it("PhoneInput check",() => {
   expect(container.exists('PhoneInput[name="contactNumber"][label="Contact Number"]')).toBe(true);
 });
 it("PhoneInput check",() => {
   expect(container.exists('PhoneInput[name="mobilNumber"][label="Mobile Number"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Address 1"][name="payerAddress1"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Address 2"][name="payerAddress2"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="City"][name="payerCity"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="State/Province:"][name="payerState"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Country"][name="payerCountry"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="Zip/PostalCode"][name="payerPostalCode"]')).toBe(true);
 });
 it("InputBox check",() => {
   expect(container.exists('InputBox[labelSubName="City"][name="payerCity"]')).toBe(true);
 });
});