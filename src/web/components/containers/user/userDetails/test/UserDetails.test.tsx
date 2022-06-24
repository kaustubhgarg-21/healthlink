import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserDetailsForm from "..";
import {Provider} from 'react-redux';
import{createStore} from 'redux';
const initialState={
  counter:0
}
const reducer=(state=initialState)=>{
  return state;
}
configure({ adapter: new Adapter() });
describe("user Detail testing", () => {
  let store=createStore(reducer);
  const wrapper = shallow(<Provider store={store}><UserDetailsForm/></Provider>);
  it("Button testing for Delete", () => {
    let fun = jest.fn();
    const but = wrapper.find(".primary");
    but.simulate("click")
    expect(fun).toBeCalled;
  });
  it("Button testing for Reset Password", () => {
    let fun=jest.fn();
    const but = wrapper.find("search");
    but.simulate('click')
    expect(fun).toBeCalled;
  });
  it("Button testing for Save Changes", () => {
    const but = wrapper.find(
      '[type="primary"][htmlType="submit"][form="userEdit"]'
    );
    var fun = jest.fn();
    but.simulate("click")
    expect(fun).toBeCalled;
  });
  
});