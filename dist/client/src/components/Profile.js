"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const router_1 = require("@reach/router");
const macro_1 = __importDefault(require("styled-components/macro"));
const theme_1 = __importDefault(require("../styles/theme"));
const media_1 = __importDefault(require("../styles/media"));
const Nav_1 = __importDefault(require("./Nav"));
const User_1 = __importDefault(require("./User"));
const SiteWrapper = macro_1.default.div `
	padding-left: ${theme_1.default.navWidth};
	${media_1.default.tablet `
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;
const Profile = () => (react_1.default.createElement(SiteWrapper, null,
    react_1.default.createElement(Nav_1.default, null),
    react_1.default.createElement(router_1.Router, { primary: false },
        react_1.default.createElement(User_1.default, { path: "/" }))));
exports.default = Profile;
//# sourceMappingURL=Profile.js.map