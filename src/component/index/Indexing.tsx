import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useModalStore } from '../../shared/store/portal/modalStore';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCancel } from '../../shared/component/headless/button/BtnBody';
import { useProjectList } from '../../shared/hooks/useApi/useProjectList';
import { IndexOrderData } from '../../shared/dto/EntityRepository';
import { ModalType } from '../../shared/enum/EnumRepository';
import IndexCard from './IndexCard';
import { useProjectInfo } from '../../shared/hooks/useApi/useProjectInfo';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { ProjectElementType } from '../../shared/enum/EnumRepository';

const Indexing: React.FC = () => {
  const { standardModal, isClosing, clearModal } = useModalStore();
  const { projects } = useProjectList();
  const { projectInfoList } = useProjectInfo();
  const { projectElementList } = useProjectElement();
  const [orderedDataList, setOrderedDataList] = useState<IndexOrderData[]>([]);
  const [grabbedData, setGrabbedData] = useState<IndexOrderData | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!standardModal) return;
    if (standardModal.modalType !== ModalType.INDEXING) return;
    createOrderedContent();
  }, [standardModal]);

  const createOrderedContent = () => {
    switch (standardModal?.title) {
      case "Project":
        const orderedProjects = projects.map((project, index) => (
          {
            index,
            id: project.id,
            mainText: project.title,
            subText: project.description
          }
        ));
        setOrderedDataList(orderedProjects);
        break;
      case "Info":
        const orderedInfos = projectInfoList.map((info, index) => (
          {
            index,
            id: info.id,
            mainText: info.customName,
            subText: info.customValue
          }
        ));
        setOrderedDataList(orderedInfos);
        break;
      case "Element":
        const orderedElements = projectElementList.map((element, index) => {
          switch (element.projectElementType) {
            case ProjectElementType.WORK:
              return {
                index,
                id: element.id,
                mainText: element.work.title,
                subText: "Work"
              };
            case ProjectElementType.DETAIL:
              return {
                index,
                id: element.id,
                mainText: element.workDetail.description,
                subText: "Detail"
              };
            case ProjectElementType.TEXTBOX:
              return {
                index,
                id: element.id,
                mainText: element.textBox.content,
                subText: "Text Box"
              };
            case ProjectElementType.DOCUMENT:
              return {
                index,
                id: element.id,
                mainText: element.document.description,
                subText: "Document"
              };
            case ProjectElementType.DIVIDER:
              return {
                index,
                id: element.id,
                mainText: "Divider",
                subText: ""
              };
            default:
              return null;
          }
        }).filter(item => item !== null) as IndexOrderData[];

        setOrderedDataList(orderedElements);
        break;
    }
  };

  const handleDragStart = (data: IndexOrderData) => {
    setGrabbedData(data);
  };

  const handleDropSpaceDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDropSpaceDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (!grabbedData) return;

    const newOrderedList = [...orderedDataList];

    const grabbedIndex = grabbedData.index;
    newOrderedList.splice(grabbedIndex, 1);

    newOrderedList.splice(index > grabbedIndex ? index - 1 : index, 0, grabbedData);

    // Update indices for all items
    const updatedList = newOrderedList.map((item, idx) => ({
      ...item,
      index: idx
    }));

    setOrderedDataList(updatedList);
    setGrabbedData(null);
    setDragOverIndex(null);
  };

  const handleSubmit = () => {
    clearModal();
  };

  return (
    <IndexingFrame
      onClick={(e) => e.stopPropagation()}
      $isClosing={isClosing}
    >
      <IndexingComp>
        <Title>{"Reorder " + standardModal?.title}</Title>
        {orderedDataList.length > 0 ? (
          <ContentContainer>
            {orderedDataList.map((each, index) => (
              <React.Fragment key={each.id}>
                <DropSpace
                  onDrop={() => handleDrop(index)}
                  onDragOver={(e) => handleDropSpaceDragOver(e, index)}
                  onDragLeave={handleDropSpaceDragLeave}
                  $isActive={dragOverIndex === index}
                />
                <IndexCard
                  data={each}
                  onDragStart={handleDragStart}
                />
              </React.Fragment>
            ))}
            <DropSpace
              onDrop={() => handleDrop(orderedDataList.length)}
              onDragOver={(e) => handleDropSpaceDragOver(e, orderedDataList.length)}
              onDragLeave={handleDropSpaceDragLeave}
              $isActive={dragOverIndex === orderedDataList.length}
            />
            <DropSpaceLast
              onDrop={() => handleDrop(orderedDataList.length)}
              onDragOver={(e) => handleDropSpaceDragOver(e, orderedDataList.length)}
              onDragLeave={handleDropSpaceDragLeave}
            />
          </ContentContainer>
        ) : (
          <NoContentContainer>
            No items to reorder
          </NoContentContainer>
        )}
        <ButtonContainer>
          <HeadlessBtn
            value={"Change"}
            handleClick={handleSubmit}
            StyledBtn={SubmitButton}
          />
          <HeadlessBtn
            value={"Cancel"}
            handleClick={clearModal}
            StyledBtn={BtnCancel}
          />
        </ButtonContainer>
      </IndexingComp>
    </IndexingFrame>
  );
};

const IndexingFrame = styled.div<{ $isClosing: boolean }>`
  position: absolute;
  left: 4vw;
  width: 230px;

  transform: ${({ $isClosing }) =>
    $isClosing
      ? 'translateX(-100%)'
      : 'translateX(0)'
  };
  
  padding: 20px;
  border-radius: 1px;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  backdrop-filter: blur(4px);
  background-color: ${({ theme }) => theme.colors.color_Alpha_03};
  
  opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
  transition: all 0.4s ease-out;
  animation: slideInFromLeft 0.5s ease-out;
  
  @keyframes slideInFromLeft {
    from {
      transform: translateX(-100%);
      opacity: 0.5;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const IndexingComp = styled.div`
  width: 100%;
  height: 100%;
  max-height: 80vh;

  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NoContentContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.color_Gray_01};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 10px 0px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.color_Gray_06};
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  &:hover {
    color: ${({ theme }) => theme.colors.color_White};
    background-color: ${({ theme }) => theme.colors.color_Gray_03};
  }
`;

const DropSpace = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  height: ${({ $isActive }) => $isActive ? '40px' : '5px'};
  margin: 2px 0;
  border-radius: 2px;
  transition: all 0.4s;
  background-color: transparent;
  border: ${({ $isActive, theme }) => $isActive ? `1px dashed ${theme.colors.color_Gray_05}` : 'none'};
`;

const DropSpaceLast = styled.div`
  width: 100%;
  flex: 1;
  min-height: 20px;
`;
export default Indexing;