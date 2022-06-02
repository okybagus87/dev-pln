import { useEffect, useState } from 'react';
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import Api from '../../../api/Api';
import Spinner from '../../loading/Spinner';

export default function Wawancara() {

    const [wawancara, setWawancara] = useState([]);
    const [fitProper, setFitProper] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [valForm, setValForm] = useState({
        idWawancara: '',
        tanggalWawancara: '',
        nilai: '',
        proyeksi: ''
    });

    var dataWawancara = [];
    var id;

    useEffect(() => {
        if (wawancara.length === 0 && fitProper.length === 0) {
            Api.getWawancara().then((response) => {
                if (response.status === 200) {
                    setWawancara(response.data.data);
                    Api.getFitProper().then((response) => {
                        if (response.status === 200) {
                            setFitProper(response.data.data);
                            setIsLoading(true);
                        }
                    })
                }
            });
        }
    });

    wawancara.forEach((data) => {
        fitProper.forEach((dt) => {
            if (data.attributes.fit_proper.data.id === dt.id) {
                dataWawancara.push({ value: data.id, label: dt.attributes.idPeserta.data.attributes.NIP + ' | ' + dt.attributes.idPeserta.data.attributes.namaPegawai });
            }
        })
        // Api.getFitProperById(data.attributes.fit_proper.data.id).then((response) => {
        //     dataWawancara.push({ value: data.id, label: response.data.data.attributes.idPeserta.data.attributes.namaPegawai + ' | ' + data.attributes.fit_proper.data.attributes.proyeksi });
        //     setIsLoading(true);
        // });
    });

    const handlerSelectChange = (val) => {
        id = val.value;
        Api.getWawancaraById(id).then((response) => {
            if (response.status === 200) {
                setValForm({
                    ...valForm,
                    idWawancara: val,
                    tanggalWawancara: response.data.data.attributes.tanggalWawancara,
                    proyeksi: response.data.data.attributes.fit_proper.data.attributes.proyeksi,
                });
            }
        });
    }

    const onSubmit = () => {
        setIsLoading(false);
        Api.nilaiWawancara(valForm).then((res) => {
            if (res.status === 200) {
                setIsLoading(true);
                toast.success('Berhasil memberi nilai wawancara');
                setValForm({
                    ...valForm,
                    idWawancara: '',
                    tanggalWawancara: '',
                    nilai: '',
                    proyeksi: ''
                });
            }
        });
    }

    if (isLoading) {
        return (
            <div className="row mb-2">
                <ToastContainer />
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Penilaian Wawancara</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Fit & Proper</li>
                        <li className="breadcrumb-item active">Wawancara</li>
                        <li className="breadcrumb-item active">Penilaian</li>
                    </ol>
                </div>
                <div className="col-sm-12">
                    <br></br>
                </div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className='card-body'>
                            <div className='row'>
                                <div className="form-group col-12 col-sm-12">
                                    <label>Peserta Wawancara</label>
                                    <Select
                                        options={dataWawancara}
                                        value={valForm.idWawancara}
                                        onChange={handlerSelectChange.bind(this)}
                                    />
                                </div>
                                <div className='form-group col-12 col-sm-6'>
                                    <label>Tanggal Wawancara</label>
                                    <input type="text" className='form-control' value={valForm.tanggalWawancara} readOnly />
                                </div>
                                <div className='form-group col-12 col-sm-6'>
                                    <label>Proyeksi</label>
                                    <input type="text" className='form-control' value={valForm.proyeksi} readOnly />
                                </div>
                                <div className='form-group col-12 col-sm-6'>
                                    <label>Nilai Wawancara</label>
                                    <input type='number' className='form-control' value={valForm.nilai} onChange={(e) => setValForm({ ...valForm, nilai: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        {valForm.idWawancara !== '' && valForm.nilai !== '' ? (
                            <div className='card-footer'>
                                <button className='btn btn-primary' onClick={onSubmit}>Simpan</button>
                            </div>
                        ) : (
                            <div className='card-footer'>
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