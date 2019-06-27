import axios from "axios";

import {
  CREATE_JOURNAL,
  UPDATE_JOURNAL,
  DELETE_JOURNAL,
  GET_JOURNAL,
  JOURNAL_LOADING,
  GET_JOURNALS,
  JOURNALS_LOADING
} from "./types";

import { GET_ERRORS } from "./types";

// Create Journal
export const createJournal = journalData => dispatch => {
  console.log("I'm in")
  axios
    .post("/api/journals/create", journalData)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: CREATE_JOURNAL,
        payload: res.data
      })
    }
    )
    //   .catch(err => console.log(err));
    .catch(error => {
      const { data } = error.response;
      dispatch({
        type: GET_ERRORS,
        payload: data
      })
    }
    );

};

// Update Journal
export const updateJournal = journalData => dispatch => {
  axios
    .patch("/api/journals/update", journalData)
    .then(res =>
      dispatch({
        type: UPDATE_JOURNAL,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete Journal
export const deleteJournal = id => dispatch => {
  axios
    .delete(`/api/journals/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_JOURNAL,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Get specific journal by id
export const getJournal = id => dispatch => {
  dispatch(setJournalLoading());
  axios
    .get(`/api/journals/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOURNAL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOURNAL,
        payload: null
      })
    );
};

// Get all journals for specific user
export const getJournals = () => dispatch => {
  dispatch(setJournalsLoading());
  axios
    .get("/api/journals")
    .then(res =>
      dispatch({
        type: GET_JOURNALS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOURNALS,
        payload: null
      })
    );
};

// Journal loading
export const setJournalLoading = () => {
  return {
    type: JOURNAL_LOADING
  };
};

// Journals loading
export const setJournalsLoading = () => {
  return {
    type: JOURNALS_LOADING
  };
};
