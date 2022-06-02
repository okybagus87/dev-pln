import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../../../api/Api";

export default function Edit() {

    const [dataPegawai, setDataPegawai] = useState([]);
    const [data, setData] = useState({
        namaPegawai: '',
        NIP: ''
    });
    let { id } = useParams();

    useEffect(() => {
        if (dataPegawai.length === 0) {
            Api.getDataPegawaiById(id).then((response) => {
                setDataPegawai(response.data.data);
                setData({
                    namaPegawai: response.data.data.attributes.namaPegawai,
                    NIP: response.data.data.attributes.NIP
                });
            })
        }
    });

    const handlerchange = e => {
        setData({ [e.target.name]: e.target.value });
    }

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Edit Data Peserta</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">Master</li>
                    <li className="breadcrumb-item">Data Peserta</li>
                    <li className="breadcrumb-item">Edit Data Peserta</li>
                </ol>
            </div>
            <div className="col-sm-12">
                <br></br>
            </div>
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <Link to="/master/dataPeserta" className="btn btn-sm btn-primary mb-3"><i
                            className="fas fa-arrow-circle-left"> Kembali</i></Link>
                        <div className="form-group">
                            <label>NIP</label>
                            <input type="text" className="form-control" id="name" value={data.NIP} onChange={handlerchange} name="namaPegawai" placeholder="Masukkan nama" />
                            <input type="text" name="id" hidden />
                        </div>
                        <div className="form-group">
                            <label>Nama</label>
                            <input type="text" className="form-control" id="name" value={data.namaPegawai} onChange={handlerchange} name="namaPegawai" placeholder="Masukkan nama" />
                            <input type="text" name="id" hidden />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}