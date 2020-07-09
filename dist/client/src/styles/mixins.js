"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const macro_1 = require("styled-components/macro");
const theme_1 = __importDefault(require("./theme"));
const { colors, fontSizes } = theme_1.default;
const mixins = {
    flexCenter: macro_1.css `
		display: flex;
		justify-content: center;
		align-items: center;
	`,
    flexBetween: macro_1.css `
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
    engulf: macro_1.css `
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
	`,
    outline: macro_1.css `
		outline: 1px solid red;
	`,
    overflowEllipsis: macro_1.css `
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-right: 1px;
	`,
    coverShadow: macro_1.css `
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	`,
    button: macro_1.css `
		display: inline-block;
		color: ${colors.white};
		font-weight: 700;
		font-size: ${fontSizes.xs};
		letter-spacing: 1px;
		text-transform: uppercase;
		border: 1px solid ${colors.white};
		border-radius: 50px;
		padding: 11px 24px;
		cursor: pointer;
		transition: ${theme_1.default.transition};

		&:hover,
		&:focus {
			color: ${colors.black};
			background: ${colors.white};
			outline: 0;
		}
	`,
    greenButton: macro_1.css `
		display: inline-block;
		background-color: ${colors.green};
		color: ${colors.white};
		font-weight: 700;
		font-size: ${fontSizes.xs};
		letter-spacing: 1px;
		text-transform: uppercase;
		border-radius: 50px;
		padding: 11px 24px;
		margin: 20px 0;
		cursor: pointer;
		transition: ${theme_1.default.transition};

		&:hover,
		&:focus {
			background-color: ${colors.offGreen};
			outline: 0;
		}
	`,
};
exports.default = mixins;
//# sourceMappingURL=mixins.js.map