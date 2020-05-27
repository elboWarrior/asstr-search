import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const StyledTitle = styled((props) => (
  <Typography color="primary" variant="h2" {...props} />
))``;

const Title = () => {
  return <StyledTitle>ASSTR Search</StyledTitle>;
};

export default Title;
