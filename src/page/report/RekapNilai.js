import { useEffect, useState } from "react";
import Api from "../../api/Api";
import Spinner from "../loading/Spinner";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RekapNilai() {

    const [fitProper, setFitProper] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    var id = '';

    useEffect(() => {
        if (fitProper.length === 0) {
            Api.getFitProper().then((res) => {
                if (res.status === 200) {
                    setFitProper(res.data.data);
                    setIsLoading(true);
                }
            });
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 1000);
        });
    });

    if (isLoading) {
        return (
            <div className="row mb-2">
                <ToastContainer />
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Rekap Nilai</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Report</li>
                        <li className="breadcrumb-item active">Rekap Nilai</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="dt-responsive table-responsive">
                                <table className="table table-striped table-bordered nowrap dttable">
                                    <thead>
                                        <tr>
                                            <th>NIP</th>
                                            <th>Nama</th>
                                            <th>Tanggal Fit & Proper</th>
                                            <th>Proyeksi</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fitProper.map((data, index) => {
                                            id = data.id;
                                            return (
                                                <tr key={index}>
                                                    <td>{data.attributes.idPeserta.data.attributes.NIP}</td>
                                                    <td>{data.attributes.idPeserta.data.attributes.namaPegawai}</td>
                                                    <td>{data.attributes.tanggalFitProper}</td>
                                                    <td>{data.attributes.proyeksi}</td>
                                                    <td>
                                                        <NavLink
                                                            to={{
                                                                pathname: '/report/rekap-nilai/' + data.id
                                                            }}
                                                            className="btn btn-xs btn-info"
                                                            title="Lihat Nilai"
                                                        >
                                                            <i className="fas fa-eye"></i> Lihat Nilai
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
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