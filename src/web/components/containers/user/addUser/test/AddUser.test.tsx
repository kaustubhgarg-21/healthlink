import { configure, mount, shallow } from "enzyme";
import Adopter from "enzyme-adapter-react-16";
import { AddUser } from "..";
import UserForm from "../../../../stateless/user/form";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const initialState={
  counter:0
}
const reducer=(state=initialState)=>{
  return state;
}
configure({ adapter: new Adopter() });
describe("Add user", () => {
  let store=createStore(reducer);
  const wrapper = shallow(<Provider store={store}><AddUser /></Provider>);
  it("Button testing for SAVE USER", () => {
    const but = wrapper.find('[htmlType="submit"]');
    var fun = jest.fn();
    but.simulate("click");
    expect(fun).toBeCalled;
  });
  it("Button testing for SEND INVITE", () => {
    const but = wrapper.find(
      '[type="primary"][className="saveButton"][text="SEND INVITE"]'
    );
    var fun = jest.fn();
    expect(but.length).toBeCalled;
    expect(fun).toBeCalled;
  });
  it("Input Check for First Name", () => {
    expect(wrapper.find('input[labelSubName="First Name"]'));
  });
  it("Input Check for MI", () => {
    expect(wrapper.find('input[labelSubName="MI"]'));
  });
  it("Input Check for Last Name", () => {
    expect(wrapper.find('input[labelSubName="Last Name"]'));
  });
  it("Input Check for Role", () => {
    expect(wrapper.find('input[labelSubName="Role"]'));
  });
  it("Input Check for Email ID", () => {
    expect(wrapper.find('input[labelSubName="Email ID"]'));
  });
  it("Input Check for User Name", () => {
    expect(wrapper.find('input[labelSubName="User Name"]'));
  });
  it("Input Check for Contact Number", () => {
    expect(wrapper.find('input[labelSubName="Contact Number"]'));
  });
  it("Input Check for Mobile Number", () => {
    expect(wrapper.find('input[labelSubName="Mobile Number"]'));
  });
  it("Input Check for Address 1", () => {
    expect(wrapper.find('input[labelSubName="Address 1"]'));
  });
  it("Input Check for Address 2", () => {
    expect(wrapper.find('input[labelSubName="Address 2"]'));
  });
  it("Input Check for City", () => {
    expect(wrapper.find('input[labelSubName="City"]'));
  });
  it("Input Check for State/Provience", () => {
    expect(wrapper.find('input[labelSubName="State/Provience"]'));
  });
  it("Input Check for Country", () => {
    expect(wrapper.find('input[labelSubName="Country"]'));
  });
  it("Input Check for Zip/Postal Code", () => {
    expect(wrapper.find('input[labelSubName="Zip/Postal Code"]'));
  });
  it("Input Check for Subscription Status", () => {
    expect(wrapper.find('input[labelSubName="Subscription Status"]'));
  });
  it("Email Check Box", () => {
    expect(wrapper.find(UserForm).dive().find(".emailCheckbox")).toBeChecked;
  });
});