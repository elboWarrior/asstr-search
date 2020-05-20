import React from 'react';
import styled from 'styled-components';

interface Props {
  children: Array<object>;
}

const ColumnLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10%;
`;

const PageLayout = ({ children }: Props) => {
  return <ColumnLayout>{children}</ColumnLayout>;
};

export default PageLayout;
