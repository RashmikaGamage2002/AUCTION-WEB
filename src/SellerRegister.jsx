import React, { useState } from "react";

import "./SellerRegister.css";

const SellerRegister = () => {
  const [form, setForm] = useState({
    orgName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contactFirst: "",
    contactLast: "",
    phoneDay: "",
    phoneEvening: "",
    email: "",
    services: "",
    estDate: "",
    geoArea: "",
    businessType: "",
    insured: "",
    licensed: "",
    licenseNum: "",
    grossSales: "",
    bankName: "",
    beneficiary: "",
    accountNum: "",
    signature: "",
    appDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    toast.success("Application submitted!");
  };

  return (
    <div className="seller-modal-overlay">
      <div className="seller-modal" onClick={e => e.stopPropagation()}>
        <button className="seller-modal-close" onClick={() => window.history.back()}>&times;</button>
        <h2 className="seller-title">Seller Registration</h2>
        <form className="seller-form" onSubmit={handleSubmit}>
          <section>
            <h3>Company Contact Information</h3>
            <label>Organization/Business Name
              <input name="orgName" value={form.orgName} onChange={handleChange} required />
            </label>
            <label>Company Address
              <input name="address1" value={form.address1} onChange={handleChange} required />
            </label>
            <input name="address2" value={form.address2} onChange={handleChange} placeholder="Street Address Line 2" />
            <div className="row">
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
              <input name="state" value={form.state} onChange={handleChange} placeholder="State / Province" />
            </div>
            <input name="zip" value={form.zip} onChange={handleChange} placeholder="Postal / Zip Code" />
            <div className="row">
              <input name="contactFirst" value={form.contactFirst} onChange={handleChange} placeholder="First Name" />
              <input name="contactLast" value={form.contactLast} onChange={handleChange} placeholder="Last Name" />
            </div>
            <div className="row">
              <input name="phoneDay" value={form.phoneDay} onChange={handleChange} placeholder="Phone Number (Day)" />
              <input name="phoneEvening" value={form.phoneEvening} onChange={handleChange} placeholder="Phone Number (Evening)" />
            </div>
            <label>E-mail
              <input name="email" value={form.email} onChange={handleChange} type="email" required />
            </label>
          </section>
          <section>
            <h3>Company Overview</h3>
            <label>General Details of Services/Goods
              <textarea name="services" value={form.services} onChange={handleChange} />
            </label>
            <label>Establishment Date
              <input name="estDate" value={form.estDate} onChange={handleChange} type="date" />
            </label>
            <div className="row">
              <input name="geoArea" value={form.geoArea} onChange={handleChange} placeholder="Geographic Service Area" />
              <input name="businessType" value={form.businessType} onChange={handleChange} placeholder="Business Type" />
            </div>
            <div className="row radio-row">
              <span>Insured?</span>
              <label><input type="radio" name="insured" value="Yes" checked={form.insured === "Yes"} onChange={handleRadio} /> Yes</label>
              <label><input type="radio" name="insured" value="No" checked={form.insured === "No"} onChange={handleRadio} /> No</label>
            </div>
            <div className="row radio-row">
              <span>Licensed?</span>
              <label><input type="radio" name="licensed" value="Yes" checked={form.licensed === "Yes"} onChange={handleRadio} /> Yes</label>
              <label><input type="radio" name="licensed" value="No" checked={form.licensed === "No"} onChange={handleRadio} /> No</label>
            </div>
            <input name="licenseNum" value={form.licenseNum} onChange={handleChange} placeholder="License Number" />
            <input name="grossSales" value={form.grossSales} onChange={handleChange} placeholder="Gross Annual Sales" />
          </section>
          <section>
            <h3>Banking Information</h3>
            <div className="row">
              <input name="bankName" value={form.bankName} onChange={handleChange} placeholder="Bank Name" />
              <input name="beneficiary" value={form.beneficiary} onChange={handleChange} placeholder="Beneficiary Name" />
            </div>
            <input name="accountNum" value={form.accountNum} onChange={handleChange} placeholder="Account Number" />
          </section>
          <section>
            <p className="form-disclaimer">
              I hereby affirm that all information provided above is accurate to the best of my knowledge and belief, and I understand that this information will be considered material in the evaluation of quotations, bids and proposals.
            </p>
            <div className="row">
              <label>Date
                <input name="appDate" value={form.appDate} onChange={handleChange} type="date" />
              </label>
            </div>
          </section>
          <button type="submit" className="seller-btn">Send Application</button>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
