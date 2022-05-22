import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Link } from "react-router-dom";

export default function DataPeserta() {

    const [dataPegawai, setDataPegawai] = useState([]);

    useEffect(() => {
        if (dataPegawai.length == 0) {
            Api.getDataPegawai().then((response) => {
                setDataPegawai(response.data.data);
            });
        }
        $(document).ready(function(){
            setTimeout(function(){
                $('.dttable').DataTable();
                 } ,2000);
        });
    });

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Data Peserta</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a>Master</a></li>
                    <li className="breadcrumb-item active">Data Peserta</li>
                </ol>
            </div>
            <div className="col-12">
                <br></br>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <Link to="/master/dataPeserta" className="btn btn-sm bg-primary mb-3"><i
                            className="fas fa-plus-circle">Tambah
                            Data Peserta</i></Link>
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
                                                    <td>
                                                        <div className="btn-group">
                                                            <Link to={{
                                                                // pathname: 'edit/'+CryptoJS.AES.encrypt(JSON.stringify(data.id), 'my-secret-key@123').toString()
                                                                pathname: 'edit/'+data.id
                                                            }}>
                                                                <button type="button" className="btn bg-teal btn-xs" title="Edit" id="btnEdit">
                                                                    <i className="fas fa-pen"></i>
                                                                </button>
                                                            </Link>
                                                            <a href="#delModal" data-id="" data-toggle="modal">
                                                                <button type="button" className="btn bg-pink btn-xs" title="Hapus">
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </a>
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