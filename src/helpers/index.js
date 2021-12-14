export const getNestedArray = (pages, parent) => {
    const result = [];
    for (const page of pages) {
        if (page.parent === parent) {
            const children = getNestedArray(pages, page.id);

            if (children.length) {
                page.nested = children;
            }

            result.push(page);
        }
    }
    return result;
};

export const generateRandomString = (len) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export const getPreview = (id) => {
    return id ? `http://i1.ytimg.com/vi/${id}/maxresdefault.jpg` : generateRandomString(5);
};

export const getVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
};
