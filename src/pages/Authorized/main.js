import React, { useState, useEffect } from 'react';
import api from '../.././api/axiosConfig'; // Konfiguracja Axios dla komunikacji z backendem
import { useTranslation } from 'react-i18next';

function Main() {
  // Stan do przechowywania różnych danych aplikacji
  const [tasks, setTasks] = useState([]); // Lista zadań
  const [taskTitle, setTaskTitle] = useState(''); // Tytuł zadania
  const [taskDescription, setTaskDescription] = useState(''); // Opis zadania
  const [taskDate, setTaskDate] = useState(''); // Data zadania
  const [category, setCategory] = useState(''); // Kategoria zadania
  const [responseMessage, setResponseMessage] = useState(''); // Wiadomość zwrotna dla użytkownika
  const [priority, setPriority] = useState('HIGH'); // Priorytet zadania
  const [isEditMode, setIsEditMode] = useState(false); // Tryb edycji zadania
  const [editTaskId, setEditTaskId] = useState(null); // ID zadania do edycji
  const [showArchived, setShowArchived] = useState(false); // Czy wyświetlać zadania zarchiwizowane
  const { t } = useTranslation(); // Funkcja tłumaczeń

  // Pobieranie zadań z backendu przy każdej zmianie stanu `showArchived`
  useEffect(() => {
    fetchTasks();
  }, [showArchived]);

  const fetchTasks = async () => {
    try {
      // Wybór odpowiedniego endpointu w zależności od trybu archiwalnego
      const endpoint = showArchived ? '/api/v1/GetArchivedTasks' : '/api/v1/GetTasks';
      const response = await api.get(endpoint);
      const formattedTasks = response.data.map((task) => ({
        ...task,
        dueDate: task.dueDate ? formatDate(task.dueDate) : '', // Formatowanie daty
      }));
      setTasks(formattedTasks); // Ustawienie zadań w stanie
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setResponseMessage('Failed to load tasks.'); // Obsługa błędu
    }
  };

  const formatDate = (dateString) => {
    // Formatowanie daty na format YYYY-MM-DD
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddTask = async () => {
    // Dodanie lub edycja zadania
    if (taskTitle && taskDescription && taskDate && category && priority) {
      try {
        const newTask = {
          title: taskTitle,
          description: taskDescription,
          category: category,
          priority: priority,
          dueDate: taskDate,
        };

        if (isEditMode) {
          // Jeśli tryb edycji, aktualizujemy zadanie
          await api.put(`/api/v1/EditTask/${editTaskId}`, newTask);
          setResponseMessage('Task updated successfully!');
          setIsEditMode(false); // Wyjście z trybu edycji
          setEditTaskId(null);
        } else {
          // Dodanie nowego zadania
          await api.post('/api/v1/AddTask', newTask);
          setResponseMessage('Task added successfully!');
        }

        resetForm(); // Resetowanie formularza
        fetchTasks(); // Odświeżenie listy zadań
      } catch (error) {
        console.error('Error saving task:', error);
        setResponseMessage('Failed to save task.');
      }
    } else {
      setResponseMessage('Please fill in all fields before saving a task.'); // Walidacja formularza
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Usuwanie zadania
    try {
      await api.delete(`/api/v1/DeleteTask/${taskId}`);
      setResponseMessage('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setResponseMessage('Failed to delete task.');
    }
  };

  const handleMarkAsDone = async (taskId) => {
    // Oznaczanie zadania jako zakończone
    try {
      await api.post(`/api/v1/MarkTaskAsDone/${taskId}`);
      setResponseMessage('Task marked as done successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error marking task as done:', error);
      setResponseMessage('Failed to mark task as done.');
    }
  };

  const handleArchiveTask = async (taskId) => {
    // Archiwizacja zadania
    try {
      await api.post(`/api/v1/ArchiveTask/${taskId}`);
      setResponseMessage('Task archived successfully!');
      fetchTasks();
    } catch (error) {
      console.error('Error archiving task:', error);
      setResponseMessage('Failed to archive task.');
    }
  };

  const handleEditTask = (task) => {
    // Przygotowanie formularza do edycji
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDate(task.dueDate);
    setCategory(task.category);
    setPriority(task.priority);
    setIsEditMode(true);
    setEditTaskId(task.id);
  };

  const resetForm = () => {
    // Resetowanie formularza do domyślnych wartości
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setCategory('');
    setPriority('HIGH');
    setIsEditMode(false);
    setEditTaskId(null);
  };

  const toggleArchivedView = () => {
    // Przełączanie widoku między zadaniami aktywnymi i archiwalnymi
    setShowArchived(!showArchived);
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '0 auto' }}>
      {/* Interfejs użytkownika z tłumaczeniami */}
      <h1>{t('main.title')}</h1>
      <h2>{t('main.addTask')}</h2>
      {/* Formularz do dodawania/edycji zadań */}
      <div>
        <label htmlFor="taskTitle">{t('main.labels.taskTitle')}:</label>
        <input
          type="text"
          id="taskTitle"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      {/* ... Kontynuacja renderowania formularza */}
    </div>
  );
}

export default Main;
