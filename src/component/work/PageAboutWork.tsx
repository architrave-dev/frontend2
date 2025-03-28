import React from 'react';
import styled from 'styled-components';
import { usePageStore } from '../../shared/store/pageStore';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import { useAui } from '../../shared/hooks/useAui';

const PageAboutWork: React.FC = () => {
  const { aui } = useAui();
  const { page } = usePageStore();
  const { getWorkList } = useWorkList();

  const handlePageClick = (pageNum: number) => {
    getWorkList(aui, { page: pageNum, size: 10 });
  };

  return (
    <PageContainer>
      {Array.from({ length: page.totalPages }, (_, i) => i + 1)
        .slice(0, 2) // Limit to 9 buttons
        .map((pageNum) => (
          pageNum === page.page ? (
            <CurrPageButton key={pageNum}>{pageNum}</CurrPageButton>
          ) : (
            <PageButton key={pageNum} onClick={() => handlePageClick(pageNum)}>{pageNum}</PageButton>
          )
        ))}
      {page.totalPages > 2 && (
        <PageButton>→</PageButton>
      )}
    </PageContainer>
  );
}

export default PageAboutWork;

const PageContainer = styled.div`
  width: 100%;
  height: calc(4.5vh);
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ theme }) => theme.typography.Body_04};
`;

const PageButton = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.color_Gray_05};
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.color_Gray_04};
  }
`;

const CurrPageButton = styled(PageButton)`
  color: ${({ theme }) => theme.colors.color_Gray_02};
  cursor: default;
`;