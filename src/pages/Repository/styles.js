import styled, { css } from 'styled-components';
import Rotate from '../../components/Rotate';

const regx = /^#f{3}(?:f{3})?$/i;

export const LoadIssue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  svg {
    animation: ${Rotate} 2s linear infinite;
  }
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  svg {
    animation: ${Rotate} 2s linear infinite;
  }
`;
export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    text-decoration: none;
    font-size: 16px;
    color: #16457f;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  center {
    margin-bottom: 15px;
    span {
      font-weight: bold;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #16457f;
          }
        }
        span {
          background: #eee;
          color: #333;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Pagination = styled.footer`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background: #16457f;
    border: 0;
    outline: 0;
    padding: 8px;
    border-radius: 4px;
    transition: opacity 0.25s ease-out;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  button {
    border: 0;
    outline: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 4px;
    ${props =>
      props.disabled
        ? css`
            &:nth-child(${props.active + 1}) {
              color: #fff;
              background: #16457f;
            }
          `
        : css`
            opacity: 0.7;
            cursor: not-allowed;
          `}
  }
`;

export const Label = styled.span`
  color: #000 !important;
  background: ${props => props.background} !important;
  ${props =>
    regx.exec(props.background) &&
    css`
      border: 1px solid #999;
    `}
`;
