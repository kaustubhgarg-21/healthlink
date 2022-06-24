import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OrgDetails from "../../../../stateless/organisation/summary";

configure({ adapter: new Adapter() });
describe("Summary Check", () => {
  const wrapper = shallow(<OrgDetails organization={null} onClick={undefined} />);
  it("Class Check", () => {
    expect(wrapper.exists(".summary-container")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".summaryCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".summary")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".f-14")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".Text")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".Status")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".green-button")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".pencil")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".organName")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primeContact")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primeName")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primeDetails")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".emailIcon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primeContact")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primeName")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".primeDetails")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".right")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".detailCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".iconCircle")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".Icon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".CardContent")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".CardDetails")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".showButton")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".showIcon")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".detailCard")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".iconCircle")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".CardContent")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".CardDetails")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".Count")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".NotesRow")).toBe(true);
  });
  it("Class Check", () => {
    expect(wrapper.exists(".Notes")).toBe(true);
  });
});