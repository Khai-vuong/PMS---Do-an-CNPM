import React from "react";
import { useEffect } from "react";
import "./MRbuttons.css";
import axios from "axios";
interface MrbuttonsProps {
  tid: string;
  mrid: string;
}
const MRbuttons: React.FC<MrbuttonsProps> = ({ tid, mrid }) => {  
  useEffect(() => {
    // Tạo một thẻ <link> để chèn Font Awesome
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
    const handleSearchClick = async () => {
        try {
          const response = await axios.get(`/file/fromTask?tid=${tid}`);
          console.log("Response data:", response.data);
          alert("File loaded successfully!");
        } catch (error) {
          console.error("Error fetching file:", error);
          alert("Failed to fetch file.");
        }
      };

    const handleApproveClick = async () => {
        try {
            const response = await axios.post(`/mr/approve?mnrid=${mrid}`);
            console.log("Approve response:", response.data);
            alert("Approved successfully!");
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve.");
        }
    };

    const handleDenyClick = async () => {
        try {
          const response = await axios.post(`/mr/deny?mnrid=${mrid}`);
          console.log("Deny response:", response.data);
          alert("Denied successfully!");
        } catch (error) {
          console.error("Error denying request:", error);
          alert("Failed to deny.");
        }
      };
    return (
    <>
        <div className="MRbutton-layout">
            <div className="search-button"  onClick={handleSearchClick}></div>
            <div className="approve-button" onClick={handleApproveClick}></div>
            <div className="deny-button" onClick={handleDenyClick}></div>
        </div>
    </>
  );
};

export default MRbuttons;
