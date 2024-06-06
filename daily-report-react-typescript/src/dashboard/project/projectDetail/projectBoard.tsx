

const ProjectBoard = () => {
    return (
        <>

            <div className="container kanban-baord mt-3">
                <div className="kanban-column">
                    <div className="kanban-column-title d-flex justify-content-between"><span>Backlog</span> <span>+</span>
                    </div>
                    <div className="kanban-task mt-2 " draggable="true">
                        Work on kanban
                    </div>
                </div>

                <div className="kanban-column">
                    <div className="kanban-column-title">To Do</div>
                    <div className="kanban-task mt-2" draggable="true">
                        Test the website
                    </div>
                </div>

                <div className="kanban-column">
                    <div className="kanban-column-title">In Progress</div>
                    <div className="kanban-task mt-2" draggable="true">
                        Work on kanban
                    </div>
                </div>

                <div className="kanban-column">
                    <div className="kanban-column-title">Completed</div>
                    <div className="kanban-task mt-2" draggable="true">
                        Work on kanban
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectBoard