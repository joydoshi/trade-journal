import {
  CREATE_JOURNAL,
  UPDATE_JOURNAL,
  DELETE_JOURNAL,
  GET_JOURNAL,
  JOURNAL_LOADING,
  GET_JOURNALS,
  JOURNALS_LOADING
} from "../actions/types";

const initialState = {
  journals: [],
  journal: [],
  journalLoading: false,
  journalsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_JOURNAL:
      return {
        ...state,
        journals: [action.payload, ...state.journals]
      };
    case UPDATE_JOURNAL:
      let index = state.journals.findIndex(
        journal => journal._id === action.payload._id
      );

      state.journals.splice(index, 1);

      return {
        ...state,
        journals: [action.payload, ...state.journals]
      };
    case DELETE_JOURNAL:
      return {
        ...state,
        journals: state.journals.filter(
          journal => journal._id !== action.payload
        )
      };
    case GET_JOURNAL:
      return {
        ...state,
        journal: action.payload,
        journalLoading: false
      };
    case GET_JOURNALS:
      return {
        ...state,
        journals: action.payload,
        journalsLoading: false
      };
    case JOURNAL_LOADING:
      return {
        ...state,
        journalLoading: true
      };
    case JOURNALS_LOADING:
      return {
        ...state,
        journalsLoading: true
      };
    default:
      return state;
  }
}
