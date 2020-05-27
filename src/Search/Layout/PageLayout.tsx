import React from 'react';
import styled from 'styled-components';

interface Props {
  children: any;
}

const ColumnLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding-bottom: 10%;
  width: 100%;
`;

const PageLayout = ({ children }: Props) => {
  return <ColumnLayout>{children}</ColumnLayout>;
};

export default PageLayout;
