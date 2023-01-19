import { useEffect, useState } from 'react';  // react functionalities
import { projectFirestore } from "../firebase/config"; // firebase firestorr

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null);    // variable use to store the data
    const [error, setError] = useState(null);           // variable use to store error info


    //  realtime data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id);

        const unsubscribe = ref.onSnapshot(snapshot => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id });
                setError(null);
            }
            else {
                setError("Project doesn't exist");
            }
        }, (error) => {
            console.log(error.message);
            setError('Failed to get Document');
        });

        return () => unsubscribe();

    }, [collection, id]);

    return { document, error }
};