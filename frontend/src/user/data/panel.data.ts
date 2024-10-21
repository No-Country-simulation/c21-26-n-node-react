import { Panel, PanelRole } from "../../shared/models/panel";

export const panels: Panel[] = [
  {
    title: 'Lista de Estudiantes',
    desc:'Revisa tu lista de estudiantes asignados.',
    link:'#',
    role: PanelRole.TEACHER
  },
  {
    title: 'Lista de Asignaturas',
    desc:'Ver y gestionar las asignaturas asignadas.',
    link:'#',
    role: PanelRole.TEACHER
  },
  {
    title: 'Gestión de Calificaciones',
    desc:'Subir y revisar las calificaciones de los estudiantes.',
    link:'#',
    role: PanelRole.TEACHER
  },
  {
    title: 'Contenido personalizado',
    desc:'Ver y gestionar el contenido impartido a los estudiantes.',
    link:'#',
    role: PanelRole.TEACHER
  },
  {
    title: 'Mis Calificaciones',
    desc:'Revisa tu calificaciones de cada asignatura.',
    link:'#',
    role: PanelRole.STUDENT
  },
  {
    title: 'Asignaciones pendientes',
    desc:'Ver las tareas y trabajos pendientes.',
    link:'#',
    role: PanelRole.STUDENT
  },
  {
    title: 'Lista de contenido',
    desc:'Revisa el contenido pensado para ti.',
    link:'#',
    role: PanelRole.STUDENT
  },
  {
    title: 'Progreso académico',
    desc:'Revisar el progreso académico de sus hijos.',
    link:'#',
    role: PanelRole.PARENT
  },
  {
    title: 'Reuniones y Comunicaciones',
    desc:'Consultar reuniones y mensajes importantes.',
    link:'#',
    role: PanelRole.PARENT
  },

]