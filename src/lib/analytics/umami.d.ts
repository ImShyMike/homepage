export interface StatValue {
	value: number;
	prev: number;
}

export interface UmamiStats {
	pageviews: StatValue;
	visitors: StatValue;
	visits: StatValue;
	bounces: StatValue;
	totaltime: StatValue;
}
