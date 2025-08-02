export function QuizView(props) {
    return (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="d-flex align-items-center justify-content-between text-white fs-1 py-5">
                    {showLeftArrowCB()}
                    <div className="position-relative top-0 start-0 text-center">
                        <h1 className="display-4 fw-bold landing-header">{props.question[0]}</h1>
                        <h1 className="display-4 fw-bold landing-header">{props.question[1]}</h1>
                        <p className="fs-6 text-center">{props.id + 1} / 5 </p>
                    </div>
                    {showRightArrowCB()}
                    </div>
                    <div key={props.id} className="position-relative bottom-10 start-0 text-white d-flex flex-column flex-md-row justify-content-between" style={{ paddingTop: "2.5rem", paddingBottom: "2rem"}}>
                    {props.answers.map((answer) => showAnswersOptionACB(props.id, answer.label, answer.answerText))}
                    </div>
                </div>
            </div>
        </div>
    );

    function hasCurrentQuestionAnswered() {
        return Array.isArray(props.selectedAnswers) &&
           props.selectedAnswers.some(
               item => item.id === props.id
           );
    }

    function prevClickACB(){
        const idNum = props.id -1;
        return props.prevQuestion(idNum);
    }

    function nextClickACB() {
        const idNum = props.id +1;
        return props.nextQuestion(idNum);
    }

    function showLeftArrowCB(){
        if(props.id === 0){
            return <a onClick={navigateLandingPageACB} style={{ cursor: 'pointer' }}>
                <i className="bi bi-x-lg" style={{ fontSize: "3rem" }}></i></a>
        }else{
            // For regular questions (left arrow)
            return <a onClick={prevClickACB} style={{ cursor: 'pointer' }}>
                <i className="bi bi-chevron-compact-left" style={{ fontSize: "3.5rem" }}></i></a>
        }
    }
    function showRightArrowCB(){
        const isAnswered = hasCurrentQuestionAnswered();
        const arrowStyle = {
            opacity: isAnswered ? 1 : 0.3,
            cursor: isAnswered ? 'pointer' : 'not-allowed',
            fontSize: "3.5rem"
        };

        if(props.id === 4){
            return (
                <a onClick={
                    isAnswered
                      ? () => {
                          analyzeQuizResultACB();
                          storeDescriptionACB();
                          if(props.isLoggedIn){
                            navigateProfilePageACB();
                          }else{
                            navigateQuizResultACB();
                          }
                        }
                      : null
                  }>
                    <i className="bi bi-check2-all" style={arrowStyle}></i>
                </a>
            );
        } else {
            // For regular questions (right arrow)
            return (
                <a onClick={isAnswered ? nextClickACB : null}>
                    <i className="bi bi-chevron-compact-right" style={arrowStyle}></i>
                </a>
            );
        }
    }

    function showAnswersOptionACB(id, label, answer){
        const isSelected = props.selectedAnswers.some(
            (item) => item.id === id && item.answer === answer
          );

          const buttonClass = `btn ${isSelected ? "btn-primary text-white" : "btn-light"} d-flex flex-column flex-md-row p-4 mx-3 my-1 justify-content-between align-items-center text-center rounded-pill`;

          return (
            <button key= {label}
              onClick={() => {
                storeAnswersACB(id, label, answer);
              }}
              className={buttonClass}
              style={{ cursor: "pointer" }}
            >
              {answer}
            </button>
          );
    }    
    function storeAnswersACB(id, label, answer){
        if (id !== undefined && label && answer) {
            return props.storeAnswers(id, label, answer);
          }
    }
    function analyzeQuizResultACB(){
        return props.analyzeQuizAnswers();
    }
    function storeDescriptionACB(){
        return props.storeDescription();
    }
    function navigateQuizResultACB() {
        window.location.hash = "/quiz-result";
    }
    function navigateLandingPageACB(){
        window.location.hash = "/";
    }
    function navigateProfilePageACB(){
        window.location.hash = "/profile";
    }
}
