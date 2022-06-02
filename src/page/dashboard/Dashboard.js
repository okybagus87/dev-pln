import { useEffect, useState } from "react";
import Api from "../../api/Api";
import Spinner from "../loading/Spinner";

export default function Dashboard() {

    const [pegawai, setPegawai] = useState([]);
    const [fitProper, setFitProper] = useState([]);
    const [wawancara, setWawancara] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    var peserta = [];
    var penguji = [];

    useEffect(() => {
        if (peserta.length === 0) {
            Api.getDataPegawai().then((res) => {
                if (res.status === 200) {
                    setPegawai(res.data.data);
                    Api.getFitProper().then((res) => {
                        if(res.status === 200){
                            setFitProper(res.data.data);
                            Api.getWawancara().then((res) => {
                                if(res.status === 200){
                                    setWawancara(res.data.data);
                                    setIsLoading(true);
                                }
                            })
                        }
                    })
                }
            });
        }
    });

    pegawai.forEach((data) => {
        if(data.attributes.role === 'Peserta'){
            peserta.push({value: data.id, label: data.attributes.NIP});
        }
        else if(data.attributes.role === 'Penguji'){
            penguji.push({value: data.id, label: data.attributes.NIP});
        }
    });

    if (isLoading) {
        return (
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Dashboard</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Dashboard v1</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{peserta.length}</h3>
                                    <p>Peserta</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-male"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{penguji.length}</h3>
                                    <p>Penguji</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-male"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{fitProper.length}</h3>
                                    <p>Peserta Fit & Proper</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-desktop"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{wawancara.length}</h3>
                                    <p>Peserta Wawancara</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-calendar-day"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <Spinner />
        );
    }
}