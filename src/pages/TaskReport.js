import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import { useTranslation } from 'react-i18next';

function TaskReport() {
  const [reportData, setReportData] = useState({
    allTasks: 0, // Liczba wszystkich zadań
    inProgress: 0, // Liczba zadań w trakcie realizacji
    overdue: 0, // Liczba zaległych zadań
    completedOnTime: 0, // Liczba zadań zakończonych na czas
  });
  const [responseMessage, setResponseMessage] = useState(''); // Wiadomość zwrotna dla użytkownika
  const { t } = useTranslation(); // Hook do obsługi tłumaczeń

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Pobieranie raportu z backendu
        const response = await api.get('/api/v1/GetTaskReport');
        const data = response.data;

        // Ustawienie danych raportu, upewniając się, że pola nie są puste
        setReportData({
          allTasks: data.allTasks || 0,
          inProgress: data.inProgress || 0,
          overdue: data.overdue || 0,
          completedOnTime: data.completedOnTime || 0,
        });
        setResponseMessage(''); // Czyszczenie wiadomości o błędach
      } catch (error) {
        console.error('Error fetching task report:', error); // Logowanie błędu w konsoli
        setResponseMessage(t('report.errors.fetchFailed')); // Ustawienie wiadomości o błędzie
      }
    };

    fetchReport(); // Wywołanie funkcji fetchReport podczas montowania komponentu
  }, [t]); // Efekt zależny od tłumaczeń (gdyby zmieniono język)

  return (
    <div className="TaskReport" style={{ textAlign: 'center', margin: '0 auto' }}>
      <h1>{t('report.title')}</h1>
      {/* Wyświetlanie wiadomości o błędzie, jeśli wystąpi */}
      {responseMessage && <p className="error-message">{responseMessage}</p>}
      <div>
        {/* Wyświetlanie danych raportu */}
        <p>
          <strong>{t('report.allTasks')}:</strong> {reportData.allTasks}
        </p>
        <p>
          <strong>{t('report.inProgress')}:</strong> {reportData.inProgress}
        </p>
        <p>
          <strong>{t('report.overdue')}:</strong> {reportData.overdue}
        </p>
        <p>
          <strong>{t('report.completedOnTime')}:</strong> {reportData.completedOnTime}
        </p>
        {/* Wyświetlanie dodatkowych informacji i obliczeń */}
        <p>
          <strong>
            <em>{t('report.Message1')} </em> {reportData.completedOnTime} <em>{t('report.z')} </em>{' '}
            {reportData.allTasks} <em>{t('report.Message2')} </em>
          </strong>
        </p>
        <p>
          <strong>
            <em>{t('report.Message3')} </em>
            {/* Obliczanie procentu zadań ukończonych na czas */}
            {reportData.allTasks > 0
              ? ((reportData.completedOnTime / reportData.allTasks) * 100).toFixed(0)
              : 0}
            % {t('report.Message4')}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default TaskReport;
