"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const macro_1 = __importStar(require("styled-components/macro"));
const theme_1 = __importDefault(require("../styles/theme"));
const mixins_1 = __importDefault(require("../styles/mixins"));
const { colors } = theme_1.default;
const Container = macro_1.default.div `
	${mixins_1.default.flexCenter};
	width: 100%;
	height: 90vh;
`;
const dance = macro_1.keyframes `
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`;
const Bars = macro_1.default.div `
	display: flex;
	justify-content: center;
	align-items: flex-end;
	overflow: hidden;
	width: 100px;
	min-width: 100px;
	height: 50px;
	margin: 0 auto;
	z-index: 2;
	position: relative;
	left: 0;
	right: 0;
`;
const Bar = macro_1.default.div `
	width: 10px;
	height: 5px;
	margin: 0 2px;
	background-color: ${colors.grey};
	animation-name: ${dance};
	animation-duration: 400ms;
	animation-play-state: running;
	animation-direction: alternate;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-delay: ${(props) => props.delay || "0ms"};
`;
const Loader = () => (react_1.default.createElement(Container, null,
    react_1.default.createElement(Bars, null,
        react_1.default.createElement(Bar, { delay: "250ms" }),
        react_1.default.createElement(Bar, { delay: "715ms" }),
        react_1.default.createElement(Bar, { delay: "475ms" }),
        react_1.default.createElement(Bar, { delay: "25ms" }),
        react_1.default.createElement(Bar, { delay: "190ms" }))));
exports.default = Loader;
//# sourceMappingURL=Loader.js.map