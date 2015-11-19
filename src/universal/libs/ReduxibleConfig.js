export default class ReduxibleConfig {
	consturctor(options = {}) {
		this.server = options.server;
		this.development = options.development;
		this.universal = options.universal;
		this.devTools = options.devTools;
	}

	setServer(server) {
		this.server = server;
		return this;
	}

	isServer() {
		return this.server;
	}

	setDevelopment(development) {
		this.development = development;
		return this;
	}

	isDevelopment() {
		return this.development;
	}

	setUniversal(universal){
		this.universal = universal;
		return this;
	}

	isUniversal() {
		return this.universal;
	}

	setDevTools(devTools) {
		this.devTools = devTools;
		return this;
	}

	useDevTools() {
		return this.devTools;
	}
}