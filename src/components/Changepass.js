import React, { useEffect, useState } from 'react';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {

    fetch(`http://localhost:9999/user/1`)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
      });

  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the form submission
    if (data?.pass !== password) {
      alert('Old password is wrong');
      return
    }
    if (newPassword !== confirmPassword) {
      // Passwords match, proceed with resetting password
      alert('Passwords do not match!');
    } else {
      // Passwords don't match, display error message
      alert('Successful');
      fetch(`http://localhost:9999/user/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          "name": data?.name,
          "pass": newPassword,
          "role": data?.role,
          "avatar": data?.avatar,
          "email": data?.email,
          "phone": data?.phone,
          "address": data?.address,
          "dob": data?.dob
        }),


      })
        .then((response) => response.json())
        .then((data) => {
          // Xử lý kết quả trả về từ server ở đây
          // Ví dụ: hiển thị thông báo thành công hoặc thất bại
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
          console.log(data);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }
    // Reset form fields

  };

  return (
    <form onSubmit={handleSubmit} style={{margin:"auto", marginTop:"15%", border:"1px solid black", width:"fit-content", padding:"15px"}}>
      <div className="form-group">
        <h1>Change password</h1>
        <label htmlFor="password">Old password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          className="form-control"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{marginTop:"20px"}}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{marginTop:"20px"}}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>Reset Password</button>
    </form>
  );
};

export default ResetPasswordForm;
