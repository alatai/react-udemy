import { useState } from 'react'

import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import ProjectsSidebar from './components/ProjectsSidebar'
import SelectedProject from './components/SelectedProject'

const App = () => {
  const [projectState, setProjectState] = useState({
    selectProjectId: undefined,
    projects: [],
    tasks: [],
  })

  const handleAddTask = (text) => {
    setProjectState((prevState) => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectProjectId,
        id: taskId,
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: projectState.tasks.filter((task) => task.id !== id),
      }
    })
  }

  const handleSelectProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectProjectId: id,
      }
    })
  }

  const handleStartAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        // 正在添加一个新项目的信号
        selectProjectId: null,
      }
    })
  }

  const handleCancelAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectProjectId: undefined,
      }
    })
  }

  const handleAddProject = (projectData) => {
    setProjectState((prevState) => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectProjectId: undefined,
        projects: projectState.projects.filter(
          (project) => project.id !== prevState.selectProjectId
        ),
      }
    })
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectProjectId
  )

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  )

  if (projectState.selectProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    )
  } else if (projectState.selectProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectProjectId}
      />
      {content}
    </main>
  )
}

export default App
