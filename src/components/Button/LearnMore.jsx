// Import necessary modules
import React from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const LearnMoreButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  verticalAlign: 'middle',
  textDecoration: 'none',
  background: 'transparent',
  padding: 0,
  fontSize: 'inherit',
  fontFamily: 'inherit',
  width: '12rem',
  height: 'auto',
  '&:hover .circle': {
    width: '100%'
  },
  '&:hover .icon.arrow': {
    background: '#fff',
    transform: 'translate(1rem, 0)'
  },
  '&:hover .buttonText': {
    color: '#fff'
  }
}));

const Circle = styled(Box)(({ theme }) => ({
  transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
  position: 'relative',
  display: 'block',
  margin: 0,
  width: '3rem',
  height: '3rem',
  background: '#282936',
  borderRadius: '1.625rem'
}));

const Icon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  '&.arrow': {
    left: '0.625rem',
    width: '1.125rem',
    height: '0.125rem',
    background: 'none',
    transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-0.29rem',
      right: '0.0625rem',
      width: '0.625rem',
      height: '0.625rem',
      borderTop: '0.125rem solid #fff',
      borderRight: '0.125rem solid #fff',
      transform: 'rotate(45deg)'
    }
  }
}));

const ButtonText = styled(Box)(({ theme }) => ({
  transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: '0.75rem 0',
  margin: '0 0 0 1.85rem',
  color: '#282936',
  fontWeight: 700,
  lineHeight: 1.6,
  textAlign: 'center',
  textTransform: 'uppercase'
}));

// Main component
function LearnMore() {
  return (
    <LearnMoreButton>
      <Circle className="circle" aria-hidden="true">
        <Icon className="icon arrow" />
      </Circle>
      <ButtonText className="buttonText">Learn More</ButtonText>
    </LearnMoreButton>
  );
}

export default LearnMore;
