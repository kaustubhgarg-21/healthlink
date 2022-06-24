import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { OrganisationDetails } from "..";
import { Provider } from 'react-redux';
import {createStore} from 'redux';
configure({adapter:new Adapter()});
const initialState = {
  counter: 0
}
const reducer = (state = initialState) => {
  return state;
}
describe('Main Organisation',()=>{
  let store = createStore(reducer); 
 const wrapper=shallow(<Provider store={store}><OrganisationDetails/></Provider>);
 console.log(wrapper.debug());
 
//  it("Button testing for Delete", () => {
//    var fun=jest.fn()
//     let but = wrapper.find('Edit');
//     but.simulate('click');
//     expect(fun).toBeCalled;
//   });
// it("Button testing for Delete", () => {
//      var fun=jest.fn()
//       let but =(wrapper.find('type="primary"][htmlType="search"]'));
//       but.simulate('click');
//       expect(fun).toBeCalled;
//     });
});