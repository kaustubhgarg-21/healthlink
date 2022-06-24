import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { OrgansationInfo } from "../../../../stateless/organisation/details";
configure({ adapter: new Adapter() });
describe("OrgansationInfo Testing", () => {
  var obj = {
    abc: "",
  };
  const wrapper = shallow(
    <OrgansationInfo
      organization={null}
      onSubmit={obj}
      setOrganization={obj}
      primaryContact={obj}
      secondaryContact={obj}
    />
  );
  it("Check for classes", () => {
    expect(wrapper.exists(".infoContainer")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".uploadContainer")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".orgInfoLogo")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".circleImg")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".cameraImg")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".card-dropdown")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".with-search")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".card-dropdown")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".with-search")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".form-container")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".contact-col")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".redAstericks")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".form-container")).toBe(true);
  });
  it("Check for classes", () => {
    expect(wrapper.exists(".contact-col")).toBe(true);
  });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Organization Name"][name="name"]')
  //     ).toBe(true);
  //   });
  //   it("SelectInput Check", () => {
  //     expect(
  //       wrapper.find(
  //         'SelectInput[labelSubName="Subscription Status"][name="status"]'
  //       )
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Address 1"][name="address1"]')
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Address 2"][name="address2"]')
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(wrapper.find('InputBox[labelSubName="City"][name="city"]')).toBe(
  //       true
  //     );
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="State/Provience"][name="state"]')
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find(
  //         'SelectInput[labelSubName="Country"][placeholder="Select country"][name="country"]'
  //       )
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find(
  //         'InputBox[labelSubName="Zip/Postal Code"][name="postalCode"]'
  //       )
  //     ).toBe(true);
  //   });
  //   it("SelectInput Check", () => {
  //     expect(
  //       wrapper.find('SelectInput[labelSubName="TimeZone"][name="timeZone"]')
  //     ).toBe(true);
  //   });
  //   it("TextArea Check", () => {
  //     expect(
  //       wrapper.find(
  //         'TextArea[id="primary"][labelSubName="First Name"][name="firstName"]'
  //       )
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(wrapper.find('InputBox[labelSubName="MI"][name="mi"]')).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Last Name"][name="lastName"]')
  //     ).toBe(true);
  //   });
  //   it("PhoneInput Check", () => {
  //     expect(
  //       wrapper.find('PhoneInput[name="phoneNumber"][label="Contact"]')
  //     ).toBe(true);
  //   });
  //   it("PhoneInput Check", () => {
  //     expect(
  //       wrapper.find('PhoneInput[name="mobile"][label="Mobile Number"]')
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Email Address"][name="email"]')
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find(
  //         'InputBox[id="secondary"][labelSubName="First Name"][name="firstName2"]'
  //       )
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="MI"][name="middleName2"]')
  //     ).toBe(true);
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Last Name"][name="lastName2"]')
  //     ).toBe(true);
  //   });
  //   it("PhoneInput Check", () => {
  //     expect(
  //       wrapper.find('PhoneInput[label="Contact"][name="phoneNumber2"]')
  //     ).toBe(true);
  //   });
  //   it("PhoneInput Check", () => {
  //     expect(wrapper.find('PhoneInput[label="Mobile no"][name="mobile2"]')).toBe(
  //       true
  //     );
  //   });
  //   it("InputBox Check", () => {
  //     expect(
  //       wrapper.find('InputBox[labelSubName="Email Address"][name="email2"]')
  //     ).toBe(true);
  //   });
  it("InputBox check", () => {
    expect(wrapper.find("InputBox")).toHaveLength(14);
  });
  it("SelectInput check", () => {
    expect(wrapper.find("SelectInput")).toHaveLength(3);
  });
  it("TextArea check", () => {
    expect(wrapper.find("TextArea")).toHaveLength(1);
  });
  it("TextArea check", () => {
    expect(wrapper.find("PhoneInput")).toHaveLength(4);
  });
});