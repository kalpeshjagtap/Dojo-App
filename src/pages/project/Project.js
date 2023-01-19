// import style sheet
import './Project.css';
import { useParams } from 'react-router-dom'; // react-router-dom useparams hook
import { useDocument } from '../../hooks/useDocument'    // document hook
import ProjectSummary from './ProjectSummary';  // summary component
import ProjectComment from './ProjectComment';

const Project = () => {
    const { id } = useParams();
    const { document, error } = useDocument('projects', id);
    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading ...</div>
    }
    return (
        <div className="project-details">
            <ProjectSummary project={document} />
            <ProjectComment project={document} />
        </div>
    )
}

export default Project
