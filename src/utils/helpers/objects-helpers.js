export const updateObjectInArray = (items, itemId, objectPropertyName, newObjProperty) =>  {

    return items.map ( (u) => {
        if (u[objectPropertyName] === itemId) {
            return {...u, ...newObjProperty}
        }
        return u;
    })
}