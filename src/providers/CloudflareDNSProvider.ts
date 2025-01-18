import { IDnsProvider } from '../interfaces/IDNSProvider';
import axios from 'axios';

interface CloudflareConfig {
   apiToken: string;
   zoneId: string;
}

export class CloudflareDnsProvider implements IDnsProvider {
   private config: CloudflareConfig;

   constructor(config: CloudflareConfig) {
      this.config = config;
   }

   async updateRecord(recordName: string, ip: string): Promise<void> {
      const url = `https://api.cloudflare.com/client/v4/zones/${this.config.zoneId}/dns_records`;

      const response = await axios.get(url, {
         headers: { Authorization: `Bearer ${this.config.apiToken}` },
      });

      const record = response.data.result.find(
         (r: any) => r.name === recordName && r.type === 'A'
      );

      if (!record) {
         throw new Error(`DNS record not found for ${recordName}`);
      }

      if (record.content === ip) {
         console.log(`Record for ${recordName} is already up-to-date.`);
         return;
      }

      await axios.put(
         `${url}/${record.id}`,
         { type: 'A', name: recordName, content: ip },
         { headers: { Authorization: `Bearer ${this.config.apiToken}` } }
      );

      console.log(`Updated DNS record for ${recordName} to IP: ${ip}`);
   }
}
