import './ProjectList.css'; // styles
import { Link } from 'react-router-dom'; // react-router-dom link component
import Avatar from './Avatar';      // avatar component

export default function ProjectList({ projects }) {
    return (
        <div className="project-list">
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by {project.dueDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        {/* <p><strong>Assigned to:</strong></p> */}
                        <ul>
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoURL}>
                                    <abbr
                                        style={{ background: 'transparent', color: "black" }}
                                        title={user.displayName}
                                    >
                                        <Avatar src={user.photoURL} />
                                    </abbr>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
