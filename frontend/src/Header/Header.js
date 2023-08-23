/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import "./Header.css";
import { useSelector } from "react-redux";
import LLMOutput from "../LLMOutput/LLMOutput";
import { useState } from "react";
import { getInferenceAsync } from "../api/inference";

function Header() {

  const favourites = useSelector(store => store.favourites);
  const cartItems = useSelector(store => store.cart);
  const purchaseHistory = useSelector(store => store.purchaseHistory);

  const token = useSelector(store => store.user.token);

  const [ showLLMOutput, setShowLLMOutput ] = useState(false);

  const [ prompt, setPrompt ] = useState('');
  const [ responses, setResponses ] = useState([]);
  const [ inprogressPrompt, setInprogressPrompt ] = useState(null);

  const handlePrompt = (e) => {
    let code = (e.keyCode ? e.keyCode : e.which);

    if (code === 13) {
      const requestedPrompt = prompt;
      setPrompt('');
      setInprogressPrompt(requestedPrompt);
      setShowLLMOutput(true);

      getInferenceAsync(prompt, token).then((res) => {
        console.log(res.data)
        setInprogressPrompt(null);
        setResponses([{
          prompt: requestedPrompt,
          text: res.data
        }, ...responses]);
      })
    }
  };

  return <header>
    <div class="header-main">

      <div class="container">

        <Link to={"/"} class="header-logo">
          <img src={logo} alt="header icon"  height="80" />
        </Link>

        <div class="header-search-container">

          <input type="search"
                 name="search"
                 class="search-field"
                 placeholder="How can I help you? - Llama 2"
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 onKeyDown={handlePrompt} />

          <button class="search-btn">
            <ion-icon name="send-sharp"></ion-icon>
          </button>

        </div>

        <button className="llm-output-toggle" onClick={
          (e) => {
            setShowLLMOutput(!showLLMOutput);
          }
        }>
          { !showLLMOutput && <ion-icon name="chevron-down-outline"></ion-icon> }
          { showLLMOutput && <ion-icon name="chevron-up-outline"></ion-icon> }
        </button>

        <div class="header-user-actions">

          <Link to={"/profile"} class="action-btn">
            <ion-icon name="person-outline"></ion-icon>
          </Link>

          <Link to={"favourites"} class="action-btn">
            <ion-icon name="heart-outline"></ion-icon>
            { favourites.length > 0 && <span class="count">{ favourites.length }</span>}
          </Link>

          <Link to={"/cart"} class="action-btn" >
            <ion-icon name="bag-handle-outline"></ion-icon>
            { cartItems.length > 0 && <span class="count">{ cartItems.length }</span>}
          </Link>

          <Link to={"/payment_history"} class="action-btn">
            <ion-icon name="reorder-four-outline"></ion-icon>

            { purchaseHistory.length > 0 && <span className="count">{ purchaseHistory.length }</span>}
          </Link>

        </div>

      </div>

      <LLMOutput expand={showLLMOutput}
                 inprogressPrompt={inprogressPrompt}
                 responses={ responses }
                 setShowLLMOutput = {setShowLLMOutput} />

    </div>
  </header>;
}

export default Header;