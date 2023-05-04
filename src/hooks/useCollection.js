import { useEffect, useState, useRef } from "react";
import { collection, query, where, orderBy, onSnapshot, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

export const useCollection = (_collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let q = query(collection(projectFirestore, _collection));

    if (queryRef) {
      q = query(q, where(...queryRef));
    }
    if (orderByRef) {
      q = query(q, orderBy(...orderByRef));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((docSnapshot) => {
          results.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [_collection, queryRef, orderByRef]);

  return { documents, error };
};
