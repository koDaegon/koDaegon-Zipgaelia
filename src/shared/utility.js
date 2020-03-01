export const updatedObject = (state, updatedValues) => {
    return {
        ...state,
        ...updatedValues
    }
}