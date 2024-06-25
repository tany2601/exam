import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './App.css';
// import QuestionSelectionPage from './QuestionSelectionPage';
import QuestionSelectionPage from './QuestionSelectionPage';
import ShowQuestionInModal from './showQuestionInModal';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../Card'

// import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

import { ToastContainer, toast, Slide } from 'react-toastify';

const baseUrl = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const endpoint = '/api/question';


// Define the endpoint
const endpointsave = '/saveImage';

const UploadQuestions = () => {
  const [userId, setuserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const userId = localStorage.getItem('userId');
    setuserId(userId);
    // console.log('userid in upload', userId);

    // if (!userId) {
    //   navigate('/login');
    // }

    // if (!accessToken) {
    //   navigate('/login');
    // }
  }, [navigate]);

  const textareaRef = useRef(null);
  const textareaRef1 = useRef(null);
  const textareaRef2 = useRef(null);
  const textareaRef3 = useRef(null);

  const [selectedYearId, setSelectedYearId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [selectedExamId, setSelectedExamId] = useState('');

  const [conceptualError, setConceptualError] = useState(false);
  const [alignmentError, setAlignmentError] = useState(false);
  const [deletedSyllabus, setDeletedSyllabus] = useState(false);

  const [difficultyLevel, setDifficultyLevel] = useState('');

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [modalQuestionData, setModalQuestionData] = useState(null);



  // const handleDifficultyChange = (event) => {
  //   setDifficultyLevel(event.target.value);
  // };

  const [preQuestionText, setPreQuestionText] = useState('');
  const [questionImageUrl, setQuestionImageUrl] = useState('');
  const [postQuestionText, setPostQuestionText] = useState('');
  const [option1Text, setOption1Text] = useState('');
  const [option1ImageUrl, setOption1ImageUrl] = useState('');
  const [option2Text, setOption2Text] = useState('');
  const [option2ImageUrl, setOption2ImageUrl] = useState('');
  const [option3Text, setOption3Text] = useState('');
  const [option3ImageUrl, setOption3ImageUrl] = useState('');
  const [option4Text, setOption4Text] = useState('');
  const [option4ImageUrl, setOption4ImageUrl] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [preExplanationText, setPreExplanationText] = useState('');
  const [postExplanationText, setPostExplanationText] = useState('');
  const [explanationImageUrl, setExplanationImageUrl] = useState('');

  const preQuestionRef = useRef(null);
  const questionImageRef = useRef(null);
  const postQuestionRef = useRef(null);
  const option1TextRef = useRef(null);
  const option1ImageRef = useRef(null);
  const option2TextRef = useRef(null);
  const option2ImageRef = useRef(null);
  const option3TextRef = useRef(null);
  const option3ImageRef = useRef(null);
  const option4TextRef = useRef(null);
  const option4ImageRef = useRef(null);
  const correctOptionRef = useRef(null);
  const preExplanationTextRef = useRef(null);
  const postExplanationTextRef = useRef(null);
  const explanationImageRef = useRef(null);

  useEffect(() => {
    renderEquation(preQuestionRef, preQuestionText);
    renderEquation(questionImageRef, questionImageUrl);
    renderEquation(postQuestionRef, postQuestionText);
    renderEquation(option1TextRef, option1Text);
    renderEquation(option1ImageRef, option1ImageUrl);
    renderEquation(option2TextRef, option2Text);
    renderEquation(option2ImageRef, option2ImageUrl);
    renderEquation(option3TextRef, option3Text);
    renderEquation(option3ImageRef, option3ImageUrl);
    renderEquation(option4TextRef, option4Text);
    renderEquation(option4ImageRef, option4ImageUrl);
    renderEquation(correctOptionRef, correctOption);
    renderEquation(preExplanationTextRef, preExplanationText);
    renderEquation(postExplanationTextRef, postExplanationText);
    renderEquation(explanationImageRef, explanationImageUrl);
  }, [
    preQuestionText,
    questionImageUrl,
    postQuestionText,
    option1Text,
    option1ImageUrl,
    option2Text,
    option2ImageUrl,
    option3Text,
    option3ImageUrl,
    option4Text,
    option4ImageUrl,
    correctOption,
    preExplanationText,
    postExplanationText,
    explanationImageUrl,
  ]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [preQuestionText]);

  useEffect(() => {
    const textarea = textareaRef1.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [postQuestionText]);

  useEffect(() => {
    const textarea = textareaRef2.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [preExplanationText]);

  useEffect(() => {
    const textarea = textareaRef3.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [postExplanationText]);

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    const numberOfLines = value.split(/\r\n|\r|\n/).filter(line => line.trim() !== '').length;
    console.log("Number of non-empty lines:", numberOfLines);
    setter(value);
  };

  const renderEquation = (ref, value) => {
    if (typeof window !== 'undefined' && typeof window.MathJax !== 'undefined') {
      const mathElement = ref.current;
      if (mathElement) {
        mathElement.innerHTML = ''; // Clear inner HTML
        window.MathJax.typesetClear(); // Clear MathJax typesetting
        mathElement.appendChild(document.createTextNode(value)); // Append new text node
        window.MathJax.typeset([mathElement]); // Process LaTeX code
      }
    }
  };

  const formatTextWithBrackets = (text) => {
    var temp = ""
    const lines = text.split('\n');
    const linesWithBrackets = lines.map((line, index) => {
      if (line.trim() === "") return null; // Skip empty lines
      return `${line}`;
    }).filter(Boolean); // Remove null entries (empty lines)
    const formattedText = `${linesWithBrackets.join('!')}`;
    if (temp === "") {
      return formattedText;
    } else {
      return temp;
    }
  };

  const handleSubmit = async () => {
    try {

      console.log('Selected Year ID:', selectedYearId);
      console.log('Selected Subject ID:', selectedSubjectId);
      console.log('Selected Chapter ID:', selectedChapterId);
      console.log('Selected Topic ID:', selectedTopicId);
      console.log('Selected Exam ID:', selectedExamId);

      console.log("conceptualError: ", conceptualError);
      console.log("alignmentError: ", alignmentError);
      console.log("deletedSyllabus: ", deletedSyllabus);
      console.log("userId: ", userId);
      console.log("option1ImageUrl: ", option1ImageUrl);
      console.log("option2ImageUrl: ", option2ImageUrl);
      console.log("option3ImageUrl: ", option3ImageUrl);
      console.log("option4ImageUrl: ", option4ImageUrl);


      // console.log(outputTextWithBrackets);

      const formattedPreQuestionText = formatTextWithBrackets(preQuestionText);

      // Format postQuestionText
      const formattedPostQuestionText = formatTextWithBrackets(postQuestionText);

      // Format explanationText
      const formattedPreExplanationText = formatTextWithBrackets(preExplanationText);
      const formattedPostExplanationText = formatTextWithBrackets(postExplanationText);

      // Format each option
      const formattedOption1 = formatTextWithBrackets(option1Text);
      const formattedOption2 = formatTextWithBrackets(option2Text);
      const formattedOption3 = formatTextWithBrackets(option3Text);
      const formattedOption4 = formatTextWithBrackets(option4Text);

      console.log(formattedPreQuestionText);
      console.log(formattedPostQuestionText);
      console.log(formattedPreExplanationText);
      console.log(formattedPostExplanationText);
      console.log(formattedOption1);
      console.log(formattedOption2);
      console.log(formattedOption3);
      console.log(formattedOption4);



      // Send data to API
      const response = await axios.post(`${baseUrl}${endpoint}`, {
        preQuestionText: formattedPreQuestionText,
        questionImageUrl,
        postQuestionText: formattedPostQuestionText,
        option1Text: formattedOption1,
        option1ImageUrl,
        option2Text: formattedOption2,
        option2ImageUrl,
        option3Text: formattedOption3,
        option3ImageUrl,
        option4Text: formattedOption4,
        option4ImageUrl,
        correctOption,
        preExplanationText: formattedPreExplanationText,
        postExplanationText: formattedPostExplanationText,
        explanationImageUrl,
        selectedYearId,
        selectedSubjectId,
        selectedChapterId,
        selectedTopicId,
        conceptualError,
        alignmentError,
        deletedSyllabus,
        difficultyLevel,
        selectedExamId,
        userId
      });

      if (response.status === 201) {
        const insertedId = response.data.insertedId;
        console.log('Inserted Question ID:', insertedId);

        // Fetch the data of the inserted question using its ID
        const questionResponse = await axios.get(`${baseUrl}/questions/${insertedId}`);
        // console.log('Question Response:', questionResponse);

        if (questionResponse.status === 200) {
          // Extract the question data from the response
          const questionData = questionResponse.data;

          setShowQuestionModal(true);
          setModalQuestionData(questionData);

          // console.log('Question Data are:', questionData);

          toast.success('Question added successfully');
          setPreQuestionText('');
          setQuestionImageUrl('');
          setPostQuestionText('');
          setOption1Text('');
          setOption1ImageUrl('');
          setOption2Text('');
          setOption2ImageUrl('');
          setOption3Text('');
          setOption3ImageUrl('');
          setOption4Text('');
          setOption4ImageUrl('');
          setCorrectOption('');
          setPreExplanationText('');
          setPostExplanationText('');
          setExplanationImageUrl('');
          setConceptualError(false);
          setAlignmentError(false);
          setDeletedSyllabus(false);
          setDifficultyLevel('');

        } else {
          toast.warn('Failed to fetch question data. Please try again.');
        }
      } else {
        toast.error('Unexpected response from server. Please try again.');
      }
    } catch (error) {
      toast.error('Error adding question. Please try again.');
      // console.error('Error:', error);
    }
  };

  const [switchOptions, setSwitchOptions] = useState('text');

  const handleOptionChange = (e) => {
    setSwitchOptions(e.target.value);
  };

  // const saveImage = () => {
  //   if (!croppedImage || !canvasRef.current) return;
  //   canvasRef.current.toBlob((blob) => {
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'cropped.png';
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //     canvasRef.current = null;
  //   });
  // }

  const imgRef = useRef();

  const canvasRef = useRef();

  const [image, setImage] = useState(null);

  const [crop, setCrop] = useState({}); // or any other desired aspect ratio

  const [croppedImage, setCroppedImage] = useState(null);

  const [anchorEls, setAnchorEls] = useState([null, null, null, null, null]); // Individual anchorEl state for each button
  const [popovers, setPopovers] = useState([false, false, false, false, false]); // Individual popover state for each button

  const clear = (i) => {
    setOption("");
    setSavedImageData(null)
    setImage(null);
    setCroppedImage(null);
    setCrop({});
    setAnchorEls([null, null, null, null, null]); // Reset all anchorEls

    const newPopovers = [...popovers];
    newPopovers[i] = false; // Close the popover for the clicked button
    setPopovers(newPopovers);

    const fileInput = document.getElementById(`fileInput${i}`);
    if (fileInput) fileInput.value = '';
  };

  const handleClose = (index) => {
    const newPopovers = [...popovers];
    newPopovers[index] = false; // Close the popover for the clicked button
    setPopovers(newPopovers);
    clear(index);
  };

  const handleImageChanged = (i, event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setCrop({ aspect: img.width / img.height });
        };
      });
      const newAnchorEls = [...anchorEls];
      newAnchorEls[i] = event.currentTarget; // Set anchorEl for the clicked button
      setAnchorEls(newAnchorEls);
    }
  };


  const handleOnLoad = useCallback((event) => {
    imgRef.current = event.target; // Set imgRef after image loads
  }, []);

  const [savedImageData, setSavedImageData] = useState(null);
  const [option, setOption] = useState("");

  const saveImage = (option) => {
    if (!croppedImage || !canvasRef.current) return;

    setOption(option);
    // Get the cropped image data from the canvas
    const imageData = canvasRef.current.toDataURL();

    // Set the cropped image data to state
    setSavedImageData(imageData);
  };

  useEffect(() => {
    if (savedImageData) {
      axios
        .post(`${baseUrl}${endpointsave}`, { savedImageData })
        .then((response) => {
          console.log(response.data.fileName); // Log the response from the backend
          // Handle success, if needed
          toast.success('Image Uploaded Successfully')
          return response.data.fileName;
        })
        .then((data) => {
          // Update state with the response for the respective option
          switch (option) {
            case "quesImg":
              console.log("Question IMG URL", data);
              setQuestionImageUrl(data);
              handleClose(0);
              break;
            case "option1":
              console.log("data1", data);
              setOption1ImageUrl(data);
              handleClose(1);
              break;
            case "option2":
              console.log("data2", data);
              setOption2ImageUrl(data);
              handleClose(2);
              break;
            case "option3":
              console.log("data3", data);
              setOption3ImageUrl(data);
              handleClose(3);
              break;
            case "option4":
              console.log("data4", data);
              setOption4ImageUrl(data);
              handleClose(4);
              break;
            case "expImg":
              console.log("EXP IMG URL", data);
              setExplanationImageUrl(data);
              handleClose(5);

              break;

            default:
              break;
          }
        })
        .catch((error) => {
          console.error("Error saving image:", error);
          // Handle error, if needed
        });
    }
  }, [savedImageData, option, baseUrl, endpointsave, handleClose, setQuestionImageUrl, setOption1ImageUrl, setOption2ImageUrl, setOption3ImageUrl, setOption4ImageUrl, setExplanationImageUrl]);

  // const saveImage = (option) => {
  //   if (!croppedImage || !canvasRef.current) return;

  //   // Get the cropped image data from the canvas
  //   const imageData = canvasRef.current.toDataURL();

  //   // Set the cropped image data to state
  //   // console.log(imageData);
  //   setSavedImageData(imageData);

  //   if (savedImageData === null) {
  //     toast.warn('Error Uploading Click Upload one more time');
  //     return;
  //   }

  //   axios
  //     .post(`${baseUrl}${endpointsave}`, { savedImageData })
  //     .then((response) => {
  //       console.log(response.data.fileName); // Log the response from the backend
  //       // Handle success, if needed
  //       toast.success('Image Uploaded Successfully')
  //       return response.data.fileName;
  //     })
  //     .then((data) => {
  //       // Update state with the response for the respective option
  //       switch (option) {
  //         case "quesImg":
  //           console.log("Question IMG URL", data);
  //           setQuestionImageUrl(data);
  //           handleClose(0);
  //           break;
  //         case "option1":
  //           console.log("data1", data);
  //           setOption1ImageUrl(data);
  //           handleClose(1);
  //           break;
  //         case "option2":
  //           console.log("data2", data);
  //           setOption2ImageUrl(data);
  //           handleClose(2);
  //           break;
  //         case "option3":
  //           console.log("data3", data);
  //           setOption3ImageUrl(data);
  //           handleClose(3);
  //           break;
  //         case "option4":
  //           console.log("data4", data);
  //           setOption4ImageUrl(data);
  //           handleClose(4);
  //           break;
  //         case "expImg":
  //           console.log("EXP IMG URL", data);
  //           setExplanationImageUrl(data);
  //           handleClose(5);

  //           break;

  //         default:
  //           break;
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error saving image:", error);
  //       // Handle error, if needed
  //     });
  // }


  const handleButtonClick = (event, index) => {
    const newPopovers = [...popovers];
    newPopovers[index] = true;
    setPopovers(newPopovers);
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    const fileInput = document.getElementById(`fileInput${index}`);
    if (fileInput) fileInput.click();
  };

  useEffect(() => {
    if (!croppedImage || !imgRef.current) return;

    const canvas = canvasRef.current;
    const rc_image = imgRef.current;
    const crop = croppedImage;

    const scaleX = rc_image.naturalWidth / rc_image.width;
    const scaleY = rc_image.naturalHeight / rc_image.height;

    const pixelRatio = window.devicePixelRatio;

    const dImgWid = crop.width * scaleX;
    const dImgHei = crop.height * scaleY;

    canvas.width = dImgWid * pixelRatio;
    canvas.height = dImgHei * pixelRatio;

    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = true;

    ctx.drawImage(
      rc_image,
      crop.x * scaleX,
      crop.y * scaleY,
      dImgWid,
      dImgHei,
      0,
      0,
      dImgWid,
      dImgHei
    );
  }, [croppedImage]);

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

  const handleCloseModal = () => {
    setShowQuestionModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>

      <div >
        {showQuestionModal && modalQuestionData && (
          <ShowQuestionInModal
            questionData={modalQuestionData}
            handleClose={handleCloseModal}
          // handleClose={() => setShowQuestionModal(false)}
          />
        )}
        {/* {<QuestionSelectionPage />} */}

        <QuestionSelectionPage
          setSelectedYearId={setSelectedYearId}
          setSelectedSubjectId={setSelectedSubjectId}
          setSelectedChapterId={setSelectedChapterId}
          setSelectedTopicId={setSelectedTopicId}
          setSelectedExamId={setSelectedExamId}
        />
        <div >

          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Basic Form</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="preQuestionText">Pre Question Text:</Form.Label>
                      <Form.Control
                        as="textarea"
                        ref={textareaRef}
                        placeholder="Enter LaTeX code..."
                        value={preQuestionText}
                        onChange={handleInputChange(setPreQuestionText)}
                        id="preQuestionText"
                      />
                      <div ref={preQuestionRef}></div>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Question Image URL:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Image URL..."
                        value={questionImageUrl}
                        onChange={handleInputChange(setQuestionImageUrl)}
                      />
                      <div ref={questionImageRef}></div>
                      <div>
                        <Button
                          variant="primary"
                          className="uploadQuestionButton"
                          onClick={(e) => handleButtonClick(e, 0)}
                        >
                          <CloudUploadIcon /> Upload Question Image
                        </Button>
                        <Form.Control
                          type="file"
                          id="fileInput0"
                          accept="image/*"
                          onChange={(e) => handleImageChanged(0, e)}
                          hidden
                        />
                        <Popover
                          show={popovers[0]}
                          target={anchorEls[0]}
                          onHide={() => handleClose(0)}
                          placement="bottom-end"
                        >
                          <Popover.Header closeButton>
                            <Popover.Title>Crop Image</Popover.Title>
                          </Popover.Header>
                          <Popover.Body>
                            <Typography style={{ maxWidth: '1440px' }}>
                              <div>
                                <div>
                                  <Button onClick={() => clear(0)}>Clear</Button>
                                  {croppedImage && (
                                    <Button onClick={() => saveImage("quesImg")}>
                                      Upload Crop
                                    </Button>
                                  )}
                                </div>
                                <div>
                                  {image && (
                                    <ReactCrop
                                      crop={crop}
                                      onChange={setCrop}
                                      onComplete={setCroppedImage}
                                      aspect={1}
                                    >
                                      <img
                                        src={image}
                                        alt="Crop me"
                                        className="cropImage"
                                        onLoad={handleOnLoad}
                                      />
                                    </ReactCrop>
                                  )}
                                </div>
                                <div>
                                  {croppedImage && canvasRef && (
                                    <>
                                      <div>Cropped Image</div>
                                      <canvas
                                        className="cropImage"
                                        ref={canvasRef}
                                        style={{ height: '30%', width: '30%' }}
                                      ></canvas>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Typography>
                          </Popover.Body>
                        </Popover>
                      </div>
                      <div>
                        {questionImageUrl && (
                          <img
                            className="cropImage"
                            src={getImageUrl(questionImageUrl)}
                            alt="QuestionImage"
                            style={{ height: '30%', width: '30%' }}
                          />
                        )}
                      </div>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Post Question Text:</Form.Label>
                      <Form.Control
                        as="textarea"
                        ref={textareaRef1}
                        placeholder="Enter LaTeX code..."
                        value={postQuestionText}
                        onChange={handleInputChange(setPostQuestionText)}
                      />
                      <div ref={postQuestionRef}></div>
                    </Form.Group>


                    <Form.Group className="form-group">
                      <Form.Label>Option Has</Form.Label>
                      <div className="radioFlex">
                        <Form.Check type="radio" id="textOption">
                          <Form.Check.Input
                            type="radio"
                            name="switchOptions"
                            value="text"
                            checked={switchOptions === 'text'}
                            onChange={handleOptionChange}
                            className="uploadRadioButtons"
                            style={{ width: '20px', height: '20px' }} // Increase radio button size
                          />
                          <Form.Check.Label style={{ fontSize: '18px' }}>Text</Form.Check.Label> {/* Increase label font size */}
                        </Form.Check>
                        <Form.Check type="radio" id="imageOption">
                          <Form.Check.Input
                            type="radio"
                            name="switchOptions"
                            value="image"
                            checked={switchOptions === 'image'}
                            onChange={handleOptionChange}
                            className="uploadRadioButtons"
                            style={{ width: '20px', height: '20px' }} // Increase radio button size
                          />
                          <Form.Check.Label style={{ fontSize: '18px' }}>Image</Form.Check.Label> {/* Increase label font size */}
                        </Form.Check>
                      </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Correct Option:</Form.Label>
                      <Form.Control
                        as="select"
                        id="correctOptionSelect"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(e.target.value)}
                        required
                      >
                        <option value="">Select correct option</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </Form.Control>
                      <div ref={correctOptionRef}></div>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Pre Explanation Text:</Form.Label>
                      <Form.Control
                        as="textarea"
                        ref={textareaRef2}
                        placeholder="Enter LaTeX code..."
                        value={preExplanationText}
                        onChange={handleInputChange(setPreExplanationText)}
                      />
                      <div ref={explanationImageRef}></div>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Explanation Image URL:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Image URL..."
                        value={explanationImageUrl}
                        onChange={handleInputChange(setExplanationImageUrl)}
                      />
                      <div>
                        <Button
                          className="uploadQuestionButton"
                          variant="primary"
                          onClick={(e) => handleButtonClick(e, 5)}
                        >
                          <CloudUploadIcon /> Upload Explanation Image
                        </Button>
                        <Form.Control
                          type="file"
                          id="fileInput5"
                          accept="image/*"
                          onChange={(e) => handleImageChanged(5, e)}
                          hidden
                        />
                        <Popover
                          show={popovers[5]}
                          target={anchorEls[5]}
                          onHide={() => handleClose(5)}
                          placement="bottom-end"
                        >
                          <Popover.Header closeButton>
                            <Popover.Title>Crop Image</Popover.Title>
                          </Popover.Header>
                          <Popover.Body>
                            <Typography style={{ maxWidth: '1440px' }}>
                              <div>
                                <div>
                                  <Button onClick={() => clear(5)}>Clear</Button>
                                  {croppedImage && (
                                    <Button onClick={() => saveImage("expImg")}>
                                      Upload Crop
                                    </Button>
                                  )}
                                </div>
                                <div>
                                  {image && (
                                    <ReactCrop
                                      crop={crop}
                                      onChange={setCrop}
                                      onComplete={setCroppedImage}
                                      aspect={1}
                                    >
                                      <img
                                        src={image}
                                        className="cropImage"
                                        alt="Crop me"
                                        onLoad={handleOnLoad}
                                      />
                                    </ReactCrop>
                                  )}
                                </div>
                                <div>
                                  {croppedImage && canvasRef && (
                                    <>
                                      <div>Cropped Image</div>
                                      <canvas
                                        className="cropImage"
                                        ref={canvasRef}
                                        style={{ height: '30%', width: '30%' }}
                                      ></canvas>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Typography>
                          </Popover.Body>
                        </Popover>
                      </div>
                      <div>
                        {explanationImageUrl && (
                          <img
                            className="cropImage"
                            src={getImageUrl(explanationImageUrl)}
                            alt="ExplanationImage"
                            style={{ height: '30%', width: '30%' }}
                          />
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Post Explanation Text:</Form.Label>
                      <Form.Control
                        as="textarea"
                        ref={textareaRef3}
                        placeholder="Enter LaTeX code..."
                        value={postExplanationText}
                        onChange={handleInputChange(setPostExplanationText)}
                      />
                      <div ref={explanationImageRef}></div>
                    </Form.Group>

                    <div>
                      <Button variant="primary" className="submitButton" onClick={handleSubmit}>
                        Submit <ArrowUpwardIcon fontSize="small" />
                      </Button>
                    </div>

                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>




          {/* <div className='selectFilterContainer' >
              
              <h5 className='selectHeading'>Pre Question Text:</h5>
              <textarea
                ref={textareaRef}
            
                placeholder="Enter LaTeX code..."
                value={preQuestionText}
                onChange={handleInputChange(setPreQuestionText)}
              />
              <div ref={preQuestionRef} ></div>
            </div> */}

          {/* <div className='selectFilterContainer' >
              <h5 className='selectHeading'>Question Image URL:</h5>
              <input
                type="text"
                placeholder="Enter Image URL..."
                value={questionImageUrl}
                onChange={handleInputChange(setQuestionImageUrl)}
              />
              <div ref={questionImageRef}></div>

              <div>
                <Button
                  variant="contained"
                  className='uploadQuestionButton'
                  onClick={
                    (e) => handleButtonClick(e, 0)
                    // (e) => { const newPopovers = [...popovers]; newPopovers[0] = true; setPopovers(newPopovers); document.getElementById('fileInput0').click(); }
                  }
                >
               <CloudUploadIcon/>&nbsp; Upload Question Image
                </Button>
                <input
                  type="file"
                  id="fileInput0"
                  accept="image/*"
                  onChange={(e) => handleImageChanged(0, e)}
                  hidden
                />
                <Popover
                  open={popovers[0]}
                  anchorEl={anchorEls[0]}
                  onClose={() => handleClose(0)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2, maxWidth: 1440 }}>
                    <div>
                      <div>
                        <Button onClick={() => clear(0)}>Clear</Button>
                        {croppedImage && (
                          <Button onClick={() => saveImage("quesImg")}>
                            Upload Crop
                          </Button>
                        )}
                      </div>
                      <div
                       
                      >
                        <div >
                          {image && (
                            <ReactCrop
                              crop={crop}
                              onChange={setCrop}
                              onComplete={setCroppedImage}
                              // minWidth={100}
                              // minHeight={100}
                              grid={[10, 10]}
                              
                            >
                              <img
                                src={image}
                                alt="Crop me"
                                className='cropImage'
                                onLoad={handleOnLoad}
                                
                              />
                            </ReactCrop>
                          )}
                        </div>
                        <div
                         
                        >
                          {(croppedImage && canvasRef)  && (
                            <>
                              Cropped Image
                              <canvas
                              className='cropImage'
                                ref={canvasRef}
                                style={{ height: '30%', width: '30%'}}
                              ></canvas>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Typography>
                </Popover>
              </div>
              <div>
                {questionImageUrl && (
                  <img className='cropImage' src={getImageUrl(questionImageUrl)} alt="QuestionImage" style={{ height: '30%', width: '30%'}}/>
                )}
              </div>
            </div>
            <div className='selectFilterContainer'  >
              <h5 className='selectHeading'>Post Question Text:</h5>
              <textarea
                ref={textareaRef1}
                placeholder="Enter LaTeX code..."
                value={postQuestionText}
                onChange={handleInputChange(setPostQuestionText)}
              />
              <div ref={postQuestionRef}></div>
            </div> */}
        </div>




        {/* <div className='selectFilterContainer'  >
            <h5  className='selectHeading'>Option Has</h5>
            <div className='radioFlex' >
              <div>
                <input
                  type="radio"
                  id="textOption"
                  name="switchOptions"
                  value="text"
                  className='uploadRadioButtons'
                  checked={switchOptions === "text"}
                  onChange={handleOptionChange}
                
                />
                <span>
                  Text
                </span>
               
              </div>
              <div >
                <input
                  type="radio"
                  id="imageOption"
                  name="switchOptions"
                  value="image"
                  className='uploadRadioButtons'
                  checked={switchOptions === "image"}
                  onChange={handleOptionChange}
                  
                />
                <span>
                  Image
                </span>{" "}
                
              </div>
            </div>
          </div> */}

        <div className='selectFilterContainer' >
          <div >
            {switchOptions === "text" ? (
              <div >
                <h5 className='selectHeading'>Option 1 Text:</h5>
                <textarea
                  placeholder="Enter LaTeX code..."
                  value={option1Text}
                  onChange={handleInputChange(setOption1Text)}
                />
                <div ref={option1TextRef}></div>
              </div>
            ) : (
              <div className='mb' >
                <h5 className='selectHeading'>Option 1 Image URL:</h5>
                <input
                  type="text"
                  placeholder="Enter Image URL..."
                  value={option1ImageUrl}
                  onChange={handleInputChange(setOption1ImageUrl)}
                />
                {/* <div ref={option1ImageRef}></div> */}
                <div>
                  <Button
                    className='uploadQuestionButton'
                    variant="contained"
                    onClick={(e) => handleButtonClick(e, 1)}
                  // onClick={(e) => { const newPopovers = [...popovers]; newPopovers[1] = true; setPopovers(newPopovers); document.getElementById('fileInput1').click(); }}
                  >
                    <CloudUploadIcon /> &nbsp;  Upload Option 1 Image
                  </Button>
                  <input
                    type="file"
                    id="fileInput1"
                    accept="image/*"
                    onChange={(e) => handleImageChanged(1, e)}
                    hidden
                  />
                  <Popover
                    open={popovers[1]}
                    anchorEl={anchorEls[1]}
                    onClose={() => handleClose(1)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2, maxWidth: 1440 }}>
                      <div>
                        <div>
                          <Button onClick={() => clear(1)}>Clear</Button>
                          {croppedImage && (
                            <Button onClick={() => saveImage("option1")}>
                              Upload Crop
                            </Button>
                          )}
                        </div>
                        <div

                        >
                          <div >
                            {image && (
                              <ReactCrop
                                crop={crop}
                                onChange={setCrop}
                                onComplete={setCroppedImage}
                                // minWidth={100}
                                // minHeight={100}
                                grid={[10, 10]}

                              >
                                <img
                                  src={image}
                                  className='cropImage'
                                  alt="Crop me"
                                  onLoad={handleOnLoad}

                                />
                              </ReactCrop>
                            )}
                          </div>
                          <div

                          >
                            {croppedImage && (
                              <>
                                Cropped Image
                                <canvas
                                  className='cropImage'
                                  ref={canvasRef}
                                  style={{ height: '30%', width: '30%' }}
                                ></canvas>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </Popover>
                </div>
                <div>
                  {option1ImageUrl && (
                    <img className='cropImage' src={getImageUrl(option1ImageUrl)} alt="OptionImage" style={{ height: '30%', width: '30%' }} />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='mb'>
            {switchOptions === "text" ? (
              <div>
                <h5 className='selectHeading'>Option 2 Text:</h5>
                <textarea
                  placeholder="Enter LaTeX code..."
                  value={option2Text}
                  onChange={handleInputChange(setOption2Text)}
                />
                <div ref={option2TextRef}></div>
              </div>
            ) : (
              <div >
                <h5 className='selectHeading'>Option 2 Image URL:</h5>
                <input
                  type="text"
                  placeholder="Enter Image URL..."
                  value={option2ImageUrl}
                  onChange={handleInputChange(setOption2ImageUrl)}
                />
                {/* <div ref={option2ImageRef}></div> */}
                <div>
                  <Button
                    className='uploadQuestionButton'
                    variant="contained"
                    onClick={(e) => handleButtonClick(e, 2)}
                  // onClick={(e) => { const newPopovers = [...popovers]; newPopovers[2] = true; setPopovers(newPopovers); document.getElementById('fileInput2').click(); }}
                  >
                    <CloudUploadIcon /> &nbsp;  Upload Option 2 Image
                  </Button>
                  <input
                    type="file"
                    id="fileInput2"
                    accept="image/*"
                    onChange={(e) => handleImageChanged(2, e)}
                    hidden
                  />
                  <Popover
                    open={popovers[2]}
                    anchorEl={anchorEls[2]}
                    onClose={() => handleClose(2)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2, maxWidth: 1440 }}>
                      <div>
                        <div>
                          <Button onClick={() => clear(2)}>Clear</Button>
                          {croppedImage && (
                            <Button onClick={() => saveImage("option2")}>
                              Upload Crop
                            </Button>
                          )}
                        </div>
                        <div

                        >
                          <div >
                            {image && (
                              <ReactCrop
                                crop={crop}
                                onChange={setCrop}
                                onComplete={setCroppedImage}
                                // minWidth={100}
                                // minHeight={100}
                                grid={[10, 10]}

                              >
                                <img
                                  className='cropImage'
                                  src={image}
                                  alt="Crop me"
                                  onLoad={handleOnLoad}

                                />
                              </ReactCrop>
                            )}
                          </div>
                          <div

                          >
                            {croppedImage && (
                              <>
                                Cropped Image
                                <canvas
                                  className='cropImage'
                                  ref={canvasRef}
                                  style={{ height: '30%', width: '30%' }}
                                ></canvas>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </Popover>
                </div>
                <div>
                  {option2ImageUrl && (
                    <img className='cropImage' src={getImageUrl(option2ImageUrl)} alt="OptionImage" style={{ height: '30%', width: '30%' }} />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='mb'>
            {switchOptions === "text" ? (
              <div >
                <h5 className='selectHeading'>Option 3 Text:</h5>
                <textarea
                  placeholder="Enter LaTeX code..."
                  value={option3Text}
                  onChange={handleInputChange(setOption3Text)}
                />
                <div ref={option3TextRef}></div>
              </div>
            ) : (
              <div className='mb'>
                <h5 className='selectHeading'>Option 3 Image URL:</h5>
                <input
                  type="text"
                  placeholder="Enter Image URL..."
                  value={option3ImageUrl}
                  onChange={handleInputChange(setOption3ImageUrl)}
                />
                {/* <div ref={option3ImageRef}></div> */}
                <div>
                  <Button
                    className='uploadQuestionButton'
                    variant="contained"
                    onClick={(e) => handleButtonClick(e, 3)}
                  // onClick={(e) => { const newPopovers = [...popovers]; newPopovers[3] = true; setPopovers(newPopovers); document.getElementById('fileInput3').click(); }}
                  >
                    <CloudUploadIcon /> &nbsp;  Upload Option 3 Image
                  </Button>
                  <input
                    type="file"
                    id="fileInput3"
                    accept="image/*"
                    onChange={(e) => handleImageChanged(3, e)}
                    hidden
                  />
                  <Popover
                    open={popovers[3]}
                    anchorEl={anchorEls[3]}
                    onClose={() => handleClose(3)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2, maxWidth: 1440 }}>
                      <div>
                        <div>
                          <Button onClick={() => clear(3)}>Clear</Button>
                          {croppedImage && (
                            <Button onClick={() => saveImage("option3")}>
                              Upload Crop
                            </Button>
                          )}
                        </div>
                        <div

                        >
                          <div>
                            {image && (
                              <ReactCrop
                                crop={crop}
                                onChange={setCrop}
                                onComplete={setCroppedImage}
                                // minWidth={100}
                                // minHeight={100}
                                grid={[10, 10]}

                              >
                                <img
                                  className='cropImage'
                                  src={image}
                                  alt="Crop me"
                                  onLoad={handleOnLoad}

                                />
                              </ReactCrop>
                            )}
                          </div>
                          <div

                          >
                            {croppedImage && (
                              <>
                                Cropped Image
                                <canvas
                                  className='cropImage'
                                  ref={canvasRef}
                                  style={{ height: '30%', width: '30%' }}
                                ></canvas>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </Popover>
                </div>
                <div>
                  {option3ImageUrl && (
                    <img className='cropImage' src={getImageUrl(option3ImageUrl)} alt="OptionImage" style={{ height: '30%', width: '30%' }} />
                  )}
                </div>
              </div>
            )}
          </div>
          <div >
            {switchOptions === "text" ? (
              <div>
                <h5 className='selectHeading'>Option 4 Text:</h5>
                <textarea
                  placeholder="Enter LaTeX code..."
                  value={option4Text}
                  onChange={handleInputChange(setOption4Text)}
                />
                <div ref={option4TextRef}></div>
              </div>
            ) : (
              <div >
                <h5 className='selectHeading'>Option 4 Image URL:</h5>
                <input
                  type="text"
                  placeholder="Enter Image URL..."
                  value={option4ImageUrl}
                  onChange={handleInputChange(setOption4ImageUrl)}
                />
                {/* <div ref={option4ImageRef}></div> */}
                <div>
                  <Button
                    className='uploadQuestionButton'
                    variant="contained"
                    onClick={(e) => handleButtonClick(e, 4)}
                  // onClick={(e) => { const newPopovers = [...popovers]; newPopovers[4] = true; setPopovers(newPopovers); document.getElementById('fileInput4').click(); }}
                  >
                    <CloudUploadIcon /> &nbsp;   Upload Option 4 Image
                  </Button>
                  <input
                    type="file"
                    id="fileInput4"
                    accept="image/*"
                    onChange={(e) => handleImageChanged(4, e)}
                    hidden
                  />
                  <Popover
                    open={popovers[4]}
                    anchorEl={anchorEls[4]}
                    onClose={() => handleClose(4)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2, maxWidth: 1440 }}>
                      <div>
                        <div>
                          <Button onClick={() => clear(4)}>Clear</Button>
                          {croppedImage && (
                            <Button onClick={() => saveImage("option4")}>
                              Upload Crop
                            </Button>
                          )}
                        </div>
                        <div

                        >
                          <div >
                            {image && (
                              <ReactCrop
                                crop={crop}
                                onChange={setCrop}
                                onComplete={setCroppedImage}
                                // minWidth={100}
                                // minHeight={100}
                                grid={[10, 10]}

                              >
                                <img
                                  className='cropImage'
                                  src={image}
                                  alt="Crop me"
                                  onLoad={handleOnLoad}

                                />
                              </ReactCrop>
                            )}
                          </div>
                          <div

                          >
                            {croppedImage && (
                              <>
                                Cropped Image
                                <canvas
                                  className='cropImage'
                                  ref={canvasRef}
                                  style={{ height: '30%', width: '30%' }}
                                ></canvas>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </Popover>
                </div>
                <div>
                  {option4ImageUrl && (
                    <img className='cropImage' src={getImageUrl(option4ImageUrl)} alt="OptionImage" style={{ height: '30%', width: '30%' }} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div >
          <div className='selectFilterContainer'>
            <h5 className='selectHeading'>Correct Option:</h5>
            <div >
              <h6 className='selectHeading' >Correct Option:</h6>
              <select
                id="correctOptionSelect"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                required
              >
                <option value="">Select correct option</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div>
              <pre ref={correctOptionRef}></pre>
            </div>
          </div>
        </div>


        {/* <div className='selectFilterContainer'> */}
        {/* <div className='mb'>
              <h5 className='selectHeading'>Pre Explanation Text:</h5>
              <textarea
                ref={textareaRef2}
                placeholder="Enter LaTeX code..."
                value={preExplanationText}
                onChange={handleInputChange(setPreExplanationText)}
              />
              <div ref={preExplanationTextRef}></div>
            </div> */}

        {/* <div className='mb'>

  
              <h5 className='selectHeading'>Explanation Image URL:</h5>
              <input
                type="text"
                placeholder="Enter Image URL..."
                value={explanationImageUrl}
                onChange={handleInputChange(setExplanationImageUrl)}
              />

              <div ref={explanationImageRef}></div>
              <div>
                <Button
                className='uploadQuestionButton'
                  variant="contained"
                  onClick={
                    (e) => handleButtonClick(e, 5)
                    (e) => {
                    const newPopovers = [...popovers];
                    newPopovers[5] = true;
                    setPopovers(newPopovers);
                    document.getElementById('fileInput5').click(); }
                  }
                >
                  <CloudUploadIcon/> &nbsp;  Upload Explanation Image
                </Button>
                <input
                  type="file"
                  id="fileInput5"
                  accept="image/*"
                  onChange={(e) => handleImageChanged(5, e)}
                  hidden
                />
                <Popover
                  open={popovers[5]}
                  anchorEl={anchorEls[5]}
                  onClose={() => handleClose(5)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2, maxWidth: 1440 }}>
                    <div>
                      <div>
                        <Button  onClick={() => clear(5)}>Clear</Button>
                        {croppedImage && (
                          <Button  onClick={() => saveImage("expImg")}>
                            Upload Crop
                          </Button>
                        )}
                      </div>
                      <div
                       
                      >
                        <div >
                          {image && (
                            <ReactCrop
                              crop={crop}
                              onChange={setCrop}
                              onComplete={setCroppedImage}
                              // minWidth={100}
                              // minHeight={100}
                              grid={[10, 10]}
                             
                            >
                              <img
                                src={image}
                                className='cropImage' 
                                alt="Crop me"
                                onLoad={handleOnLoad}
                                
                              />
                            </ReactCrop>
                          )}
                        </div>
                        <div
                        
                        >
                          {croppedImage && (
                            <>
                              Cropped Image
                              <canvas
                               className='cropImage'
                                ref={canvasRef}
                                style={{ height: '30%', width: '30%'}}
                              ></canvas>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Typography>
                </Popover>
              </div>
              <div>
                {explanationImageUrl && (
                  <img
                  className='cropImage' 
                    src={getImageUrl(explanationImageUrl)}
                    alt="ExplanationImage"
                    style={{ height: '30%', width: '30%'}}
                  />
                )}
              </div>
            </div>

            <div >
              <h5 className='selectHeading'>Post Explanation Text:</h5>
              <textarea
                ref={textareaRef3}
                placeholder="Enter LaTeX code..."
                value={postExplanationText}
                onChange={handleInputChange(setPostExplanationText)}
              />
              <div ref={postExplanationTextRef}></div>
            </div> */}


        {/* </div> */}

        {/* <div className="row p-4 rounded mb-5">
          <div className="col-md-6">
            <h5>Conceptual Error:</h5>
            <input
              type="checkbox"
              checked={conceptualError}
              onChange={() => setConceptualError(!conceptualError)}
            />
          </div>
          <div className="col-md-6">
            <h5>Alignment Error:</h5>
            <input
              type="checkbox"
              checked={alignmentError}
              onChange={() => setAlignmentError(!alignmentError)}
            />
          </div>
          <div className="col-md-6">
            <h5>Deleted Syllabus:</h5>
            <input
              type="checkbox"
              checked={deletedSyllabus}
              onChange={() => setDeletedSyllabus(!deletedSyllabus)}
            />
          </div>
        </div>

        <div className="row p-4 rounded mb-5">
          <div className="col-md-6">
            <h5>Difficulty Level:</h5>
            <select
              className="form-control"
              value={difficultyLevel}
              onChange={handleDifficultyChange}
            >
              <option value="">Select Difficulty</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div> */}




        {/* <div >
            <button className='submitButton' onClick={handleSubmit}>
              Submit <ArrowUpwardIcon fontSize='small' />
            </button>
          </div> */}





      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
};

export default UploadQuestions;