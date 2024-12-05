import "./Pmconsole.css";
import axios from "axios";
import { authorize } from "passport";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  pid: string;
}

const Pmconsole: React.FC<HeaderProps> = ({ pid }) => {
  const [tasks, setTasks] = useState();
  const [displayMemberList, setDisplayMemberList] = useState(false);


  const navigate = useNavigate();

  const toCreateTask = (): void => {
    navigate(`/task/create/?pid=${pid}`);
  };

  const nextPhase = (): void => {
    axios
      .post(`http://localhost:4000/projects/NextPhase/?pid=${pid}`)
      .then((response) => {
        console.log("Next phase successful:", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi chuyển sang giai đoạn tiếp theo:", error);
      });
  };

  const toggleMemberList = (): void => {
    setDisplayMemberList(!displayMemberList);
    if (displayMemberList == true) {
      const members = getAllMember(pid);
    }
  };

  const transformToArray = (input: any): string[] => {
    const managerList = input.manager.map((name: string) => `${name} - manager`);
    const memberList = input.member.map((name: string) => `${name} - member`);
    return [...managerList, ...memberList];
  };

  const getAllMember = (pid: string): void => {
    axios
      .get(`http://localhost:4000/utils/member/?pid=${pid}`)
      .then((response) => {
        console.log("Members fetched successfully:", JSON.stringify(response.data));

        return transformToArray(response.data);

      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  };


  return (
    <>
      <div className="pm-container">
        <div className="pm-buttons">
          <div className="authorize" onClick={toggleMemberList} >Authorize</div>
          <div className="right-buttons">
            <div className="pm-create" onClick={toCreateTask}>Create task</div>
            <div className="next-phase" onClick={nextPhase}>Next Phase</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pmconsole;
