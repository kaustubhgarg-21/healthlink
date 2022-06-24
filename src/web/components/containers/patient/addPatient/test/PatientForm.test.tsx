import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PatientForm } from "../../../../stateless/patient/form";
configure({ adapter: new Adapter() });
describe("PatientForm", () => {
  var obj = {
    title: "",
    firstName: "",
    mi: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    mrn: "",
    role: "",
    status: "",
    timeZone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    userName: "",
    contact: "",
    mobile: "",
    comMethod: "",
  };
  const wrapper = shallow(<PatientForm patientForm={obj} />);
  it("Classes Check", () => {
    expect(wrapper.exists(".addPatient")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".uploadContainer")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".f-10")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".orgInfoLogo")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".circleImg")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".cameraImg")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".patientLeftDetails")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".dobPicker")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".genderCol")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".card-dropdown")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".with-search")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".patientUserName")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".checkboxEmail")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".checkBox")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".sms")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".emailCheck")).toBe(true);
  });
  it("Classes Check", () => {
    expect(wrapper.exists(".pateintfooter")).toBe(false);
  });

  it("Input Box", () => {
    expect(
      wrapper.exists(
        'InputBox[labelSubName="MRN (Medical Record Number)"][name="mrn"]'
      )
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="First Name"][name="firstName"]')
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(wrapper.exists('InputBox[labelSubName="MI"][name="mi"]')).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="Last Name"][name="lastName"]')
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists(
        'InputBox[labelSubName="MRN (Medical Record Number)"][name="mrn"]'
      )
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="Address 1"][name="address1"]')
    ).toBe(true);
  });
  it("SelectInput", () => {
    expect(
      wrapper.exists(
        'SelectInput[labelSubName="Role"][placeholder="select"][name="role"]'
      )
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="Address 2"][name="address2"]')
    ).toBe(true);
  });
  it("SelectInput", () => {
    expect(
      wrapper.exists(
        'SelectInput[labelSubName="Status"][placeholder="select"][name="status"]'
      )
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(wrapper.exists('InputBox[labelSubName="City"][name="city"]')).toBe(
      true
    );
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="State/Province"][name="state"]')
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="Zip/Postal Code"][name="zip"]')
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="Country"][name="country"]')
    ).toBe(true);
  });
  it("SelectInput", () => {
    expect(
      wrapper.exists(
        'SelectInput[labelSubName="TimeZone"][placeholder="select"][name="timeZone"]'
      )
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="Email Address"][name="email"]')
    ).toBe(true);
  });
  it("Input Box", () => {
    expect(
      wrapper.exists('InputBox[labelSubName="User Name"][name="userName"]')
    ).toBe(true);
  });
  it("PhoneInput", () => {
    expect(
      wrapper.exists('PhoneInput[name="contact"][label="Contact Number"]')
    ).toBe(true);
  });
  it("PhoneInput", () => {
    expect(
      wrapper.exists('PhoneInput[name="mobile"][label="Mobile Number"]')
    ).toBe(true);
  });
  it("Check Box", () => {
    let but = wrapper.find(".checkboxEmail");
    but.simulate("Checked");
    expect(but).toBeChecked;
  });
  it("Check Box", () => {
    let but = wrapper.find(".sms");
    but.simulate("Checked");
    expect(but).toBeChecked;
  });
  it("Check Box", () => {
    let but = wrapper.find(".emailCheck");
    but.simulate("Checked");
    expect(but).toBeChecked;
  });
});