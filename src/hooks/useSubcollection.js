import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

export const useSubcollection = (parentCollection, parentId, subcollection, subId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(projectFirestore, parentCollection, parentId, subcollection, subId);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("no such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    return () => unsubscribe();
  }, [parentCollection, parentId, subcollection, subId]);

  return { document, error };
};
