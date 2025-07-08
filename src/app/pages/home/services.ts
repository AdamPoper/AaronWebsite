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
        title: 'Post-Deployment Network Support',
        description: 'Even after a deployment, we are not hands-off until all devices are functional on the network.'
    },
    {
        title: 'In-Wall Hospitality Deployments',
        description: 'Wireless access points with built in LAN ports to service small deployments or office rooms. These in-wall units sit low with a discrete profile.'
    },
    {
        title: 'Managed Networks',
        description: 'Ongoing network support at an affordable price.'
    }
] as ServiceItem[];
