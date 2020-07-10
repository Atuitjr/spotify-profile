import React, { Component } from "react";
import {
	getTopTracksShort,
	getTopTracksMedium,
	getTopTracksLong,
} from "../spotify/spotify";
import { RouteComponentProps } from "@reach/router";
import { catchErrors } from "../utils/utils";

import Loader from "./Loader";
import TrackItem from "./TrackItem";

import styled from "styled-components/macro";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
const { colors, fontSizes } = theme;

const Header = styled.header`
	${mixins.flexBetween};
	${media.tablet`
    display: block;
  `};
	h2 {
		margin: 0;
	}
`;
const Ranges = styled.div`
	display: flex;
	margin-right: -11px;
	${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;
const RangeButton = styled.button<{ isActive: any }>`
	background-color: transparent;
	color: ${(props) => (props.isActive ? colors.white : colors.lightGrey)};
	font-size: ${fontSizes.base};
	font-weight: 500;
	padding: 10px;
	${media.phablet`
    font-size: ${fontSizes.sm};
  `};
	span {
		padding-bottom: 2px;
		border-bottom: 1px solid
			${(props) => (props.isActive ? colors.white : `transparent`)};
		line-height: 1.5;
		white-space: nowrap;
	}
`;
const TracksContainer = styled.ul`
	margin-top: 50px;
`;

class TopTracks extends Component<RouteComponentProps, any> {
	state: {
		topTracks: null | any;
		activeRange: string;
	} = {
		topTracks: null,
		activeRange: "long",
	};

	apiCalls: any = {
		long: getTopTracksLong(),
		medium: getTopTracksMedium(),
		short: getTopTracksShort(),
	};

	componentDidMount() {
		catchErrors(this.getData());
	}

	async getData() {
		const { data } = await getTopTracksLong();
		this.setState({ topTracks: data });
	}

	async changeRange(range: any) {
		const { data } = await this.apiCalls[range];
		this.setState({ topTracks: data, activeRange: range });
	}

	setActiveRange = (range: any) => catchErrors(this.changeRange(range));

	render() {
		const { topTracks, activeRange } = this.state;

		return (
			<Main>
				<Header>
					<h2>Top Tracks</h2>
					<Ranges>
						<RangeButton
							isActive={activeRange === "long"}
							onClick={() => this.setActiveRange("long")}
						>
							<span>All Time</span>
						</RangeButton>
						<RangeButton
							isActive={activeRange === "medium"}
							onClick={() => this.setActiveRange("medium")}
						>
							<span>Last 6 Months</span>
						</RangeButton>
						<RangeButton
							isActive={activeRange === "short"}
							onClick={() => this.setActiveRange("short")}
						>
							<span>Last 4 Weeks</span>
						</RangeButton>
					</Ranges>
				</Header>
				<TracksContainer>
					{topTracks ? (
						topTracks.items.map((track: any, i: number) => (
							<TrackItem track={track} key={i} />
						))
					) : (
						<Loader />
					)}
				</TracksContainer>
			</Main>
		);
	}
}

export default TopTracks;
