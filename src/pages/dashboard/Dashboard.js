// style sheet
import './Dashboard.css';
import { useState } from "react";
import { useCollection } from '../../hooks/useCollection' // importing usecollection hook
import { useAuthContext } from '../../hooks/useAuthContext'   // authenticate user

import ProjectList from '../../components/ProjectList'; // project list component
import ProjectFilter from './ProjectFilter';            // filter component

const Dashboard = () => {
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState("all");  // variable to store current filter property
    const { user } = useAuthContext();
    // filter selection handler
    const changeFilter = newFilter => {
        setCurrentFilter(newFilter);
    }

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case "all":
                return true;

            case "mine":
                let assignedToMe = false;
                document.assignedUsersList.forEach((u) => {
                    if (u.id === user.uid) {
                        assignedToMe = true;
                    }
                });
                return assignedToMe;
            case "development":
            case "design":
            case "marketing":
            case "sales":
                return document.category === currentFilter;
            default:
                return true;
        }
    }) : null;

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error" >{error}</p>}
            {documents && (
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter} />
            )}
            {
                projects && <ProjectList projects={projects} />
            }
        </div>
    )
}

export default Dashboard
