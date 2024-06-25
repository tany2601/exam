import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import LatexRender from './LatexRender'; // Import the LatexRender component

function ShowQuestionInModal({ questionData, handleClose }) {
  const {
    id,
    post_question_text,
    pre_question_text,
    question_image_url,
    option1_text,
    option2_text,
    option3_text,
    option4_text,
    option1_image_url,
    option2_image_url,
    option3_image_url,
    option4_image_url,
    pre_explanation_text,
    post_explanation_text,
    explanation_image_url,
    correct_option
  } = questionData;

  const getImageUrl = (url) => {
    const imageUrl = process.env.REACT_APP_IMAGE_URL;
    // console.log('REACT_APP_IMAGE_URL:', imageUrl); // Verify the environment variable
    if (!imageUrl) {
      console.error('REACT_APP_IMAGE_URL is not defined');
      return '';
    }
    const imgUrl = `${imageUrl}${url}`;
    // console.log(imgUrl);
    return imgUrl;
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Question id #{id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Pre Question Text:</p>
        <LatexRender content={pre_question_text} />
        <p>Post Question Text:</p>
        <LatexRender content={post_question_text} />
        <p>Question Image:</p>
        {question_image_url && <img src={getImageUrl(question_image_url.trim())} alt="QuestionImage" width='30%' />}
        <p>Option 1 Text:</p>
        {option1_text && (<LatexRender content={option1_text} />)}
        {option1_image_url && <img src={getImageUrl(option1_image_url.trim())} alt="Option1Image" width='30%' />}
        <p>Option 2 Text:</p>
        {option2_text && (<LatexRender content={option2_text} />)}
        {option2_image_url && <img src={getImageUrl(option2_image_url.trim())} alt="Option2Image" width='30%' />}
        <p>Option 3 Text:</p>
        {option3_text && (<LatexRender content={option3_text} />)}
        {option3_image_url && <img src={getImageUrl(option3_image_url.trim())} alt="Option3Image" width='30%' />}
        <p>Option 4 Text:</p>
        {option4_text && (<LatexRender content={option4_text} />)}
        {option4_image_url && <img src={getImageUrl(option4_image_url.trim())} alt="Option4Image" width='30%' />}
        <p>Correct Option:<b> {correct_option}</b></p>
        <p>Pre Explanation Text:</p>
        <LatexRender content={pre_explanation_text} />
        <p>Post Explanation Text:</p>
        <LatexRender content={post_explanation_text} />
        <p>Explanation Image:</p>
        {explanation_image_url && <img src={getImageUrl(explanation_image_url.trim())} alt="ExplanationImage" width='30%' />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowQuestionInModal;
