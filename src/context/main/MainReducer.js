export const mainReducer = (state, action) => {
    switch (action.type) {
        case "SET_ALL_ITEMS":
            return {
                ...state,
                items: action.payload.items
            }
        case "CLEAR_ITEM":
            let tempItem = {
                description: '',
                comment: '',
                rating: '',
                imageURL: '',
                photographer: '',
                }
            return {
                ...state,
                tempItem: tempItem
            }
        case "ONCHANGE_NAME":
            return {
                ...state,
                tempItem: action.payload
        }    
        case "ONCHANGE_GREETING":
            return {
                ...state,
                tempItem: action.payload
        }    
        case "ONCHANGE_FILE":
            return {
                ...state,
                tempItem: action.payload
        }
        default:
            return state
    }
}

// END of document
