import React from 'react';
import styled from 'styled-components';

const SearchBar: React.FC = () => {
  return (
    <SearchWrapper>
      <Input type="text" placeholder="작가 이름을 검색해 주세요." />
      <Button>검색</Button>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  
  &:hover {
    background-color: #333;
  }
`;


export default SearchBar;
