import React from "react";
import { useSelector } from "react-redux";
import "./LLMOutput.css";
import { ShimmerText } from "react-shimmer-effects";
import { useNavigate } from "react-router-dom";

import llama from '../assets/images/logo/llama.jpg';

function LLMOutput({ expand, inprogressPrompt, responses, setShowLLMOutput }) {
  const username = useSelector(store => store.user.name);
  const navigate = useNavigate();

  return <div className={"llm-output-content" + (expand ? ' expanded' : '')}>
    { responses && <div className="regenerate-button" onClick={ (e) => { } }>
      <ion-icon name="refresh-circle-outline"></ion-icon>
      Regenerate
    </div> }
    <div className="llm-output-text">
      { inprogressPrompt && <><div className="llm-prompt">
          <div className="user-avatar"> { username[0].toUpperCase() } </div>
          <div className="llm-prompt-output"> { inprogressPrompt } </div>
        </div>

        <div className="llm-output-response">
          <img src={llama} alt="llama-logo" />

          <div className="llm-response-output" style={{'width': '100%'}}>
            <ShimmerText line={5} gap={10} />
          </div>
        </div>
        </>
       }

      { responses.map((response) => <div className="llm-response">
        <div className="llm-prompt">
          <div className="user-avatar"> { username[0].toUpperCase() } </div>
          <div className="llm-prompt-output">{ response.prompt }</div>
        </div>

        <div className="llm-output-response">
          <img src={llama} alt="llama-logo" />
          <div className="llm-response-output">
            { response.text.split('\n').map((line) => {
              if (line === "") return <br />;

              if (line[0] === "*") return <li>{ line.substring(1) }</li>

              if (JSON.parse(line)) {
                const products = JSON.parse(line);
                
                return products.map((product) => {
                  return <div className="llm-output-product" onClick={(e) => {
                      navigate('/product/' + product[0]);
                      setShowLLMOutput(false);
                    }}>
                    <div className="llm-output-product-link">{ product[1] }</div>
                    <div>{ product[2] }</div>
                  </div>
                })
              }

              return <p>{ line }</p>
              }) }
          </div>
        </div>
      </div> ) }
    </div>
  </div>;
}

export default LLMOutput;
