import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <ErrorPageComp>
      <ErrorHead>Error: Invalid artist ID</ErrorHead>
      <ErrorMessage>The provided artist ID does not match the required format.</ErrorMessage>
      <ErrorMessage>Redirecting to home in {countdown} seconds.</ErrorMessage>
    </ErrorPageComp>
  );
}

export default ErrorPage;

const ErrorPageComp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ErrorHead = styled.h2`
  ${({ theme }) => theme.typography.Body_01_1}; 
  margin-bottom: 1vh;
`

const ErrorMessage = styled.div`
  ${({ theme }) => theme.typography.Body_02_2}; 
`