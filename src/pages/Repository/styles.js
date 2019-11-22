import styled from 'styled-components';
import Rotate from '../../components/Rotate';

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
