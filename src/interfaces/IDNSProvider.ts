export interface IDnsProvider {
   updateRecord(recordName: string, ip: string): Promise<void>;
}