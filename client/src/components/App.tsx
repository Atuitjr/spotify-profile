import React, { Component } from "react";
import LoginScreen from "./LoginScreen";
import Profile from "./Profile";
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
			<AppContainer>{token ? <Profile /> : <LoginScreen />}</AppContainer>
		);
	}
}

export default App;
