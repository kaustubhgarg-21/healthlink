import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { FamilyTable } from "../../../../stateless/patient/family/familyData";
configure({ adapter: new Adapter() });
describe("Family", () => {
  const wrapper = shallow(<FamilyTable />);
  const table = wrapper.find("Table");
  const col=wrapper.find('CentreFamilyRendrer');
  it("Table check", async () => {
    expect(table).toHaveLength
    expect(col).toHaveLength;
  });
  it('class check',()=>{
    expect(wrapper.exists('.centreTable')).toBe(true);
  })
});