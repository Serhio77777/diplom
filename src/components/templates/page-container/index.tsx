import React, { useState, memo } from 'react';
import styled from 'styled-components';

import Header from '../../molecules/header/index';
// import Spinner from '../../molecules/spinner/index';

export interface ITheme {
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  shadow?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
}

export interface IProps {
  children: JSX.Element
  | JSX.Element[]
  | string
  | string[];
  key: string;
  loading?: boolean;
  theme?: ITheme;
}

const ListContainer: React.FC<IProps>  = (props: IProps) => {
	return (
		<Container key={`${props.key}-list-container`} theme={props.theme} >
			{/* {props.loading && <Spinner loading={props.loading} />} */}
			<Header />
			{props.children}
		</Container>
	);
};


const Container = styled.div<{ theme: ITheme }>`
  height: 100%;
  width: 100%;
`;

export default memo(ListContainer);
