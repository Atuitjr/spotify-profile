"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const macro_1 = __importDefault(require("styled-components/macro"));
const media_1 = __importDefault(require("./media"));
const Main = macro_1.default.main `
	width: 100%;
	margin: 0 auto;
	max-width: 1400px;
	min-height: 100vh;
	padding: 80px;
	${media_1.default.desktop `
    padding: 60px 50px;
  `};
	${media_1.default.tablet `
    padding: 50px 40px;
  `};
	${media_1.default.phablet `
    padding: 30px 25px;
  `};
	h2 {
		${media_1.default.tablet `
      text-align: center;
    `};
	}
`;
exports.default = Main;
//# sourceMappingURL=Main.js.map