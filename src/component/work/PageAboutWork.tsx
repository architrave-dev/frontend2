import React from 'react';
import styled from 'styled-components';
import { usePageStore } from '../../shared/store/pageStore';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { AlertType } from '../../shared/enum/EnumRepository';
import { AlertPosition } from '../../shared/enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';

const LIMIT_PAGE_NUM = 5;       //한번에 보이는 페이지 갯수

const PageAboutWork: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { page } = usePageStore();
  const { getWorkList } = useWorkList();
  const { setStandardAlert } = useStandardAlertStore();
  const [currentWindow, setCurrentWindow] = React.useState(1);

  const handlePageClick = (pageNum: number) => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Exit edit mode."
      })
      return;
    }
    getWorkList(aui, { page: pageNum, size: 10 });
  };

  const handlePageWindowClick = (direction: 'prev' | 'next') => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Exit edit mode."
      })
      return;
    }

    if (direction === 'prev' && currentWindow > 1) {
      const newPage = (currentWindow - 2) * LIMIT_PAGE_NUM + 1;
      getWorkList(aui, { page: newPage, size: 10 });
      setCurrentWindow(currentWindow - 1);
    } else if (direction === 'next' && currentWindow < Math.ceil(page.totalPages / LIMIT_PAGE_NUM)) {
      const newPage = currentWindow * LIMIT_PAGE_NUM + 1;
      getWorkList(aui, { page: newPage, size: 10 });
      setCurrentWindow(currentWindow + 1);
    }
  };

  // Calculate the start and end page numbers for the current window
  const startPage = (currentWindow - 1) * LIMIT_PAGE_NUM + 1;
  const endPage = Math.min(startPage + LIMIT_PAGE_NUM - 1, page.totalPages);

  // Update window if current page is outside the visible range
  React.useEffect(() => {
    const windowForCurrentPage = Math.ceil(page.page / LIMIT_PAGE_NUM);
    if (windowForCurrentPage !== currentWindow) {
      setCurrentWindow(windowForCurrentPage);
    }
  }, [page.page]);

  return (
    <PageContainer>
      {currentWindow > 1 && (
        <PageWindowButton onClick={() => handlePageWindowClick('prev')}>←</PageWindowButton>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        .map((pageNum) => (
          pageNum === page.page ? (
            <CurrPageButton key={pageNum}>{pageNum}</CurrPageButton>
          ) : (
            <PageButton key={pageNum} onClick={() => handlePageClick(pageNum)}>{pageNum}</PageButton>
          )
        ))}
      {currentWindow < Math.ceil(page.totalPages / LIMIT_PAGE_NUM) && (
        <PageWindowButton onClick={() => handlePageWindowClick('next')}>→</PageWindowButton>
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

const PageWindowButton = styled(PageButton)`
`;