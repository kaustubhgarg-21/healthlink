import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ModalType } from "../../../../../constants/enums";
import WarnModal from "../../../../stateless/common/warnModal";
configure({ adapter: new Adapter() });
describe("WarnModal test", () => {
 const f = jest.fn()
  let wrapper = shallow(
    <WarnModal
      type={ModalType.SUCCESS}
      primaryText={""}
      secondaryText={""}
      isModalVisible={false}
      confirmButton={null}
      cancelButton={null}
      cancelCallback={f}
    />
  );

  it("Class Check", () => {
    expect(wrapper.exists(".redCoss")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primary-text")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".secondary-text")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-14")).toBe(true);
  });
  //  it("Class Check", () => {
  //      expect(wrapper.exists(".button-modal")).toBe(true);
  //  });
  it("Cancel Button", () => {
    let fun = jest.fn();
    let but = wrapper.find("Button").at(0);
    console.log(but.debug());
    // but.simulate("click");
    // expect(fun).toBeCalled;
  });
});