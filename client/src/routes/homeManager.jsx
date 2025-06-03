import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`תודה על פנייתך, ${formData.name}!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
      {/* התמונה */}
      <img
        src="https://images.unsplash.com/photo-1606788075767-4d98a781bc86"
        alt="תמונה יפה"
        className="w-3/4 max-w-4xl rounded-xl shadow-lg mb-8"
      />

      {/* המלל */}
      <h2 className="text-3xl font-bold mb-4 text-center">ברוכים הבאים לאתר שלנו!</h2>
      <p className="text-lg text-center mb-6 max-w-2xl">
        כאן תוכלו ללמוד, להתחבר, ולתמוך בפעילות שלנו. כל תרומה שלכם עוזרת לנו להמשיך בעשייה.
      </p>

      {/* כפתור תרומות */}
      <a href="https://donate.example.com" target="_blank" rel="noopener noreferrer">
        <Button label="לתמיכה ותרומות" className="p-button-lg p-button-success mb-12" />
      </a>

      {/* טופס ליצירת קשר */}
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow">
        <h3 className="text-2xl font-bold mb-4 text-center">צרו קשר</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText id="name" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="name">שם</label>
          </span>
          <span className="p-float-label">
            <InputText id="email" name="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="email">אימייל</label>
          </span>
          <span className="p-float-label">
            <InputTextarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} />
            <label htmlFor="message">הודעה</label>
          </span>
          <Button label="שלח פניה" type="submit" className="p-button-primary mt-2" />
        </form>
      </div>
    </div>
  );
}
