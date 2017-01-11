import React, { Component } from 'react';
import styled from 'styled-components';

const CloseButton = props => (
  <StyledIcon className="material-icons" style={{ fontSize: props.size || 70 }} onClick={props.onClick}>
    close
  </StyledIcon>
);

const StyledIcon = styled.i`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover { 
    cursor: pointer;
    cursor: hand; 
  }
`;

export default CloseButton;
