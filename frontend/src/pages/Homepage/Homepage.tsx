//Homepage version made by V.Q.Khai
import React from 'react';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const routeToLogin = () => {
    navigate('/login', { replace: true });
};

const routeToSignup = () => {
    navigate('/signup', { replace: true });
};


// const Homepage = () => {
//     return (
//         <>
//             <div className="header">
//                 <img src="" alt="ICON" />
//                 <div className="buttons">
//                     <button className="login-bt" onClick={routeToLogin}>Login</button>
//                     <button className="signup-bt" onClick={routeToSignup}>Signup</button>
//                 </div>
//             </div>

//             <div className="body">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>MSSV</th>
//                             <th>Họ và tên</th>
//                             <th>Công việc</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>2211562</td>
//                             <td>Vương Quang Khải</td>
//                             <td>Team leader / PM</td>
//                         </tr>
//                         <tr>
//                             <td>2213316</td>
//                             <td>Lê Văn Thoại</td>
//                             <td>Frontend dev</td>
//                         </tr>
//                         <tr>
//                             <td>2113786</td>
//                             <td>Dương Trọng Khôi</td>
//                             <td>Frontend dev</td>
//                         </tr>
//                         <tr>
//                             <td>2212935</td>
//                             <td>Đoàn Ngọc Hoàng Sơn</td>
//                             <td>Backend dev</td>
//                         </tr>
//                         <tr>
//                             <td>2213772</td>
//                             <td>Lê Đức Anh Tuấn</td>
//                             <td>Backend dev</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             <div className="quote">
//                 Coded with love and depression
//             </div>
//         </>



//     );
// };

const Homepage = () => {
    return (
        <h1>Hello</h1>
    )
}

export default Homepage;