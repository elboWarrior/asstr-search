import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Typography, withStyles } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

import StoryCode from '../../types/StoryCodes';
import TriState from '../../types/TriState';
import TriStateIterator from './CheckboxIterator';

interface StoryCodeCheckboxProps {
  label: string;
  storyCode: StoryCode;
}

interface StoryCodesProps {
  storyCodes: StoryCode[];
}

const TriStateButton = withStyles({
  root: {
    backgroundColor: 'transparent',
    borderRadius: '2px',
    border: '1px solid #00000080',
    height: '20px',
    'margin-right': '10px',
    padding: '0',
    width: '20px',
  },
})(IconButton);

const StoryCodeCheckbox = ({ label, storyCode }: StoryCodeCheckboxProps) => {
  const [triState, setTriState] = useState(
    storyCode.state ? storyCode.state : TriState.UNSET
  );

  const handleChange = (event: MouseEvent) => {
    const triStateIterator = new TriStateIterator(storyCode.state);
    storyCode.state = triStateIterator.next().value;
    setTriState(storyCode.state);
  };

  return (
    <CheckboxLayout key={`storycode-checkbox-${storyCode}`}>
      <TriStateButton
        onClick={(event) => handleChange(event)}
        id={`tristate-${storyCode.id}`}
      >
        {getCheckboxIcon(triState)}
      </TriStateButton>
      <Typography>{label}</Typography>
    </CheckboxLayout>
  );
};

const getCheckboxIcon = (state: TriState): JSX.Element | null => {
  switch (state) {
    case TriState.EXCLUDES:
      return <Remove color="error" />;
    case TriState.INCLUDES:
      return <Add color="primary" />;
    case TriState.UNSET:
      return null;
    default:
      return null;
  }
};
const getStoryCodesCheckboxes = (storycodes: StoryCode[]) => {
  const checkboxesLeft: JSX.Element[] = [];
  const checkboxesCenter: JSX.Element[] = [];
  const checkboxesRight: JSX.Element[] = [];
  storycodes.forEach((storyCode, index) => {
    const checkbox = (
      <StoryCodeCheckbox
        key={storyCode.id}
        label={storyCode.label}
        storyCode={storyCode}
      />
    );
    if (index % 3 === 0) checkboxesLeft.push(checkbox);
    else if (index % 3 === 1) checkboxesCenter.push(checkbox);
    else if (index % 3 === 2) checkboxesRight.push(checkbox);
  });
  return (
    <CheckboxesLayout>
      <CheckboxesColumnLayout>{checkboxesLeft}</CheckboxesColumnLayout>
      <CheckboxesColumnLayout>{checkboxesCenter}</CheckboxesColumnLayout>
      <CheckboxesColumnLayout>{checkboxesRight}</CheckboxesColumnLayout>
    </CheckboxesLayout>
  );
};

const CheckboxLayout = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 20%,
  flex-direction: row;
  margin: 0 0.5rem;
  justify-content: flex-start;
`;

const CheckboxesColumnLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

const CheckboxesLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  width: 100%;
`;

const StoryCodesSelect = ({ storyCodes }: StoryCodesProps) => {
  return getStoryCodesCheckboxes(storyCodes);
};

export default StoryCodesSelect;
