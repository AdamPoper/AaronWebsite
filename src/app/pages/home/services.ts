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
        title: 'Network Access Security',
        description: 'We offer a cloud based RADIUS server that integrates Microsoft 365 Business Premium user credentials directly with your Wi-Fi access. No need to change Wi-Fi passwords every time your headcount is reduced. Users can get on your network using their 365 username and password.'
    }
] as ServiceItem[];
