
export type ServiceItem = {
    title: string;
    description: string;
}

export const services = [
    {
        title: 'Wireless Design & Implementation',
        description: 'Wi-Fi networks built from the ground up with the purpose of overhauling existing Wi-Fi networks or adding Wi-Fi for the first time.'
    },
    {
        title: 'Device Installation & Support',
        description: 'Adding a fleet of new office or end user equipment to an existing Wi-Fi network.'
    },
    {
        title: 'Wi-Fi 7 Migrations',
        description: 'Designing, implementing, and/or upgrading a wireless network around the 6Ghz spectrum with Wi-Fi 7 technologies.'
    },
    {
        title: 'Network Support',
        description: 'Resolutions for when devices will not communicate with each other, the network, or the internet.'
    }
] as ServiceItem[];