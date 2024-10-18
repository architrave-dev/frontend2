import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMember } from '../../shared/hooks/useApi/useMember';
import { useNavigate } from 'react-router-dom';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputBox } from '../../shared/component/headless/input/InputBody';


const SearchBar: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const { isLoading, checkAui, result } = useMember();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchString.trim()) return;
    checkAui(searchString);
  };

  useEffect(() => {
    if (result) navigate(`/${searchString}`)
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
          value={searchString}
          handleChange={(e) => setSearchString(e.target.value)}
          handleKeyBoard={handleKeyDown}
          placeholder={"Enter Artist ID"}
          StyledInput={InputBox}
        />
        <Button onClick={handleSearch}>
          {isLoading ? 'Search...' : 'Search'}
        </Button>
      </InputWrapper>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
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


export default SearchBar;
