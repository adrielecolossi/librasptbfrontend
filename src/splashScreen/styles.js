import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 30px 20px 30px;
`;
export const Banner = styled.div`
  background-color: rgba(142, 202, 230, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 65%;
  height: 50%;
  display: flex;
  margin: auto;
  padding: 2%;
  border-radius: 3px;
  h1 {
    font-weight: 400;
    font-size: 2em;
  }
  h2 {
    font-size: 1em;
    font-weight: 200;
  }
  img {
    width: 27.5%;
  }
  @media only screen and (min-width: 600px) and (max-device-width: 800px) {
    img {
      width: 30%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 450px) and (max-device-width: 600px) {
    img {
      width: 35%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 300px) and (max-device-width: 450px) {
    img {
      width: 20%;
      height: 100%;
    }
  }
`;

export const BannerCards = styled(Banner)`
  margin-top: 2%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 65%;
  height: 50%;
`;
