const EventEmitter = require('events');
const path = require('path');
const PromiseSerial = require('promise-serial');

const defaultSettings = {
    pipeline: []
};

class Runner extends EventEmitter {
    constructor(settings = {}) {
        super();

        this.settings = Object.assign({}, defaultSettings, settings);
        this.eventsToWait = [];
    }

    waitForEvent(ev) {
        this.eventsToWait.push(ev);
    }

    getTasks(pipeline) {
        return pipeline.map(t => {
            let name;
            let fn;
            let args;

            if (Array.isArray(t)) {
                name = typeof t[0] === 'string' ? t[0] : null;
                fn = typeof name === 'string' ? t[1] : t[0];
                args = typeof name === 'string' ? t.slice(2) : t.slice(1);
            } else if (typeof t === 'function') {
                name = t.name;
                fn = t;
                args = [];
            } else {
                throw new Error(`Unsupported pipeline type ${t}`);
            }

            args.push(this);

            return { name, fn, args };
        });
    }

    getEventsPromises(events) {
        return events.map(
            ev =>
                new Promise(resolve =>
                    this.on(ev, () => {
                        const eventIndex = this.eventsToWait.indexOf(ev);
                        this.eventsToWait.splice(eventIndex, 1);

                        return resolve();
                    })
                )
        );
    }

    run() {
        const pipeline = this.settings.pipeline.slice();
        const tasks = this.getTasks(pipeline);
        const tasksSerial = tasks.map((t, i) => () => {
            console.log(`Running pipeline function #${i + 1} ${t.name || ''}`);
            return Promise.resolve(t.fn(...t.args));
        });

        return new Promise((resolve, reject) => {
            const startTime = new Date();
            const promises = PromiseSerial(tasksSerial)
                .then(() => {
                    const endTime = new Date();
                    const seconds =
                        (endTime.getTime() - startTime.getTime()) / 1000;

                    console.log(`Pipeline finished after ${seconds} seconds`);

                    if (this.eventsToWait.length) {
                        console.log(
                            `Waiting for the following events after the tasks have ran: ${this
                                .eventsToWait}`
                        );
                    }

                    const waitEventsPromises = this.getEventsPromises(
                        this.eventsToWait
                    );

                    return Promise.all(waitEventsPromises);
                })
                .catch(reject);
        });
    }
}

module.exports = { Runner };
