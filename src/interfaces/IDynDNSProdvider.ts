export interface IDynDnsProvider {
   getIpFromFqdn(fqdn: string): Promise<string>;
}
