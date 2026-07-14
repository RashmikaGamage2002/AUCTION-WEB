import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SignInModal from './SignInModal';
import './ContactUs.css';


// Top contact info
const contactInfo = [
  {
    icon: '/assets/instagram.png',
    title: 'Instagram',
    value: '@sneakrush',
    sub: null,
  },
  
  {
    icon: '/assets/facebook.png',
    title: 'Facebook',
    value: '@sneakrush',
    sub: null,
  },
  {
    icon: '/assets/whatsapp.png',
    title: 'WhatsApp',
    value: '0779705058',
    sub: null,
  },
  {
    icon: '/assets/placeholder.png',
    title: 'Address',
    value: 'Pitipana, Homagama',
    sub: null,
  },
];

const ContactUs = () => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  return (
    <>
      <Header showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      <div className="contact-us-page">
        <div className="contact-hero">
          <h1 className="contact-hero-h1">Contact Us</h1>
          <p className="contact-hero-p">We would love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help. Reach out to us through any of the channels below or fill out the contact form.</p>
        </div>
      {/* Top Info Row */}
      <div className="contact-top-info-row">
        {contactInfo.map((item, idx) => (
          <div className="contact-top-info-item" key={idx}>
            <span className="contact-top-info-icon">
              <img src={item.icon} alt={item.title} className="contact-top-info-img" />
            </span>
            <div className="contact-top-info-title">{item.title}</div>
            <div className="contact-top-info-value">
              {item.title === 'Instagram' ? (
                <a href="https://www.instagram.com/nsbmgreenuniversity/?hl=en" target="_blank" rel="noopener noreferrer" className="contact-top-info-link">{item.value}</a>
              ) : item.title === 'Facebook' ? (
                <a href="https://web.facebook.com/nsbm.lk/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="contact-top-info-link">{item.value}</a>
              ) : item.title === 'Address' ? (
                <a href="hhttps://maps.app.goo.gl/PSQTK7VfkPZLkvRS9" target="_blank" rel="noopener noreferrer" className="contact-top-info-link">{item.value}</a>
              ) : item.value}
            </div>
            {item.sub && <div className="contact-top-info-sub">{item.sub}</div>}
          </div>
        ))}
      </div>
      
      <div className="contact-main-section">
        <div className="contact-form-col">
          <h2 className="contact-form-title">Send your messages via below form</h2>
          <div className="contact-form-underline"></div>
          <form className="contact-form">
            <div className="contact-form-row">
              <input type="text" placeholder="Your Name (*)" required />
              <input type="email" placeholder="Your Email (*)" required />
            </div>
            <div className="contact-form-row">
              <input type="text" placeholder="Subject" />
              <select>
                <option>Business Department</option>
                <option>Support</option>
                <option>Sales</option>
              </select>
            </div>
            <textarea placeholder="Your Message" rows={6} required></textarea>
            <button type="submit" className="contact-form-btn">Send Message</button>
          </form>
        </div>
        <div className="contact-map-col">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3585.0287872474732!2d80.0372773!3d6.8201287!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25276e5c6adbb%3A0x46388b012e14ddb8!2sFaculty%20of%20Engineering!5e1!3m2!1sen!2sus!4v1758390225060!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="contact-map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default ContactUs;
