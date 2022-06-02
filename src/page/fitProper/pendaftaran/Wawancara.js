import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../loading/Spinner";

export default function Wawancara() {

    const [fitProper, setFitProper] = useState([]);
    const [penguji, setPenguji] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [valForm, setValForm] = useState({
        tanggalWawancara: '',
        proyeksi: '',
        jenis: '',
        jenjangProyeksi: '',
        fitProper: '',
        penguji: '',
        tanggalFitProper: ''
    });

    var dataFit = [];
    var dataPenguji = [];
    var id;

    useEffect(() => {
        if (fitProper.length === 0) {
            Api.getFitProper().then((response) => {
                setFitProper(response.data.data);
                setIsLoading(true);
            });
        }
    });

    fitProper.forEach((data) => {
        dataFit.push({ value: data.id, label: data.attributes.idPeserta.data.attributes.NIP + ' | ' + data.attributes.idPeserta.data.attributes.namaPegawai });
    });

    const handlerSelectChange = (val) => {
        id = val.value;
        Api.getFitProperById(id).then((response) => {
            var dt = response.data.data.attributes;
            {
                dt.pengujis.data.forEach((d) => {
                    Api.getPenguji().then((response) => {
                        setPenguji(response.data.data);
                    });
                });
            }
            setValForm({
                ...valForm,
                proyeksi: dt.proyeksi,
                jenjangProyeksi: dt.jenjang_proyeksi,
                jenis: dt.jenis,
                tanggalFitProper: dt.tanggalFitProper,
                fitProper: val,
                penguji: ''
            })
        });
    }

    penguji.forEach((data) => {
        data.attributes.id_fit_propers.data.forEach((d) => {
            if(d.id === valForm.fitProper.value){
                dataPenguji.push({value: data.id, label: data.attributes.id_penguji.data.attributes.namaPegawai});
            }
            else{

            }
        });
        // if (data.attributes.id_fit_propers.data === []) {

        // }
        // else if (data.attributes.id_fit_propers.data.id === valForm.fitProper.value) {
        //     dataPenguji.push({ value: data.id, label: data.attributes.id_penguji.data.attributes.namaPegawai });
        // }
    });

    const onSubmit = () => {
        setIsLoading(false);
        Api.addWawancara(valForm).then((response) => {
            if (response.status === 200) {
                setIsLoading(true);
                toast.success('Berhasil menambah data wawancara');
                setValForm({
                    ...valForm,
                    tanggalWawancara: '',
                    proyeksi: '',
                    jenis: '',
                    jenjangProyeksi: '',
                    fitProper: '',
                    penguji: '',
                    tanggalFitProper: ''
                })
            }
            else {
                alert(response.error);
            }
        })
    }

    if (isLoading) {
        return (
            <div className="row mb-2">
                <ToastContainer />
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Pendafataran Wawancara</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Fit & Proper</li>
                        <li className="breadcrumb-item active">Wawancara</li>
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
                                    <label>Peserta Fit & Proper</label>
                                    <Select
                                        options={dataFit}
                                        value={valForm.fitProper}
                                        onChange={handlerSelectChange.bind(this)}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label>Penguji</label>
                                    <Select
                                        options={dataPenguji}
                                        value={valForm.penguji}
                                        onChange={(value) => setValForm({ ...valForm, penguji: value })}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6 col-12">
                                    <label>Tanggal Fit & Proper</label>
                                    <input type="text" name="tgl" value={valForm.tanggalFitProper} readOnly className="form-control" />
                                </div>
                                <div className="form-group col-sm-6 col-12">
                                    <label>Jenis</label>
                                    <input type="text" name="jenis" value={valForm.jenis} readOnly className="form-control" />
                                </div>
                                <div className="form-group col-sm-6 col-12">
                                    <label>Proyeksi</label>
                                    <input type="text" name="proyeksi" value={valForm.proyeksi} readOnly className="form-control" />
                                </div>
                                <div className="form-group col-sm-6 col-12">
                                    <label>Jenjang Proyeksi</label>
                                    <input type="text" name="jenjang_proyeksi" value={valForm.jenjangProyeksi} readOnly className="form-control" />
                                </div>
                                <div className="form-group col-sm-6 col-12">
                                    <label>Tanggal Wawancara</label>
                                    <input type="date" className="form-control" value={valForm.tanggalWawancara} onChange={(e) => setValForm({ ...valForm, tanggalWawancara: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        {valForm.nama !== '' && valForm.penguji !== '' && valForm.tanggalWawancara !== '' ? (
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={onSubmit}>Simpan</button>
                            </div>
                        ) : (
                            <div className="card-footer">
                                <p>*Isi semua form</p>
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