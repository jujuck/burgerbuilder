export const updateObject = (oldObject, oldProperties) => {
    return {
        ...oldObject,
        ...oldProperties
    };
};

export default updateObject;