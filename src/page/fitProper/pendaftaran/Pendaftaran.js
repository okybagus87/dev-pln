import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../loading/Spinner";

export default function Pendaftaran() {

    const [pegawai, setPegawai] = useState([]);
    const [jabatan, setJabatan] = useState([]);
    const [penguji, setPenguji] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [dataPegawai, setDataPegawai] = useState({
        nama: '',
        jabatan: '',
        grade: '',
    });

    const [dataPush, setDataPush] = useState({
        tanggalFitProper: '',
        proyeksi: '',
        jenis: '',
        idPeserta: '',
        pengujis: '',
        jenjang_proyeksi: '',
        NIP: ''
    });

    var NIP = [];
    var jbt = [];
    var pgj = [];
    var id;

    useEffect(() => {
        if (pegawai.length === 0 && jabatan.length === 0 && penguji.length === 0) {
            Api.getDataPegawai().then((response) => {
                setPegawai(response.data.data);
                Api.getJabatan().then((response) => {
                    setJabatan(response.data.data);
                    Api.getPenguji().then((response) => {
                        setPenguji(response.data.data);
                        setIsLoading(true);
                    });
                });
            });
        }
    });

    pegawai.forEach((data) => {
        if (data.attributes.role === 'Peserta') {
            NIP.push({ value: data.id, label: data.attributes.NIP + ' | ' + data.attributes.namaPegawai });
        }
    });

    jabatan.forEach((data) => {
        jbt.push({ value: data.attributes.namaJabatan, label: data.attributes.namaJabatan });
    });

    penguji.forEach((data) => {
        pgj.push({ value: data.id, label: data.attributes.id_penguji.data.attributes.namaPegawai });
    });

    const handlerSelectChange = (val) => {
        id = val.value;
        setDataPush({ ...dataPush, idPeserta: id, NIP: val });
        Api.getDataPegawaiById(id).then((response) => {
            setDataPegawai(
                {
                    ...dataPegawai, nama: response.data.data.attributes.namaPegawai,
                    jabatan: response.data.data.attributes.jabatan.data.attributes.namaJabatan,
                    grade: response.data.data.attributes.grade
                }
            );
        });
    }

    const onSubmit = () => {
        setIsLoading(false);
        Api.addFitProper(dataPush).then((response) => {
            if (response.status === 200) {
                setIsLoading(true);
                toast.success('Berhasil menambahkan Fit & Proper');
                setPegawai([]);
                setDataPegawai({
                    ...dataPegawai,
                    nama: '',
                    jabatan: '',
                    grade: ''
                });
                setDataPush({
                    ...dataPush,
                    tanggalFitProper: '',
                    proyeksi: '',
                    jenis: '',
                    idPeserta: '',
                    pengujis: '',
                    jenjang_proyeksi: '',
                    NIP: ''
                });
            }
        });
    }

    if (isLoading) {
        return (
            <div className="row mb-2">
                <ToastContainer />
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Pendaftaran / Updating Peserta Fit Proper</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Fit & Proper</li>
                        <li className="breadcrumb-item active">Pendaftaran</li>
                    </ol>
                </div>
                <div className="col-sm-12">
                    <br></br>
                </div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-12 col-sm-6">
                                    <label>NIP</label>
                                    <Select
                                        options={NIP}
                                        value={dataPush.NIP}
                                        onChange={handlerSelectChange.bind(this)}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Proyeksi Jabatan</label>
                                    <Select
                                        options={jbt}
                                        value={dataPush.proyeksi}
                                        onChange={(value) => setDataPush({ ...dataPush, proyeksi: value })}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Nama</label>
                                    <input type="text" name="nama" value={dataPegawai.nama} readOnly className="form-control nama" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Jenjang Jabatan</label>
                                    <Select
                                        options={jbt}
                                        value={dataPush.jenjang_proyeksi}
                                        onChange={(value) => setDataPush({ ...dataPush, jenjang_proyeksi: value })}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Jabatan</label>
                                    <input type="text" name="jabatan" value={dataPegawai.jabatan} readOnly className="form-control jabatan" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Date</label>
                                    <input type="date" name="tanggal" value={dataPush.tanggalFitProper} onChange={(e) => setDataPush({ ...dataPush, tanggalFitProper: e.target.value })} className="form-control date" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Grade</label>
                                    <input type="text" name="grade" value={dataPegawai.grade} readOnly className="form-control grade" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Penguji</label>
                                    <Select
                                        options={pgj}
                                        value={dataPush.pengujis}
                                        onChange={(value) => setDataPush({ ...dataPush, pengujis: value })}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Pilih Urjab</label>
                                    <input type="text" name="grade" className="form-control urjab" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Jenis Fit & Proper</label>
                                    <select name="jenis" className="form-control" value={dataPush.jenis} onChange={(e) => setDataPush({ ...dataPush, jenis: e.target.value })}>
                                        <option value=''>-- Pilih Jenis --</option>
                                        <option value="Reguler">Reguler</option>
                                        <option value="Vcon">Vcon</option>
                                    </select>
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Upload PPT *.ppt/.pptx</label>
                                    <input type="file" name="grade" className="form-control ppt" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Upload CV *.doc/docx</label>
                                    <input type="file" name="grade" className="form-control doc" />
                                </div>
                            </div>
                        </div>
                        {dataPush.NIP !== '' && dataPush.tanggalFitProper !== '' && dataPush.jenis !== '' && dataPush.pengujis !== '' && dataPush.proyeksi !== '' && dataPush.jenjang_proyeksi !== '' ? (
                            <div className="card-footer">
                                <button onClick={onSubmit} className="btn btn-primary">Simpan</button>
                            </div>
                        ) : (
                            <div className="card-footer">
                                <p>*Isi semua form yang dibutuhkan</p>
                            </div>
                        )}
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