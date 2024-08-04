import React from 'react';
import styled from 'styled-components';

const User: React.FC = () => {
  return (
    <UserComp>
      <UserStatus>완료</UserStatus>
      <UserName>작가이름</UserName>
    </UserComp>
  );
}


const UserComp = styled.article`
  width: calc(14vw);

  display: flex;
  align-items: center;
`;

const UserName = styled.div`
`;

const UserStatus = styled.div`
`;

export default User;