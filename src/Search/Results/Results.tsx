import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, useTheme } from '@material-ui/core';

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

const ResultCard = styled(({ color, children, ...props }) => (
  <Card {...props}>
    <CardContent>{children}</CardContent>
  </Card>
))`
  background-color: ${(props) => props.color};
  margin-top: 0.6rem;
  overflow: visible;
`;

const Result = styled.div`
  text-align: justify;
`;

const Results = ({ children }: Props) => {
  const theme = useTheme();
  const oddCardBg = `${theme.palette.primary.light}40`;
  const evenCardBg = theme.palette.grey[300];

  if (!children || !children.length) return null;
  const results = children.map((child, index) => (
    <ResultCard
      color={index % 2 ? evenCardBg : oddCardBg}
      key={`result-${index}`}
    >
      <Result dangerouslySetInnerHTML={{ __html: child }}></Result>
    </ResultCard>
  ));
  return <ColumnScrollLayout>{results}</ColumnScrollLayout>;
};

export default Results;
