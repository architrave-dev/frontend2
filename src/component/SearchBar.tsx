import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMember } from '../shared/hooks/useMember';
import { useNavigate } from 'react-router-dom';


const SearchBar: React.FC = () => {
  const [aui, setAui] = useState('');
  const { isLoading, error, checkAui, result } = useMember();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!aui.trim()) return;
    checkAui(aui);
  };

  useEffect(() => {
    if (result) navigate(`/${aui}`)
  }, [result])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchWrapper>
      <InputWrapper>
        <Input
          type="text"
          value={aui}
          onChange={(e) => setAui(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="작가 이름을 검색해 주세요."
        />
        <Button onClick={handleSearch}>
          {isLoading ? '검색 중...' : '검색'}
        </Button>
      </InputWrapper>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  border: 1px solid #ccc;
  outline: none;
  background-color: #f5f5f5;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }

  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 140px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  
  // &:hover {
  //   background-color: #333;
  // }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5);
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
`;

export default SearchBar;
