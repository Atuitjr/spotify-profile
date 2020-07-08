"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v,
				});
		  }
		: function (o, v) {
				o["default"] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const LoginScreen_1 = __importDefault(require("./LoginScreen"));
const macro_1 = __importDefault(require("styled-components/macro"));
const AppContainer = macro_1.default.div`
	height: 100%;
	min-height: 100vh;
`;
class App extends react_1.Component {
	constructor() {
		super(...arguments);
		this.state = {
			token: "",
		};
	}
	componentDidMount() {}
	render() {
		const { token } = this.state;
		return react_1.default.createElement(
			AppContainer,
			null,
			token
				? null
				: react_1.default.createElement(LoginScreen_1.default, null)
		);
	}
}
exports.default = App;
//# sourceMappingURL=App.js.map