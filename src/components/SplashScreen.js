import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="splash-container">
      <h1 className="splash-text">
        Stay <span></span>
        <span className="loader-container">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </span>
        rganized
    
        Achieve More.
      </h1>
    </div>
  );
}

export default SplashScreen;
