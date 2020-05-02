export const reducer = (state, action) => {
  switch (action.type) {
		case 'SET_RESULTS': {
			return {
				data: action.data
			};
    }
    case 'SET_CARDS': {
			return {
				cards: action.cards
			};
		}
      default:
        return state
    }
  }