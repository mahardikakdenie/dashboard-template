export const getDomain = (companyName: string) => {
    return `https://${companyName.split(' ').join("-").toLowerCase()}.mahardikakdenie.my.id`;
};
