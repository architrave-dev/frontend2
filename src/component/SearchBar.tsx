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
          placeholder="Enter Artist ID"
        />
        <Button onClick={handleSearch}>
          {isLoading ? 'Search...' : 'Search'}
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
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  background-color: ${({ theme }) => theme.colors.color_Gray_06};
`;

const Button = styled.button`
  width: 140px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSize.font_B02};
  border: none;
  background-color: ${({ theme }) => theme.colors.color_Gray_01};
  color: ${({ theme }) => theme.colors.color_White};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_03};
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.color_alert_red};
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  text-align: left;
`;

export default SearchBar;
