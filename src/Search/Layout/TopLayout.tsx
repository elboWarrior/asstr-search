import React from 'react';
import styled from 'styled-components';

interface Props {
  children: Array<object>;
}

const RowLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10%;
`;

const TopLayout = ({ children }: Props) => {
  return <RowLayout>{children}</RowLayout>;
};

export default TopLayout;
