import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Component.css'; // Import your CSS file

const QuestionSelectionPage = ({
  setSelectedYearId,
  setSelectedSubjectId,
  setSelectedChapterId,
  setSelectedTopicId,
  setSelectedExamId
}) => {
  const [topicName, setTopicName] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [topics, setTopics] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');

  const baseUrl = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(`${baseUrl}/years`);
        setYears(response.data);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    fetchYears();
  }, [baseUrl]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedYear) {
        try {
          const response = await axios.get(`${baseUrl}/subjects?yearId=${selectedYear}`);
          setSubjects(response.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      }
    };

    fetchSubjects();
  }, [selectedYear, baseUrl]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedSubject) {
        try {
          const response = await axios.get(`${baseUrl}/chapters?subjectId=${selectedSubject}`);
          setChapters(response.data);
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      }
    };

    fetchChapters();
  }, [selectedSubject, baseUrl]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedChapter) {
        try {
          const response = await axios.get(`${baseUrl}/topics?chapterId=${selectedChapter}`);
          setTopics(response.data);
        } catch (error) {
          console.error('Error fetching topics:', error);
        }
      }
    };

    fetchTopics();
  }, [selectedChapter, baseUrl]);

  // Fetch exam names
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${baseUrl}/exams`);
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, [baseUrl]);

  // Call callback functions to update selected filter IDs
  useEffect(() => {
    setSelectedYearId(selectedYear);
  }, [selectedYear, setSelectedYearId]);

  useEffect(() => {
    setSelectedSubjectId(selectedSubject);
  }, [selectedSubject, setSelectedSubjectId]);

  useEffect(() => {
    setSelectedChapterId(selectedChapter);
  }, [selectedChapter, setSelectedChapterId]);

  useEffect(() => {
    setSelectedTopicId(topicName);
  }, [topicName, setSelectedTopicId]);

  useEffect(() => {
    setSelectedExamId(selectedExam);
  }, [selectedExam, setSelectedExamId]);

    // Disable subject, chapter, and topic when year changes
    useEffect(() => {
      setSelectedSubject('');
      setSelectedChapter('');
      setTopicName('');
    }, [selectedYear]);

  return (
    <div className='selectFilterContainer'>
      <h5 className='selectHeading'>Select filter</h5>
      <div>
        <div className="selectHolder">
        <div className='selectDiv'>
          <div htmlFor="yearSelect" >Year</div>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year.year_id} value={year.year_id}>
                {year.year_name}
              </option>
            ))}
          </select>
        </div>
        <div className='selectDiv'>
          <div>Subject</div>
          <select
            id="subjectSelect"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
            disabled={!selectedYear}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.subject_id} value={subject.subject_id}>
                {subject.subject_name}
              </option>
            ))}
          </select>
        </div>
        <div className='selectDiv'>
          <div >Chapter</div>
          <select
            id="chapterSelect"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            required
            disabled={!selectedSubject}
          >
            <option value="">Select Chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter.chapter_id} value={chapter.chapter_id}>
                {chapter.chapter_name}
              </option>
            ))}
          </select>
        </div>
        
        <div className='selectDiv'>
          <div >Topic</div>
          <select
            id="topicSelect"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            required
            disabled={!selectedChapter}
          >
            <option value="">Select Topic</option>
            {topics.map((topic) => (
              <option key={topic.topic_id} value={topic.topic_id}>
                {topic.topic_name}
              </option>
            ))}
          </select>
        </div>
        <div className='selectDiv'>
          <div>Exam</div>
          <select
            id="examSelect"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            required
          >
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.exam_id} value={exam.exam_id}>
                {exam.exam_name}
              </option>
            ))}
          </select>
        </div>
        <div className='selectDiv'>

        </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSelectionPage;
