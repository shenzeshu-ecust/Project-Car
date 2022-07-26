class Events {
	constructor() {
		this.events = {};
		this.datas = {}
	}

	subscribe(event, callback) {
		if (this.datas[event]) {
			//如果已经有了数据，直接执行
			callback && callback(...this.datas[event]);
			return;
		}
		if (this.events[event]) {
			this.events[event].push(callback);
		} else {
			this.events[event] = [callback]
		}
	}

	publish(event) {
		let args = Array.prototype.slice.call(arguments,1);
		this.datas[event] = args;
		const subscribedEvents = this.events[event];

		if (subscribedEvents && subscribedEvents.length) {
			subscribedEvents.forEach(callback => {
				callback.call(this, ...args);
			});
		}
	}

	unsubscribe(event, callback) {
		if (!callback) { //如果没有callback，直接删除所有
			delete this.events[event];
			delete this.datas[event];
		}
		// 删除某个订阅，保留其他订阅
		const subscribedEvents = this.events[event];
		if (subscribedEvents && subscribedEvents.length) {
			this.events[event] = this.events[event].filter(cb => cb !== callback)
		}
	}
}

export default new Events();
