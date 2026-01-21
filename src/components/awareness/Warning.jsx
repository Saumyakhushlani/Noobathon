import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div className="brutalist-card__alert">Security Alert</div>
        </div>
        <div className="brutalist-card__message">
          Your device may be infected. Immediate action required.
          <br />
          Do not close this page.
          <br />
          Call Support: 1-800-555-0199
          <br />
          Act within 02:00 minutes to prevent data loss.
        </div>
        <div className="brutalist-card__actions">
          <a
            href="#"
            className="brutalist-card__button brutalist-card__button--mark"
          >
            Scan now
          </a>
          <a
            href="#"
            className="brutalist-card__button brutalist-card__button--read"
          >
            Fix now
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brutalist-card {
    width: min(420px, 100%);
    margin: 0 auto;
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
  }

  .brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
  }

  .brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    padding: 0.5rem;
  }

  .brutalist-card__icon svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: #fff;
  }

  .brutalist-card__alert {
    font-weight: 900;
    color: #000;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .brutalist-card__message {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
    font-weight: 600;
  }

  .brutalist-card__actions {
    margin-top: 1rem;
  }

  .brutalist-card__button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 3px solid #000;
    background-color: #fff;
    color: #000;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 5px 5px 0 #000;
    overflow: hidden;
    text-decoration: none;
    margin-bottom: 1rem;
  }

  .brutalist-card__button--read {
    background-color: #000;
    color: #fff;
  }

  .brutalist-card__button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  .brutalist-card__button:hover::before {
    left: 100%;
  }

  .brutalist-card__button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #000;
  }

  .brutalist-card__button--mark:hover {
    background-color: #000000;
    border-color: #000000;
    color: #fff;
    box-shadow: 7px 7px 0 #000000;
  }

  .brutalist-card__button--read:hover {
    background-color: #ffffff;
    border-color: #000000;
    color: #000000;
    box-shadow: 7px 7px 0 #000000;
  }

  .brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }

  @media (max-width: 480px) {
    .brutalist-card {
      padding: 1.25rem;
      box-shadow: 8px 8px 0 #000;
    }
    .brutalist-card__alert {
      font-size: 1.25rem;
    }
    .brutalist-card__message {
      font-size: 0.85rem;
    }
    .brutalist-card__button {
      font-size: 0.95rem;
      padding: 0.7rem;
    }
  }

  @media (max-width: 360px) {
    .brutalist-card {
      padding: 1rem;
      border-width: 3px;
      box-shadow: 6px 6px 0 #000;
    }
    .brutalist-card__header {
      gap: 0.75rem;
      padding-bottom: 0.75rem;
    }
    .brutalist-card__alert {
      font-size: 1.1rem;
    }
    .brutalist-card__button {
      font-size: 0.9rem;
      padding: 0.65rem;
      box-shadow: 4px 4px 0 #000;
    }
  }
`;

export default Card;

