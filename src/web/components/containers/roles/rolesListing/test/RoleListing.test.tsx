import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RolesListing from "..";
import {Provider} from 'react-redux';
import{createStore} from 'redux';
const initialState={
  counter:0
}
const reducer=(state=initialState)=>{
  return state;
}
configure({ adapter: new Adapter() });
describe("Testing for roles", () => {
  let store=createStore(reducer);
  const wrapper = shallow(<Provider store={store}><RolesListing/></Provider>);
  it("Check for Add Custom Role", () => {
    var fun = jest.fn();
    expect(wrapper.find(".addOrgBtn"));
    const but = wrapper.find('[htmlType="Add Custom Role"]');
    expect(fun).toBeCalled;
  });
});