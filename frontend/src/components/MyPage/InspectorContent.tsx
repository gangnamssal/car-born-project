import Nav from "../Nav";
import styled from '@emotion/styled';
import MyInspectorContentComponent from "./TableComponent/MyInspectorContentComponent";

const StyleInspectorContent = styled.div`
  width: 100vw;
`;

const StyleInspectorContentContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInspectorContentTitleDiv = styled.div`
  width: 70%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2.5rem;
    font-weight: 900;
  }

  border-bottom: 2px solid red;
  margin-top: 3rem;
`;


const InspectorContent = () => {
  return (
    <StyleInspectorContent>
      <Nav />
      <StyleInspectorContentContainer>
        <StyleInspectorContentTitleDiv>
          <p>검수 내역</p>
        </StyleInspectorContentTitleDiv>
        <MyInspectorContentComponent />
      </StyleInspectorContentContainer>
    </StyleInspectorContent>
  );
}

export default InspectorContent
