import dotenv = require('dotenv');

dotenv.config();

export const config = {
   cloudflare: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
      zoneId: process.env.CLOUDFLARE_ZONE_ID || '',
   },
   fqdn: process.env.FQDN || '',
   dnsRecord: process.env.DNS_RECORD || '',
};

// Vérification des variables essentielles
if (!config.cloudflare.apiToken || !config.cloudflare.zoneId) {
   throw new Error('Cloudflare API token and Zone ID are required in environment variables.');
}

if (!config.fqdn || !config.dnsRecord) {
   throw new Error('FQDN and DNS record are required in environment variables.');
}