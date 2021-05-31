import React from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';

export interface IProps {
  loading?: boolean;
}

const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner = (props: IProps): React.ReactElement => {
	return (
		<SpinnerWrapper>
			<RingLoader color={'#08f7da'} loading={props.loading} css={override} size={80} />
		</SpinnerWrapper>  
	);
};

const SpinnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(0 0 0 / 67%);
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
`;

export default Spinner;
