export const updatedObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties,
    };
};
