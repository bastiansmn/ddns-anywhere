import { CloudflareDnsProvider } from './providers/CloudflareDNSProvider';
import { NoIpDynDnsProvider } from './providers/NoIPDynDNSProvider';
import { DnsUpdater } from './services/DNSUpdater';
import { config } from './config/config';

async function main() {
   const dnsProvider = new CloudflareDnsProvider(config.cloudflare);
   const dynDnsProvider = new NoIpDynDnsProvider();

   const updater = new DnsUpdater(
      dnsProvider,
      dynDnsProvider,
      config.fqdn,
      config.dnsRecord
   );

   await updater.updateDns();
}

main().catch((err) => console.error(err));