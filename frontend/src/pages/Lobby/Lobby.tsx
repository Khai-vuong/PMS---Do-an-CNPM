import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import axios from 'axios';

import Header from '../../components/Header/Header';
import Pmconsole from '../../components/PMconsole/Pmconsole';
import Pagination from '../../components/Pagination';
import './Lobby.css';
import { LobbyUserDTO } from '../../DTOs/LobbyUser.dto';
import { LobbyProjectDTO } from '../../DTOs/LobbyProject.dto';
import { LobbyTaskDTO, TaskDTO } from '../../DTOs/LobbyTask.dto';

const Lobby: React.FC = () => {


    const [searchParams] = useSearchParams();

    const [pid] = useState(searchParams.get("pid"));
    const [userData, setUserData] = useState<LobbyUserDTO | null>(null);
    const [projectData, setProjectData] = useState<LobbyProjectDTO | null>(null);
    const [taskData, setTaskData] = useState<LobbyTaskDTO<TaskDTO> | null>(null);

    //Get initial data
    useEffect(() => {
        const pid = searchParams.get("pid");

        axios.get(`http://localhost:4000/lobby/init/?pid=${pid}`) // lobby/init Query pid
            .then(response => {

                console.log(response.data);

                const { username, role } = response.data;
                setUserData({ username, role });

                const { pname, pdescription, pmodel, pphase } = response.data;
                setProjectData({ pname, pdescription, pmodel, pphase });

                //Continue work here

                setTaskData(response.data.PageDTO);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const fetchPage = async (currentPage: number) => {
        try {
            const response = await axios.get(`http://localhost:4000/lobby/tasks/?pid=${pid}&page=${currentPage}&pageSize=5`);
            setTaskData(response.data);

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const renderItem = (item: TaskDTO) => {
        return (
            <div key={item.tid} className='taskItem-lobby' onClick={taskCLickHandling}>
                {item.name}    {item.description}        {item.assignee}
            </div>
        );
    };
    //Continue work here
    const taskCLickHandling = () => { };

    const keySelector = (item: TaskDTO) => {
        return item.tid;
    };

    const pullAllCode = () => {
        if (confirm('This will pull all files from this project, are you sure?')) {
            alert('Pulling code is in progress');
        }
        else {
            alert('Pulling code is canceled');
        }
    };

    return (
        <>
            <div className="entire-lobby">
                <div className="header-lobby">
                    <Header inforName={userData?.username || ''} />
                </div>
                <div className="body-lobby">
                    <div className="sidebar-lobby">
                        <h1>{projectData?.pname}</h1>
                        <h3>{projectData?.pdescription}</h3>
                    </div>
                    <div className="maincontent-lobby">

                        {userData?.role === "Project Manager" && (
                            <div className="pm-console-lobby">
                                <Pmconsole pid={pid || ''} />
                            </div>
                        )}
                        <div className="filezone-lobby">
                            <h1>filezone</h1>
                            <button onClick={pullAllCode}>Pull the code</button>
                        </div>
                        <div className="tasklist-lobby">
                            <h1>tasklist</h1>
                            <Pagination ListDTO={taskData || { data: [], metadata: { pageCount: 0, pageSize: 0, currentPage: 0, hasPreviousPage: false, hasNextPage: false } }}
                                fetchPage={fetchPage}
                                renderItem={renderItem}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lobby;