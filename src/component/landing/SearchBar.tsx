import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMember } from '../../shared/hooks/useApi/useMember';
import { useNavigate } from 'react-router-dom';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputBox } from '../../shared/component/headless/input/InputBody';
import { useLoadingStore } from '../../shared/store/loadingStore';

const SearchBar: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const { checkAui, result, search, searchList } = useMember();
  const { isLoading } = useLoadingStore();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const [showCandidates, setShowCandidates] = useState(false);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }

    // Add event listener for clicks outside the component
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleBlankClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (result) navigate(`/${searchString}`)
  }, [result])

  const handleChange = async (username: string) => {
    if (username.length <= 0) {
      setShowCandidates(false);
      setSearchString(username);
      return;
    }
    setShowCandidates(true);
    await search(username);
    setSearchString(username);
  }

  const handleCandidateClick = (aui: string) => {
    setSearchString(aui);
    navigate(`/${aui}`)
  };

  const handleBlankClick = () => {
    setShowCandidates(false);
  }

  const handleInputClick = () => {
    if (searchString && searchList.length > 0) {
      setShowCandidates(true);
    }
  };

  const handleSearch = () => {
    if (!searchString.trim()) return;
    checkAui(searchString);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading) {
      return null;
    }
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    <SearchWrapper ref={searchRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <InputWrapper>
        <SearchInputContainer onClick={handleInputClick}>
          <HeadlessInput
            type="text"
            value={searchString}
            handleChange={(e) => handleChange(e.target.value)}
            handleKeyBoard={handleKeyDown}
            placeholder={"Enter username"}
            StyledInput={InputBox}
          />
          {showCandidates && searchList.length > 0 && (
            <CandidatesList>
              {searchList.map((candidate, index) => (
                <CandidateItem
                  key={index}
                  onClick={() => handleCandidateClick(candidate.aui)}
                >
                  <CandidateName>{candidate.username}</CandidateName>
                  <CandidateAui>{candidate.aui}</CandidateAui>
                </CandidateItem>
              ))}
            </CandidatesList>
          )}
        </SearchInputContainer>
        <Button onClick={handleSearch}>
          Search
        </Button>
      </InputWrapper>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  outline: none;
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

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const CandidatesList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  border-top: none;
  border-radius: 0 0 2px 2px;
  backdrop-filter: blur(4px);
  z-index: 2;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const CandidateItem = styled.li`
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_06};
  align-items: center;
  cursor: pointer;
  
  color: ${({ theme }) => theme.colors.color_Gray_04};
  
  &:hover {
    color: ${({ theme }) => theme.colors.color_Gray_02};
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
`;

const CandidateName = styled.span`
  ${({ theme }) => theme.typography.Body_02_1};
`;

const CandidateAui = styled.span`
  ${({ theme }) => theme.typography.Body_04};
  color: ${({ theme }) => theme.colors.color_Gray_05};
`;

export default SearchBar;
