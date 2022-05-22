import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Add() {

    const [dataPegawai, setDataPegawai] = useState([]);
    const [klik, setKlik] = useState(false);

    useEffect(() => {
        if (dataPegawai.length == 0) {
            Api.getDataPegawai().then((response) => {
                setDataPegawai(response.data.data);
            });
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 2000);
        });
    });

    const nav = useNavigate();

    const handlerClick = e => {
        e.preventDefault();
        console.log(e.target.name);
        Api.updateRolePenguji(e.target.name).then((response) => {
            if(response.status == 200){
                Api.addPenguji(e.target.name).then((response) => {
                    if(response.status == 200){
                        alert("Berhasil menambah data penguji");
                        nav('/master/dataPenguji');
                    }
                })
            }
        })
    }

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Tambah Data Penguji</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">Master</li>
                    <li className="breadcrumb-item">Data Penguji</li>
                    <li className="breadcrumb-item">Tambah Data Penguji</li>
                </ol>
            </div>
            <div className="col-12">
                <br></br>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <Link to="/master/dataPenguji" className="btn btn-sm bg-primary mb-3"><i
                            className="fas fa-arrow-circle-left">Kembali</i></Link>
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
                                        if (data.attributes.role == 'Peserta') {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.attributes.namaPegawai}</td>
                                                    <td>{data.attributes.NIP}</td>
                                                    <td>{data.attributes.jabatan.data.attributes.namaJabatan}</td>
                                                    <td>{data.attributes.grade}</td>
                                                    <td>{data.attributes.jenjang}</td>
                                                    <td>{data.attributes.role}</td>
                                                    <td style={{width: 100}}><input className="btn btn-primary btn-sm" style={{width: 100}} name={data.id} value="Tambah" onClick={handlerClick} readOnly /></td>
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
        </div >
    );
}