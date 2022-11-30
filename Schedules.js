export class EvelScheduler {
    constructor() {
        /**
         * Schedules list
         */
        this.schedules = [];
    }

    addSchedule(id, expiresAt = 1000) {
        /**
         * We add schedule with timestamp , expires number if it not exists
         */
        if(this.getScheduler(id) != null)  throw new SyntaxError("[EvelScheduler/Ids] Scheduler already exists!");

        /**
         * Pushing schedule
         */
        this.schedules.push({id: id, timestamp: +new Date(), expiresAt: expiresAt});
    }
    setScheduleExpiresAt(id , expiresAt = 1000) {
         /**
         * Find schedule by Id
         */
        const schedule = this.getScheduler(id);
        /**
         * If couldnt find throw Logger message && id#1
         */
        if(schedule == null) throw new SyntaxError("[EvelScheduler/Ids] Couldn't find schedulerId");

        schedule.expiresAt = expiresAt;
    }
    getScheduler(id) {
        /**
         * Find schedule by Id
         */
        return this.schedules.find(sch => sch.id == id);
    }
    updateSchedule(id) {
        /**
         * Getting schedule
         */
        const schedule = this.getScheduler(id);
        
        /**
         * If couldnt find throw Logger message && id#2
         */
        if(schedule == null)  throw new SyntaxError("[EvelScheduler/Ids] Couldn't find schedulerId");

        /**
         * Updating timestamp
         */
        schedule.timestamp = +new Date();
    } 

    isScheduleExpired(id, requiresUpdate, cb = () => {}) {
        /**
         * Getting schedule
         */
        const schedule = this.getScheduler(id);

        /**
         * If couldnt find throw Logger message && id#3
         */
        if(schedule == null) throw new SyntaxError("[EvelScheduler/Ids] Couldn't find schedulerId");
        const now = +new Date();

        /**
         * If schedule expired do callback , check if need update then update.
         */
        if(now - schedule.timestamp > schedule.expiresAt) {
            if(requiresUpdate) schedule.timestamp = now;
            return cb;
        };
        /**
         * If nothing we return empty function
         */
        return () => {};
    }

    removeScheduler(id) {
        /**
         * Just a filter ^^
         */
        this.schedules = this.schedules.filter(sch => sch.id != id);
    }
}
