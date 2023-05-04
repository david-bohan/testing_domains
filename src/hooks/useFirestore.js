import { useReducer, useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "UPDATED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "ERROR":
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = collection(projectFirestore, collectionName);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  // add a document
const addDocument = async (docData) => {
  dispatch({ type: "IS_PENDING" });

  try {
    const createdAt = timestamp.fromDate(new Date());
    const addedDocument = await addDoc(ref, { ...docData, createdAt });
    dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    return addedDocument; // Add this line to return the added document
  } catch (err) {
    dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
  }
};


  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(ref, id));
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const documentRef = doc(ref, id);
      await updateDoc(documentRef, updates);
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: { id, ...updates } });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  const addSubcollectionDocument = async (parentId, subcollectionName, docData) => {
    dispatch({ type: "IS_PENDING" });
  
    try {
      const createdAt = timestamp.fromDate(new Date());
      const subcollectionRef = collection(doc(ref, parentId), subcollectionName);
      const addedDocument = await addDoc(subcollectionRef, { ...docData, createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  return { addDocument, deleteDocument, updateDocument, addSubcollectionDocument, response };
};
