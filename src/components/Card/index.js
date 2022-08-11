import React from "react";
import { DivCard, Div, DivIcons, DivIn, DivConfig } from "./styles";
import { Link } from "react-router-dom";

function Card(props) {
  if (props.categories === false) {
    return (
      <Div>
        <DivCard>
          <img src={props.image} alt="" />
          <DivIn>
            <h3>{props.title}</h3>
            <h6>{props.subtitle}</h6>
            <DivIcons>
              <Link to={props.linkCriar}>
                <img src="https://drive.google.com/uc?id=1gSt6jsoZUGNFMiIVH5kl96MgomkL4ZL9" alt=""></img>
              </Link>
              <Link to={props.linkExibir}>
                <img src="https://drive.google.com/uc?id=1irdqqdmHcIl5Jo_KXTCJUSDq0UHpFx7X" alt="" ></img>
              </Link>
            </DivIcons>
          </DivIn>
        </DivCard>
      </Div>
    );
  } else {
    return (
      <DivConfig>
        <Link to={props.link} style={{ textDecoration: "none" }}>
          <DivCard>
            <img src={props.image} alt="" />
            <DivIn>
              <h3>{props.title}</h3>
              <h6>{props.subtitle}</h6>
            </DivIn>
          </DivCard>
        </Link>
      </DivConfig>
    );
  }
}

export default Card;
