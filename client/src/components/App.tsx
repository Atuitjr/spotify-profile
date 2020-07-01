import React, { Component } from "react";

import styled from "styled-components/macro";

const AppContainer = styled.div`
	height: 100%;
	min-height: 100vh;
`;

class App extends Component {
	state = {
		token: "",
	};

	componentDidMount() {}

	render() {
		const { token } = this.state;

		return <AppContainer></AppContainer>;
	}
}

export default App;
