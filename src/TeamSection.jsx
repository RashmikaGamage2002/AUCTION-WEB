import React from "react";
import "./TeamSection.css";

const teamMembers = [
  {
    name: "Rashmika",
    role: "Lead Designer",
    image: "/assets/rashmika.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "https://www.facebook.com/rashmika.gamage.689123" },
      { icon: "fab fa-whatsapp", url: "#" },
      { icon: "fab fa-instagram", url: "https://www.instagram.com/rashmika_gamagee?igsh=ZXl3YTF1cnoxbTFl&utm_source=qr" },
      { icon: "fas fa-placeholder", url: "https://maps.app.goo.gl/v8NMuMBMe6LYaND29" },
    ],
  },
  {
    name: "Rashmika",
    role: "Lead Designer",
    image: "/assets/rashmika.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "https://www.facebook.com/rashmika.gamage.689123" },
      { icon: "fab fa-whatsapp", url: "#" },
      { icon: "fab fa-instagram", url: "https://www.instagram.com/rashmika_gamagee?igsh=ZXl3YTF1cnoxbTFl&utm_source=qr" },
      { icon: "fas fa-placeholder", url: "https://maps.app.goo.gl/v8NMuMBMe6LYaND29" },
    ],
  },
  {
    name: "Rashmika",
    role: "Lead Designer",
    image: "/assets/rashmika.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "https://www.facebook.com/rashmika.gamage.689123" },
      { icon: "fab fa-whatsapp", url: "#" },
      { icon: "fab fa-instagram", url: "https://www.instagram.com/rashmika_gamagee?igsh=ZXl3YTF1cnoxbTFl&utm_source=qr" },
      { icon: "fas fa-placeholder", url: "https://maps.app.goo.gl/v8NMuMBMe6LYaND29" },
    ],
  },
  {
    name: "Rashmika",
    role: "Lead Designer",
    image: "/assets/rashmika.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "https://www.facebook.com/rashmika.gamage.689123" },
      { icon: "fab fa-whatsapp", url: "#" },
      { icon: "fab fa-instagram", url: "https://www.instagram.com/rashmika_gamagee?igsh=ZXl3YTF1cnoxbTFl&utm_source=qr" },
      { icon: "fas fa-placeholder", url: "https://maps.app.goo.gl/v8NMuMBMe6LYaND29" },
    ],
  },
  {
    name: "Rashmika",
    role: "Lead Designer",
    image: "/assets/rashmika.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "https://www.facebook.com/rashmika.gamage.689123" },
      { icon: "fab fa-whatsapp", url: "#" },
      { icon: "fab fa-instagram", url: "https://www.instagram.com/rashmika_gamagee?igsh=ZXl3YTF1cnoxbTFl&utm_source=qr" },
      { icon: "fas fa-placeholder", url: "https://maps.app.goo.gl/v8NMuMBMe6LYaND29" },
    ],
  },
  {
    name: "Rashmika",
    role: "Lead Designer",
    image: "/assets/rashmika.jpg",
    socials: [
      { icon: "fab fa-facebook-f", url: "https://www.facebook.com/rashmika.gamage.689123" },
      { icon: "fab fa-whatsapp", url: "#" },
      { icon: "fab fa-instagram", url: "https://www.instagram.com/rashmika_gamagee?igsh=ZXl3YTF1cnoxbTFl&utm_source=qr" },
      { icon: "fas fa-placeholder", url: "https://maps.app.goo.gl/v8NMuMBMe6LYaND29" },
    ],
  },

];

const TeamSection = () => (
  <section className="team-section">
    <div className="team-header-centered">
      <h3>Our Team</h3>
      <p>Interior designers must be highly skilled in order to create interior environments that are functional, safe.</p>
    </div>
    <div className="team-cards">
      {teamMembers.map((member, idx) => (
        <div className="team-card" key={idx}>
          <div className="team-img-box">
            <img src={member.image} alt={member.name} />
            <div className="team-socials">
              {member.socials.map((s, i) => (
                <a href={s.url} key={i} target="_blank" rel="noopener noreferrer">
                  {s.icon.includes('facebook') && <img src="/assets/facebook.png" alt="Facebook" className="team-social-icon" />}
                  {s.icon.includes('whatsapp') && <img src="/assets/whatsapp.png" alt="WhatsApp" className="team-social-icon" />}
                  {s.icon.includes('instagram') && <img src="/assets/instagram.png" alt="Instagram" className="team-social-icon" />}
                  {s.icon.includes('placeholder') && <img src="/assets/placeholder.png" alt="Map Marker" className="team-social-icon" />}
                </a>
              ))}
            </div>
          </div>
          <div className="team-name">{member.name}</div>
          <div className="team-role">{member.role}</div>
        </div>
      ))}
    </div>
  </section>
);

export default TeamSection;
