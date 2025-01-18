import { IDnsProvider } from '../interfaces/IDNSProvider';
import { IDynDnsProvider } from '../interfaces/IDynDNSProdvider';

export class DnsUpdater {
   private dnsProvider: IDnsProvider;
   private dynDnsProvider: IDynDnsProvider;
   private fqdn: string;
   private dnsRecord: string;

   constructor(
      dnsProvider: IDnsProvider,
      dynDnsProvider: IDynDnsProvider,
      fqdn: string,
      dnsRecord: string
   ) {
      this.dnsProvider = dnsProvider;
      this.dynDnsProvider = dynDnsProvider;
      this.fqdn = fqdn;
      this.dnsRecord = dnsRecord;
   }

   async updateDns(): Promise<void> {
      try {
         const ip = await this.dynDnsProvider.getIpFromFqdn(this.fqdn);
         console.log(`IP for ${this.fqdn} is ${ip}`);
         await this.dnsProvider.updateRecord(this.dnsRecord, ip);
      } catch (error) {
         console.error('Error updating DNS:', error);
      }
   }
}