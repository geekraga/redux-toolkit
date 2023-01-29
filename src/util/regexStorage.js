export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePicture({ extension, imageSize }) {
    return ((['bmp', 'gif', 'png', 'jpg', 'jpeg'].indexOf(extension) > -1) && (imageSize < 40000000));
}

export function validateVideo(extension, videoSize) {
    return (
      (['webm', 'mkv', 'flv', 'mov', 'mp4', 'mpg', '3gp', 'avi', 'wmv', 'm4v'].indexOf(extension) > -1)
      &&
      (videoSize < 1000000000)
    );
}

export function validateUrl(url) {
    const re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
    return re.test(url);
}

export function fixUrl(s) {
    if (!s.match(/^[a-zA-Z]+:\/\//)) {
        return `http://${s}`;
    }
    return s;
}

export function validatePostalCode(postalCode) {
    if (!postalCode) return true;
    const re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return re.test(postalCode);
}


