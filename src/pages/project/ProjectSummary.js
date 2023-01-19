import Avatar from '../../components/Avatar';// avatar component
import { useFirestore } from '../../hooks/useFirestore'; // delect document functionality
import { useAuthContext } from '../../hooks/useAuthContext' // user authentication
import { useHistory } from 'react-router-dom';
export default function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const history = useHistory();
    const handleClick = e => {
        deleteDocument(project.id);
        history.push("/");
    }
    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p>By : {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is Assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <abbr
                                style={{ backgroundColor: 'white', color: "black" }}
                                title={user.displayName}
                            >
                                <Avatar src={user.photoURL} />
                            </abbr>
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                <button className="btn" onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    )
}
