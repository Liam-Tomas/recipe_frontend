import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: auto;
  padding: 10px;
  text-align: center;
  background-color: none;
`;

const FooterText = styled.p`
  margin: 0;
  color: grey;
`;

const Footer = () => (
  <FooterContainer>
    <FooterText> &copy; Liam Armstrong - Recipe Tracker {new Date().getFullYear()} </FooterText>
  </FooterContainer>
);

export default Footer;
