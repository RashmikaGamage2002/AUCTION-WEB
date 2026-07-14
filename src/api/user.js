const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7172/api";

export async function getProfile(token) {
  const res = await fetch(`${API_URL}/User/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateProfile(token, data) {
  const res = await fetch(`${API_URL}/User`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function changePassword(token, oldPassword, newPassword) {
  const res = await fetch(`${API_URL}/User/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function uploadAvatar(token, file) {
  const form = new FormData();
  form.append("avatar", file);
  const res = await fetch(`${API_URL}/User/avatar`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}