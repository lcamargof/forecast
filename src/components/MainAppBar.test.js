import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MainAppBar from './MainAppBar';

describe('Component: MainAppBar', () => {
  it('Should render successfully and match the snapshot', () => {
    const component = shallow(<MainAppBar />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});