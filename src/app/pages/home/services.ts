export type ServiceItem = {
    title: string;
    description: string;
}

export const services = [
    {
        title: 'Secure Passwordless Wi-Fi',
        description: 'Eliminate credential theft by going passwordless with Microsoft Entra. Seamlessly integrate your M365 user base with your Wi-Fi. Revoke user access immediately during off-boarding. Need hardware? We will custom-configure an enterprise-ready router in our lab and ship it directly to you! Firmware updates and support are included in your subscription.'
    },
    {
        title: 'Secure User Device',
        description: 'The new network perimeter has become the end-user device. We deploy lightweight, globally intelligent security directly to your workstations and laptops. Automatically quarantine compromised devices and block malicious links to keep your business safe. Expect weekly threat defense reports so you can see exactly how your business is being protected.'
    },
    {
        title: 'Wi-Fi Implementation',
        description: 'Invest in a distributed wireless system that connects all areas of your small office, clinic, or storefront. We have you covered with outdoor, guest, and business ready Wi-Fi access with the latest security in mind. Full-service installation available exclusively across the Greater Reading, PA area.'
    }
] as ServiceItem[];
