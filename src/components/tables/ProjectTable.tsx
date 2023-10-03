import React from 'react'
import { useParams } from 'react-router-dom';
import AboutTable from './AboutTable';
import AgregatTable from './AgregatTable';

const ProjectTable:React.FC = () => {
    let { id } = useParams();
    let project = 0;
    if (id) project = parseInt(id)
    return (
        <div>
            {project !== 0 && <AboutTable id={project} />}
            {project !== 0 && <AgregatTable id={project} />}
        </div>
    )
}

export default ProjectTable