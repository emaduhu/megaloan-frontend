export interface Reconciliation {
	id: number;
	totalGepgTxns: number;
	totalTpdcTxns:number;
	reconciledTpdcGepgTxns:number;
	trxnsInTpdcNotInGepg:number;
	trxnsInGepgNotInTpdc:number;
	trxnsInGepgOnly:number;
	trxnsInTpdcOnly:number;
	totalUnReconciledTxns:number;
	updatedAt: string;
	createdAt: string;
}