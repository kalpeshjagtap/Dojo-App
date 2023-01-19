// style sheet
import './Create.css';
import Select from 'react-select';  // react-select functionalities
import { useEffect, useState } from 'react';     // react modules

import { useCollection } from '../../hooks/useCollection' // useCollection hook
import { timestamp } from '../../firebase/config';      // firebase timestamp
import { useAuthContext } from '../../hooks/useAuthContext';// authentication hook
import { useFirestore } from '../../hooks/useFirestore'; // document adding functionalities
import { useHistory } from 'react-router-dom';  // usehistorty hook

const Create = () => {
    // history hook
    const history = useHistory();
    // add documents
    const { addDocument, response } = useFirestore('projects');
    // form field values
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    // register users
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([]);

    // user who created the project
    const { user } = useAuthContext();

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return {
                    value: user,
                    label: user.displayName
                }
            })
            setUsers(options);
        }
    }, [documents])

    // project categories object array
    const categories = [
        { value: "development", label: "Development" },
        { value: "design", label: "Design" },
        { value: "sales", label: "Sales" },
        { value: "marketing", label: "Marketing" },
    ]
    // form submition handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!category) {
            setFormError('please select project category');
            return;
        }
        if (assignedUsers.length < 1) {
            setFormError('please assign project to atleast 1 user');
            return;
        }
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })
        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }
        await addDocument(project);
        if (!response.error) {
            history.push("/");
        }
    }
    return (
        <div className="create-form">
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Due Date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    {/* dropdown */}
                    <Select
                        onChange={option => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button className="btn">Add Project</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default Create;
