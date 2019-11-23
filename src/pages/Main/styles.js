import styled, { css } from 'styled-components';
import Rotate from '../../components/Rotate';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
  ${props =>
    props.error &&
    css`
      input {
        border: 1px solid #f00 !important;
      }
    `}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #16457f;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${Rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #16457f;
      text-decoration: none;
    }
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 12%;
    }
    svg {
      cursor: pointer;
    }
  }
`;
export const Message = styled.span`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  color: #f00;
`;
