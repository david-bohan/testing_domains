import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';

function Create() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore('websites');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
    };
    const website = {
      name,
      details,
      createdBy,
    };
    try {
      const docRef = await addDoc(collection(projectFirestore, 'websites'), website);
      console.log('Document written with ID: ', docRef.id);
      navigate(`/websites/${docRef.id}`);
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Business Names</span>
          <input required type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Business Domain</span>
          <input required type="text" onChange={(e) => setDetails(e.target.value)} value={details} />
        </label>
        <button>Create Website</button>
      </form>
    </div>
  );
}

export default Create;

