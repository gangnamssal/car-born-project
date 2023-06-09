import styled from "@emotion/styled";
import InspectorContentPagination from "./../Pagination/InspectorContentPagination";

const StyleMyInspectorContentTableDiv = styled.div`
  width: 72%;
  height: 125vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
  margin-bottom: 15vh;
  /* background-color: #fffffff6; */
  border-radius: 5px;
  border: 2px solid #e6e6e6;
`;

const MyInspectorContentComponent = () => {
  const ITEMS_PER_PAGES = 10;

  return (
    <StyleMyInspectorContentTableDiv>
      <InspectorContentPagination itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyInspectorContentTableDiv>
  );
};

export default MyInspectorContentComponent;
