import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../loading/Spinner";

export default function Add() {

    const [dataPegawai, setDataPegawai] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (dataPegawai.length === 0) {
            Api.getDataPegawai().then((response) => {
                setDataPegawai(response.data.data);
                setIsLoading(true);
            });
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 1000);
        });
    });

    const nav = useNavigate();

    const handlerClick = (id) => {
        Api.updateRolePeserta(id).then((res) => {
            if(res.status === 200){
                nav('/master/dataPeserta');
                toast.success('Berhasil menambah peserta');
            }
        });
    }

    if (isLoading) {
        return (
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Tambah Data Peserta</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Master</li>
                        <li className="breadcrumb-item">Data Peserta</li>
                        <li className="breadcrumb-item">Tambah Data Peserta</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/master/dataPenguji" className="btn btn-sm bg-primary mb-3"><i
                                className="fas fa-arrow-circle-left"> Kembali</i></Link>
                            <div className="dt-responsive table-responsive">
                                <table className="table table-striped table-bordered nowrap dttable">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>NIP</th>
                                            <th>Jabatan</th>
                                            <th>Grade</th>
                                            <th>Jenjang</th>
                                            <th>Role</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPegawai.map((data, index) => {
                                            if (data.attributes.role !== 'Peserta') {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.attributes.namaPegawai}</td>
                                                        <td>{data.attributes.NIP}</td>
                                                        <td>{data.attributes.jabatan.data.attributes.namaJabatan}</td>
                                                        <td>{data.attributes.grade}</td>
                                                        <td>{data.attributes.jenjang}</td>
                                                        <td>{data.attributes.role}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button className="btn btn-primary btn-xs" onClick={() => handlerClick(data.id)}><i className="fas fa-plus-circle"></i> Tambah</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
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