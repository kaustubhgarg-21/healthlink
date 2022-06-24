import { Button } from "antd";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddProviderForm from "./../index";
configure({ adapter: new Adapter() });
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const initialState ={
 counter:0
}
const reducer=(state=initialState)=>{
 return state;
}
describe("AddProvider Check", () => {
 let store=createStore(reducer);
 const wrapper = shallow(<Provider store ={store}>
   <AddProviderForm />
   </Provider>)
   console.log(wrapper.debug());
  
  it("Breadcrumb Check", () => {
    expect(wrapper.find(".ant-breacrumb"));
    var fun = jest.fn();
    let but = wrapper.find("ADD Provider");
    expect(fun).toBeCalled;
  });
});