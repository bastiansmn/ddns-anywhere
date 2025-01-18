import { IDynDnsProvider } from '../interfaces/IDynDNSProdvider';
import { resolve4 } from 'dns/promises';

export class NoIpDynDnsProvider implements IDynDnsProvider {
   async getIpFromFqdn(fqdn: string): Promise<string> {
      const records = await resolve4(fqdn);
      if (!records.length) {
         throw new Error(`No IP address found for FQDN: ${fqdn}`);
      }
      return records[0]; // Retourne la première IP trouvée
   }
}
