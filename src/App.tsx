import React from 'react';
import styled from 'styled-components';


import Main from './Router';

const App = (): React.ReactElement => {
	return (
		<Container key='app-container' className="App">
			{/* <Navbar /> */}
			<Main />
		</Container>
	);
};

const Container = styled.div`
height: calc(var(--vh, 1vh) * 100);
`;

export default App;
