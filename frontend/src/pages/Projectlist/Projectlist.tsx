import "./Projectlist.css";

const Projectlist = () => {
  return (
    <>
      <div className="container-list">
        <div className="title">
          <h1>Project List</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Model</th>
              <th>Phase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2211562</td>
              <td>Vương Quang Khải</td>
              <td>Team leader / PM</td>
              <td>cc</td>
            </tr>
            <tr>
              <td>2213316</td>
              <td>Lê Văn Thoại</td>
              <td>Frontend dev</td>
              <td>cc</td>
            </tr>
            <tr>
              <td>2113786</td>
              <td>Dương Trọng Khôi</td>
              <td>Frontend dev</td>
              <td>cc</td>
            </tr>
            <tr>
              <td>2212935</td>
              <td>Đoàn Ngọc Hoàng Sơn</td>
              <td>Backend dev</td>
              <td>cc</td>
            </tr>
            <tr>
              <td>2213772</td>
              <td>Lê Đức Anh Tuấn</td>
              <td>Backend dev</td>
              <td>cc</td>
            </tr>
          </tbody>
        </table>

        <div className="create-button">
          <a href="">Create Project</a>
        </div>
      </div>
    </>
  );
};
export default Projectlist;
