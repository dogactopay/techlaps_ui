import styled from 'styled-components/macro';

export const Container = styled.div``;

export const TwoColumnGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1400px;
  margin: 100px auto auto;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    grid-template-columns: 1fr 4fr;
    margin-top: 80px;
  }
`;

export const Side = styled.div`
  display: grid;

  padding: 1px;
  box-sizing: border-box;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    align-content: baseline;
  }
`;
export const Logo = styled.img`
  left: 50%;
  width: 60%;
`;

export const Main = styled.main``;

export const MainHeader = styled.main`
  display: grid;

  grid-template-columns: 1fr 1fr;
  justify-content: end;
  padding: 0 15px;
`;

export const ItemDiv = styled.div`
  width: 200px;
`;
