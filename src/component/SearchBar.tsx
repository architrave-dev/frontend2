import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMember } from '../shared/hooks/useMember';
import { useNavigate } from 'react-router-dom';
import HeadlessInput from '../shared/component/headless/input/HeadlessInput';
import { InputBox } from '../shared/component/headless/input/InputBody';


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
        <HeadlessInput
          type="text"
          value={aui}
          handleChange={(e) => setAui(e.target.value)}
          handleKeyBoard={handleKeyDown}
          placeholder={"Enter Artist ID"}
          StyledInput={InputBox}
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

const Button = styled.button`
  width: 140px;
  padding: 10px 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.color_Gray_01};
  color: ${({ theme }) => theme.colors.color_White};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_03};
    }
  ${({ theme }) => theme.typography.Body_02_2};
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.color_alert_red};
  margin-top: 10px;
  text-align: left;
  ${({ theme }) => theme.typography.Body_03_2};
`;

export default SearchBar;
