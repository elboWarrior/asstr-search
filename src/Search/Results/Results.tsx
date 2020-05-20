import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string[] | null;
}

const ColumnScrollLayout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 0 5rem;
`;

const Result = styled.div`
  text-align: justify;
`;

const Results = ({ children }: Props) => {
  if (!children || !children.length) return null;
  const results = children.map((child) => (
    <Result dangerouslySetInnerHTML={{ __html: child }}></Result>
  ));
  return <ColumnScrollLayout>{results}</ColumnScrollLayout>;
};

export default Results;
