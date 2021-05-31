import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// import Header from '../../molecules/header/index';
import './style.css';

export interface ITheme {
  float?: string;
  color?: string;
  borderRadius?: string;
  margin?: string;
  width?: string;
  maxWidth?: string;
  inputMaxWidth?: string;
  height?: string;
  border?: string;
}

const Home = () => {
	// const history = useHistory();
  const [vantaEffect, setVantaEffect] = useState<any>(0)
  const myRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 1500.00,
        minWidth: 2000.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x9195f5,
        points: 11.00,
        maxDistance: 34.00,
        THREE: THREE
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    // <>
      <div className="home-page" ref={myRef}>
        {/* <Header /> */}
        <Container>
          {/* <LinkButton onClick={() => history.push('/home')}>Home</LinkButton>
          <LinkButton onClick={() => history.push('/fixture')}>Fixture</LinkButton> */}
        </Container>
        <WrapperCard>
          <LinkButton>Home</LinkButton>
          <LinkButton>Fixture</LinkButton>

        </WrapperCard>
      </div>
    // </>
  )
}

const LinkButton = styled.button<{ theme: ITheme }>`
  font-family: monospace;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: rgb(255 255 255);
  letter-spacing: 2px;
  margin: 0;
  -webkit-text-decoration: none;
  text-decoration: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  width: 100%;
  height: 70px;
  margin: 20px;
  &:hover {
    background: #9e9e9e1a radial-gradient(circle, #cecece7d 1%, #a5a5a554 1%) center/15000%;
    transition: background 0.5s;
    border-radius: 50px;
  }
  &:active {
    background-color: #068fff00;
    background-size: 100%;
    transition: background 0.5s;
  }
`;

const Container = styled.div`
  max-height: 40px;
  height: 40px;
  border-bottom: 1px solid rgb(194,201,209,1);
  width: 100%;
`;

const WrapperCard = styled.div`
  min-height: 500px;
  max-height: 500px;
  min-width: 400px;
  max-width: 400px;
  margin: 200px auto;
  border: 1px solid rgb(194 201 209 / 45%);
  -webkit-box-shadow: -2px -1px 15px 7px rgba(0,0,0,0.5);
  -moz-box-shadow: -3px -2px 30px 14px rgba(0,0,0,0.425);
  box-shadow: -4px -3px 9px 8px rgb(255 255 255 / 41%);

  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 100px 0;
`;


export default Home;
