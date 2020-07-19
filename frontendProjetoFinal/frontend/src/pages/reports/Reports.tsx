import React, {useState, ChangeEvent, useEffect} from 'react';
import './Reports.css';
import HeaderComponent from './../../components/header/Header';
import FooterComponent from './../../components/footer/Footer';
import api from './../../service/api';

interface APIReportsResponse {
    count: number,
    next: null | number,
    preview: null | number,
    results: [],
}

interface Report {
    archived: boolean,
    author: string,
    coleted_by: number,
    count_of_events: number,
    created_at: string,
    details: string,
    id: number,
    log: string,
    title: string,
    type_of: string,
}

const Reports = () => {
    const [searchInput, setSearchInput] = useState("");
    const hash = localStorage.getItem('@stone-report/hash');
    const [listOfReports, setListOfReports] = useState<Report[]>([])

    useEffect(() => {
        api.get<APIReportsResponse>('reports/', { headers: { Authorization: `Token ${hash}`}}).then(response => {
            const list = response.data.results;
            setListOfReports(list);
        })
    }, []);

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const inputText = event.target.value;
        setSearchInput(inputText);
    }
    return (
        <>
            <HeaderComponent />
            <main className="superContainer">
                <h1 className="pageTitle">Reports</h1>

                <p>Busque por nome de usuário ou palavra:</p>

                <input 
                    type="text" 
                    name="text" 
                    id="search" 
                    onChange={handleOnChange}
                    className="input"
                />
                {listOfReports.map(report => (
                    <span className="reportContainer" key={report.id}>
            
                        <div className="top">
                            <h3 className="username">{report.author}</h3>
                            <p className="datetime">{report.created_at}</p>
                            <p className="type_of">{report.type_of}</p>
                            <p className="count_event">Count of events: {report.count_of_events}</p>
                        </div>
    
                        <strong className="title">{report.title}</strong>
    
                        <p className="details">{report.details}</p>
                    </span>                    
                ))}
            </main>
            
            <FooterComponent />
        </>
    );
}

export default Reports;