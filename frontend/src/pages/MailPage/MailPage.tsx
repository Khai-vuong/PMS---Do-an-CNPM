import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination";
import "./MailPage.css";

interface MailDTO {
  mid: string;
  mrid: string;
  tid: string;
  content: string;
  category: string;
}

interface PageMetaDTO {
  pageCount: number;
  pageSize: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface MailPageDTO {
  data: MailDTO[];
  metadata: PageMetaDTO;
}

const MailPage: React.FC = () => {
  const [mailData, setMailData] = useState<MailPageDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  const fetchPage = async (page: number) => {
    try {
      const response = await axios.get("http://localhost:4000/mail", {
        params: {
          page,
          pageSize: 5, // Adjust page size as needed
        },
      });
      setMailData(response.data);
    } catch (error) {
      console.error("Error fetching mail data:", error);
    }
  };

  const renderItem = (mail: MailDTO) => {
    return (
      <div key={mail.mid} className="mail-item">
        <h3>{mail.category}</h3>
        <p>{mail.content}</p>
        <p>Task ID: {mail.tid}</p>
        <p>Merge Request ID: {mail.mrid}</p>
      </div>
    );
  };

  const keySelector = (mail: MailDTO) => mail.mid;

  return (
    <div className="mail-page">
      <Header inforName="User Name" />
      <div className="mail-content">
        <h1>Mail Page</h1>
        {mailData ? (
          <Pagination
            ListDTO={mailData}
            fetchPage={fetchPage}
            renderItem={renderItem}
            keySelector={keySelector}
          />
        ) : (
          <p>Loading mail data...</p>
        )}
      </div>
    </div>
  );
};

export default MailPage;