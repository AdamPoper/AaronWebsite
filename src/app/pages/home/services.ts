export type ServiceItem = {
    title: string;
    description: string;
}

export const services = [
    {
        title: 'Wireless Design & Implementation',
        description: 'Need a new wireless system? We offer Wi-Fi and IoT networks that are designed around your RF environment. We will perform spectrum analysis to identify interference sources and protocol analysis for neighboring wireless networks. During implementation, we will adhere to any architectural and aesthetic requirements.'
    },
    {
        title: 'Post-Deployment WLAN Support',
        description: 'We will not be hands-off until all agreed upon devices are connected and verifiably working. All deployments include post-deployment validation, but ongoing WLAN support for any duration is negotiable per Managed Services agreement.'
    },
    {
        title: 'Economical Wi-Fi and IoT',
        description: 'Looking to save on labor costs? We will conduct a site survey and source all materials. Installation will be completed by you upon your request. Post-deployment validation is negotiable.'
    },
    {
        title: 'Managed Services',
        description: 'All equipment you purchased is yours and no monthly fee is required to maintain connectivity. If you want us to handle the support, device management is available for a monthly fee. This includes firmware upgrades, network monitoring, adaptive channel plans, and more. You will not be locked out of these features should you not want Managed Services.'
    },
    {
        title: 'Home Office',
        description: 'Need better home office Wi-Fi? Are you in conference calls while your kids are streaming HD video? We can optimize your current wireless setup or replace it altogether! With varying channel widths, channel assignment, bands, and custom SSIDs, nothing is impossible.'
    }
] as ServiceItem[];
