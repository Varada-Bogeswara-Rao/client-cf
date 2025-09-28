import React from 'react';
import styled from 'styled-components';

const GetStarted = () => {
    return (
        <StyledWrapper>
            <button>
                Get started
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
    width: 10em;
    position: relative;
    height: 3.5em;
    border: 3px ridge white;
    outline: none;
    background-color: transparent;
    color: white;
    transition: 1s;
    border-radius: 0.3em;
    font-size: 16px;
    font-weight: bold;
  }

  button::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: black;
    transition: 0.5s;
    transform-origin: center;
  }

  button::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: black;
    transition: 0.5s;
  }

  button:hover::before, button:hover::after {
    transform: scale(0)
  }

  button:hover {
    box-shadow: inset 0px 0px 25px grey;
  }`;

export default GetStarted;
