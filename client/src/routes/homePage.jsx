import React, { useState, useRef } from 'react';

// import promoVideo from '../CA05 -  Arithmetic Logic.mp4';

import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';

const HomePage = () => {
  const { token, role, user } = useSelector((state) => state.token);
  const [inquiryText, setInquiryText] = useState('');
  const toast = useRef(null);

  const sendInquiry = async () => {
    if (!inquiryText.trim()) {
      toast.current.show({ severity: 'warn', summary: 'אזהרה', detail: 'נא למלא את תוכן הפנייה', life: 3000 });
      return;
    }

    try {

      const response = await axios.post('http://localhost:1111/api/contact', {
        inquiryText: inquiryText
      });

      toast.current.show({ severity: 'success', summary: 'הצלחה', detail: response.data.message, life: 3000 });
      setInquiryText('');
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בשליחת הפנייה. נסה שוב מאוחר יותר.', life: 3000 });
    }
  };

  const openLink1 = () => {
    window.open('https://www.matara.pro/nedarimplus/online/?mosad=7013774', '_blank', 'noopener noreferrer');
  };

  const openLink2 = () => {
    window.open('https://www.matara.pro/nedarimplus/online/?mosad=7013774', '_blank', 'noopener noreferrer');
  };


 return (
  token === null ? (
    <div className="home-container">
      <Toast ref={toast} />
      <div className="institution-description">
        <h1> !ברוכים הבאים לישיבת ברכת חיים</h1>
        <p>
          אנו גאים להציג בפניכם את המוסד הייחודי שלנו, אשר ממוקם בלב הקהילה ומהווה מרכז
          לצמיחה, למידה והתפתחות. אנו מאמינים במצוינות, חדשנות ובמתן כלים מעשיים
          לבוגרינו כדי שיצליחו בעולם המשתנה של היום.
        </p>
        <p>
          במוסדנו, אנו מקדישים תשומת לב מיוחדת לכל תלמיד, ומספקים סביבת למידה תומכת
          ומאתגרת. הצוות שלנו מורכב ממורים מנוסים ומסורים, החותרים להעניק את הידע
          והכישורים הנדרשים להצלחה אישית ומקצועית.
        </p>
        <p>
          הפרויקט הזה נועד להמחיש את העשייה העשירה והרבגונית במוסדנו, ולהציג את
          התוצאות המרשימות של מסירות והשקעה. אנו מזמינים אתכם להצטרף אלינו למסע
          המרתק של למידה והשפעה.
        </p>
      </div>

      {/* <div className="video-section">
        <video className="promo-video" controls autoPlay loop muted>
          <source src={promoVideo} type="video/mp4" />
          הדפדפן שלך אינו תומך בוידאו.
        </video>
      </div> */}
      <div className="youtube-section">
        <div className="youtube-wrapper">
          <iframe
            src="https://www.youtube.com/embed/LEQoBPMa0Zw?start=2"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="inquiry-section">
        <h2>יש לך שאלה? פנה אלינו!</h2>
        <InputTextarea
          value={inquiryText}
          onChange={(e) => setInquiryText(e.target.value)}
          rows={5}
          cols={50}
          placeholder="כתוב את הפנייה שלך כאן..."
        />
        <Button label="שלח פנייה" onClick={sendInquiry} className="mt-3" />
      </div>

      <div className="side-buttons">
        <Button label="לתרומות מישראל " rounded onClick={openLink1}
          style={{ backgroundColor: 'rgb(5, 129, 196)',borderColor: 'rgb(5, 129, 196)'}} />
        <br />
        <Button label= 'לתרומות מארה"ב' rounded onClick={openLink2} 
         style={{ backgroundColor: 'rgb(5, 195, 220)',borderColor: 'rgb(5, 195, 220)'}}/>
      </div>
    </div>
  ) : null

  ); 
};
export default HomePage;

