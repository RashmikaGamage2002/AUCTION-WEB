import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile, changePassword, uploadAvatar } from "../api/user";

export default function Profile() {
  const { token, user, updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", birthday: "", contactNumber: "", email: "", homeAddress: "", paymentDetails: {} });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const p = await getProfile(token);
        setForm(p);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateProfile(token, form);
      updateUser(updated);
      toast.success("Profile saved");
    } catch (err) { toast.error("Save failed: " + err.message); }
    setLoading(false);
  };

  const upload = async () => {
    if (!avatar) return alert("Choose file");
    setLoading(true);
    try {
      const updated = await uploadAvatar(token, avatar);
      updateUser(updated);
      toast.success("Avatar uploaded");
    } catch (err) { toast.error("Upload failed: " + err.message); }
    setLoading(false);
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <form onSubmit={save}>
        <label>Name<input name="name" value={form.name||""} onChange={e=>setForm({...form, name: e.target.value})} /></label>
        <label>Birthday<input type="date" name="birthday" value={form.birthday||""} onChange={e=>setForm({...form, birthday: e.target.value})} /></label>
        <label>Contact Number<input name="contactNumber" value={form.contactNumber||""} onChange={e=>setForm({...form, contactNumber: e.target.value})} /></label>
        <label>Email<input name="email" value={form.email||""} onChange={e=>setForm({...form, email: e.target.value})} /></label>
        <label>Address<input name="homeAddress" value={form.homeAddress||""} onChange={e=>setForm({...form, homeAddress: e.target.value})} /></label>
        <label>Payment JSON<textarea value={JSON.stringify(form.paymentDetails||{})} onChange={e=>{try{setForm({...form, paymentDetails: JSON.parse(e.target.value)})}catch{}}} /></label>
        <button type="submit" disabled={loading}>Save</button>
      </form>

      <div>
        <h3>Avatar</h3>
        <input type="file" onChange={e=>setAvatar(e.target.files[0])} />
        <button onClick={upload} disabled={loading}>Upload</button>
      </div>

      <div>
        <h3>Change Password</h3>
        <ChangePassword token={token} />
      </div>
    </div>
  );
}

function ChangePassword({ token }) {
  const [oldP,setOldP]=useState(""); const [newP,setNewP]=useState(""); const [c,setC]=useState("");
  const submit = async e => {
    e.preventDefault();
    if(newP!==c) return toast.error("Passwords do not match");
    try {
      const res = await fetch((import.meta.env.VITE_API_URL||"http://localhost:7172/api") + "/User/change-password", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type":"application/json" },
        body: JSON.stringify({ oldPassword: oldP, newPassword: newP })
      });
      if(!res.ok) throw new Error(await res.text());
      toast.success("Password changed");
      setOldP(""); setNewP(""); setC("");
    } catch(err){
      toast.error("Change password failed: " + err.message);
    }
  };
  return (
    <form onSubmit={submit}>
      <input placeholder="Old password" type="password" value={oldP} onChange={e=>setOldP(e.target.value)} />
      <input placeholder="New password" type="password" value={newP} onChange={e=>setNewP(e.target.value)} />
      <input placeholder="Confirm" type="password" value={c} onChange={e=>setC(e.target.value)} />
      <button type="submit">Change password</button>
    </form>
  );
}
