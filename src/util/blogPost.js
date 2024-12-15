export const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert(url)
};
export const handleShareFacebook = (url) => {
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    window.open(facebookUrl, '_blank');
};

export const handleShareWhatsApp = (url) => {
    const whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(url);
    window.open(whatsappUrl, '_blank');
};