import Button from './Button'

const ProjectsSidebar = ({
  onStartAddProject,
  onSelectProject,
  selectedProjectId,
  projects,
}) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClassed =
            'w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'

          if (project.id === selectedProjectId) {
            cssClassed += ' bg-stone-800 text-stone-200'
          } else {
            cssClassed += ' text-stone-400'
          }

          return (
            <li key={project.id}>
              <button
                className={cssClassed}
                onClick={() => onSelectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default ProjectsSidebar
