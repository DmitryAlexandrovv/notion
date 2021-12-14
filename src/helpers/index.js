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
