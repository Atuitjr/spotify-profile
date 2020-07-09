import React, { Component } from "react";
import { getRecentlyPlayed } from "../spotify/spotify";
import { RouteComponentProps } from "@reach/router";
import { catchErrors } from "../utils/utils";

import Loader from "./Loader";
import TrackItem from "./TrackItem";

import styled from "styled-components/macro";
import Main from "../styles/Main";

const TracksContainer = styled.ul`
	margin-top: 50px;
`;

class RecentlyPlayed extends Component<RouteComponentProps, any> {
	state: { recentlyPlayed: null | any } = {
		recentlyPlayed: null,
	};

	componentDidMount() {
		catchErrors(this.getData());
	}

	async getData() {
		const { data } = await getRecentlyPlayed();
		this.setState({ recentlyPlayed: data });
	}

	render() {
		const { recentlyPlayed } = this.state;

		return (
			<Main>
				<h2>Recently Played Tracks</h2>
				<TracksContainer>
					{recentlyPlayed ? (
						recentlyPlayed.items.map(
							({ track }: any, i: number) => (
								<TrackItem track={track} key={i} />
							)
						)
					) : (
						<Loader />
					)}
				</TracksContainer>
			</Main>
		);
	}
}

export default RecentlyPlayed;
