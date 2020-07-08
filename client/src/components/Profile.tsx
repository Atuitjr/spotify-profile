import React from "react";
import { Router } from "@reach/router";

import styled from "styled-components/macro";
import theme from "../styles/theme";
import media from "../styles/media";
import Nav from "./Nav";

const SiteWrapper = styled.div`
	padding-left: ${theme.navWidth};
	${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const Profile = () => (
	<SiteWrapper>
		<Nav />
		<Router primary={false}></Router>
	</SiteWrapper>
);

export default Profile;
