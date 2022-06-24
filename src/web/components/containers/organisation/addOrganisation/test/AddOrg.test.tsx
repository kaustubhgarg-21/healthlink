import AddOrganisation from "../index";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
const initialState = {
  counter: 0,
};
configure({ adapter: new Adapter() });
import { shallow, mount, render, configure } from "enzyme";
import store from "../../../../../../redux/store";
const reducer = (state = initialState) => {
  return state;
};
describe("addOrganisation", () => {
  var obj = {
    organizationName: "",
    Address1: "",
    Address2: "",
    city: "",
    state: "",
    status: "",
    country: "",
    zip: "",
    timeZone: "",
    notes: "",
    contactNumber: "",
    phoneNumber: "",
    firstname: "",
    mi: "",
    lastname: "",
    emailAddress: "",
    firstname2: "",
    mi2: "",
    lastname2: "",
    emailAddress2: "",
  };

  const wrapper = shallow(
    <Provider store={store}>
      <AddOrganisation formState={obj} />
    </Provider>
  );
  it("should have a working submit button", () => {
    var fun = jest.fn();
    let but = wrapper.find('Button').at(0);
    console.log(but.debug());
    expect(fun).toBeCalled;
  });
});