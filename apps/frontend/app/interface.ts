interface Odds {
	betId: number;
	betName: string;
	bookmakerCode: string;
	odds: string;
	oddsDecimal: string;
}

interface Bet {
	displayName: string;
	odds: Odds[];
	marketId: number;
}

interface Bookmaker {
	bookmakerCode: string;
	bookmakerName: string;
}

export interface Market {
	displayName: string;
	bets: Bet[];
	bookmakers: Bookmaker[];
	marketId: number;
}
