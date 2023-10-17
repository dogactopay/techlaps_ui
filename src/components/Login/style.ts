import styled from 'styled-components/macro';

export const BuyButton = styled.button`
  background-color: #F84C03;
  color: #fff;
  padding: 15px 0;
  margin-top: 10px;
  cursor: pointer;
  width: 50%;
  border: 0;

  :disabled {
    pointer-events: none;
    color: #aaa;
    background: #f5f5f5;
  }

  transition: background-color 0.2s;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
  }
`;

interface IImage {
  alt: string;
}
export const Image = styled.div<IImage>``;

interface IContainer {
  sku: number | string;
}
export const Container = styled.div<IContainer>`
  position: relative;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 30px;
  cursor: default;
  outline: none;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
  }

  ${Image} {
    width: 100%;
    height: 270px;
    position: relative;
   
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    ::before {
      content: '';
      display: block;
      position: absolute;
      background: #eee;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
      height: 320px;
    }
  }

 

    ${BuyButton} {
      background-color: ${({ theme }) => theme.colors.secondary};
     
    }
  }
`;

export const Stopper = styled.input`
  position: absolute;
  color: #ececec;
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 0.6em;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: default;
  z-index: 1;
`;

export const Title = styled.p`
  position: relative;
  padding: 0 20px;
  height: 45px;

  &::before {
    content: '';
    width: 20px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -10px;
  }
`;
export const Orta = styled.div`
  position: relative;
  text-align: center;
  box-sizing: border-box;
  padding: 200px;
  margin-bottom: 50px;
  cursor: default;
  outline: none;
`;

export const Price = styled.input`
  background-color: #fff;

  padding: 15px 0;
  margin-top: 10px;
  cursor: pointer;
  width: 50%;
  margin: 0 auto;

  border: solid 1px #ccc;
  border-radius: 7px;
`;

export const Val = styled.p`
  margin: 0;
  b {
    font-size: 1.5em;
    margin-left: 5px;
  }
`;

export const Installment = styled.p`
  margin: 0;
  color: #9c9b9b;
`;

export const Logo = styled.img`
  
  width:20%;
 

 
`;