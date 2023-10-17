import styled from 'styled-components/macro';

import CB from 'commons/Checkbox';

export const Container = styled.div``;

export const Checkbox = styled(CB)`
  display: inline-block;
  margin-bottom: 5em;

  /* Customize the label (the container) */
  label {
    cursor: pointer;
    display: inline-block;
    position: relative;

    text-align: center;

    /* On mouse-over, add a border with the primary color */
    &:hover input ~ .checkmark {
     
    }

    input:focus-visible ~ .checkmark {
      box-sizing: border-box;
      line-height: 30px;
      border: 3px solid ${({ theme }) => theme.colors.secondary};
    }

    /* When the checkbox is checked, add the primary color to background */
    & input:checked ~ .checkmark {
      
      color: #ff0000
      ;
    }

    /* Show the checkmark when checked */
    & input:checked ~ .checkmark:after {
      display: block;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

  
  }
`;

export const Title = styled.h4`
  margin-top: 2px;
  margin-bottom: 20px;
`;
