import React, { Component } from "react";
import LoginScreen from "./LoginScreen";
import { token } from "../spotify/spotify";

import styled from "styled-components/macro";

const AppContainer = styled.div`
	height: 100%;
	min-height: 100vh;
`;

class App extends Component {
	state = {
		token: "",
	};

	componentDidMount() {
		this.setState({ token });
	}

	render() {
		const { token } = this.state;

		return (
			<AppContainer>
				{token ? <h1>hello</h1> : <LoginScreen />}
			</AppContainer>
		);
	}
}

export default App;
