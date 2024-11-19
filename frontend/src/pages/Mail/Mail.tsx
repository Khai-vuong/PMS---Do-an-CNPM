import React from "react";
import "./Mail.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { MailDto } from "../../../DTOs/mail.dto"
import MRbuttons from "../../components/MR-buttons/MRbuttons";
import Header from "../../components/Header/Header";

const Mail: React.FC = () => {
    const [mails, setMails] = useState<MailDto[]>([]); 
    
    useEffect(() => {
        axios
          .get("/mails/init")
          .then((response) => {
             setMails(response.data); 
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
          });
      }, []);
  
    return (
        <>
        <Header inforName="Dương Trọng Khôi"/>
            <div className="mail-container">
           
            {mails.length === 0 ? (
     
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Không có mail nào
          </div>
        ) : (
   
          mails.map((mail) => (
            <form key={mail.mid} className="mail-form">
              <div className="mail-content">
                <label htmlFor={`content-${mail.mid}`}>Mail Content:</label>
                <textarea
                  id={`content-${mail.mid}`}
                  value={mail.content || ""}
                  readOnly
                  rows={10}
                  cols={50}
                />
              </div>

        
              {mail.category === "MR" && (
                <div className="mr-buttons-container">
                  <MRbuttons tid={mail.tid || ""} mrid={mail.mrid || ""} />
                </div>
              )}
            </form>
          ))
        )}
      </div>
    </>
  );
};

  
  
export default Mail;