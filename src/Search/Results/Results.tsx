import React from 'react';
import styled from 'styled-components';
import { Button, Card, CardContent, useTheme } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

import SearchDirection from '../../AsstrSearch/SearchDirection';
interface Props {
  children: string[] | null;
  resultsCallback: (direction: SearchDirection) => void;
}

interface FooterProps {
  resultsCallback: (direction: SearchDirection) => void;
}

const ColumnScrollLayout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 0 5rem;
`;
const FooterLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Footer = styled(({ resultsCallback, ...props }: FooterProps) => (
  <FooterLayout>
    <Button
      onClick={() => resultsCallback(SearchDirection.BACKWARD)}
      aria-label="Next Results"
      startIcon={<NavigateBefore />}
      color="primary"
      variant="outlined"
    >
      Previous
    </Button>
    <Button
      onClick={() => resultsCallback(SearchDirection.FORWARD)}
      aria-label="Next Results"
      endIcon={<NavigateNext />}
      color="primary"
      variant="outlined"
    >
      Next
    </Button>
  </FooterLayout>
))``;

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

const Results = ({ children, resultsCallback, ...props }: Props) => {
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
  return (
    <ColumnScrollLayout>
      {results}
      <Footer resultsCallback={resultsCallback} />
    </ColumnScrollLayout>
  );
};

export default Results;
