import React, { memo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

const Header = (props: any): React.ReactElement => {
	const history = useHistory();

	return (
		<Container>
			<LinkButton onClick={() => history.push('/admin/animations')}>Animations</LinkButton>
			<LinkButton onClick={() => history.push('/admin/lamps')}>Lamps</LinkButton>
		</Container>
	);
};

const LinkButton = styled.button<{ theme: ITheme }>`
  height: 100%;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: rgb(95, 96, 97, 1);
  padding: 0 30px 0 0;
  margin: 0;
  text-decoration: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  ${({ theme }) => theme.float ? 'float: right;' : ''};
  &:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
  }
  &:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
`;

const Container = styled.div`
  max-height: 40px;
  height: 40px;
  border-bottom: 1px solid rgb(194,201,209,1);
  width: 100%;
`;

export default memo(Header);
