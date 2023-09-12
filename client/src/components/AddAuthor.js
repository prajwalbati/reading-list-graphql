import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddAuthor = ({ displayForm }) => {
    const [ bookData, setBookData ] = useState({
        name: "",
        genre: "",
        authorId: ""
    });
    const { loading, error, data} = useQuery(getAuthorsQuery);
    const [ addBook ] = useMutation(addBookMutation);
    const getAuthorsList = () => {
        if (loading) {
            return <option disabled>Loading Authors...</option>
        } else {
            return data.authors && data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>;
            });
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: bookData,
            refetchQueries: [{query: getBooksQuery}]
        });
    };

    return (
        <form id="add-author" onSubmit={submitForm} className={displayForm==='author'?``:`hidden`}>
            <div className="field">
                <label>Author Name:</label>
                <input type="text" onChange={(e) => setBookData({...bookData, name: e.target.value})} />
            </div>
            <div className="field">
                <label>Age:</label>
                <input type="text" onChange={(e) => setBookData({...bookData, genre: e.target.value})} />
            </div>
            <button type="submit">+</button>
        </form>
    );

};

export default AddAuthor;