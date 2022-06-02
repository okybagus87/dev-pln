import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../loading/Spinner";

export default function Penilaian() {

    const [fitProper, setFitProper] = useState([]);
    const [penguji, setPenguji] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [valForm, setValForm] = useState({
        tanggalFitProper: '',
        proyeksi: '',
        jenis: '',
        jenjangProyeksi: '',
        nama: '',
        penguji: '',
        jenisNilai: ''
    });
    const [nilai, setNilai] = useState({
        enthusiasthic: '',
        creative: '',
        partnership: '',
        bsn_acumen: '',
        cust_focus: '',
        empowering: '',
        driving_execution: '',
        internal: '',
        external: '',
        pemasaran: '',
        keteknisian: '',
        k3l: '',
        kontribusi_kpi: ''
    });
    const simpan = () => {
        Api.addNilaiKc(nilai, valForm).then((response) => {
            if (response.status === 200) {
                Api.addNilaiPe(nilai, valForm).then((response) => {
                    if (response.status === 200) {
                        Api.addNilaiPj(nilai, valForm).then((response) => {
                            if (response.status === 200) {
                                toast.success('Berhasil memberi nilai');
                                setNilai({
                                    ...nilai,
                                    enthusiasthic: '',
                                    creative: '',
                                    partnership: '',
                                    bsn_acumen: '',
                                    cust_focus: '',
                                    empowering: '',
                                    driving_execution: '',
                                    internal: '',
                                    external: '',
                                    pemasaran: '',
                                    keteknisian: '',
                                    k3l: '',
                                    kontribusi_kpi: ''
                                });
                                setValForm({
                                    ...valForm,
                                    tanggalFitProper: '',
                                    proyeksi: '',
                                    jenis: '',
                                    jenjangProyeksi: '',
                                    nama: '',
                                    penguji: '',
                                    jenisNilai: ''
                                })
                            }
                        })
                    }
                })
            }
        });
    }

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
                    })
                })
            }
            setValForm({
                ...valForm,
                proyeksi: dt.proyeksi,
                jenjangProyeksi: dt.jenjang_proyeksi,
                jenis: dt.jenis,
                tanggalFitProper: dt.tanggalFitProper,
                nama: val,
                penguji: ''
            })
        });
    }

    const handlerInput = e => {
        setNilai({ ...nilai, [e.target.name]: e.target.value });
    }

    penguji.forEach((data) => {
        data.attributes.id_fit_propers.data.forEach((d) => {
            if (d.id === valForm.nama.value) {
                dataPenguji.push({ value: data.id, label: data.attributes.id_penguji.data.attributes.namaPegawai });
            }
            else {

            }
        });
    });

    if (isLoading) {
        return (
            <div className="row mb-2">
                <ToastContainer />
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Penilaian Fit Proper</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Fit & Proper</li>
                        <li className="breadcrumb-item active">Penilaian</li>
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
                                        value={valForm.nama}
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
                                    <input type="text" className="form-control" readOnly value={valForm.tanggalFitProper} />
                                </div>
                                <div className="form-group col-sm-6 col-12">
                                    <label>Jenis</label>
                                    <input type="text" className="form-control" readOnly value={valForm.jenis} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6 col-12">
                                    <label>Proyeksi</label>
                                    <input type="text" className="form-control" readOnly value={valForm.proyeksi} />
                                </div>
                                <div className="form-group col-sm-6 col-12">
                                    <label>Jenjang Proyeksi</label>
                                    <input type="text" className="form-control" readOnly value={valForm.jenjangProyeksi} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <label>Jenis Nilai</label>
                                    <select name="jenisNilai" className="form-control" value={valForm.jenisNilai} onChange={(e) => setValForm({ ...valForm, jenisNilai: e.target.value })}>
                                        <option value='asd'>-- Pilih Jenis Nilai --</option>
                                        <option value="kc">Key Competency</option>
                                        <option value="pe">Personal Endurance</option>
                                        <option value="pj">Proyeksi Jabatan</option>
                                    </select>
                                </div>
                            </div>
                            {valForm.jenisNilai === 'kc' ? (
                                <div className="row">
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Enthusiasthic for Challenge</label>
                                        <input type="number" className="form-control" value={nilai.enthusiasthic} name="enthusiasthic" onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Creative and Innovative</label>
                                        <input type="number" className="form-control" name="creative" value={nilai.creative} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Bulding Business Partnership</label>
                                        <input type="number" className="form-control" name="partnership" value={nilai.partnership} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Business Acumen</label>
                                        <input type="number" className="form-control" name="bsn_acumen" value={nilai.bsn_acumen} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Customer Focus Oriented</label>
                                        <input type="number" className="form-control" name="cust_focus" value={nilai.cust_focus} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Driving Execution</label>
                                        <input type="number" className="form-control" name="driving_execution" value={nilai.driving_execution} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Empowering / Developing Others</label>
                                        <input type="number" className="form-control" name="empowering" value={nilai.empowering} onChange={handlerInput} />
                                    </div>
                                </div>
                            ) : valForm.jenisNilai === 'pe' ? (
                                <div className="row">
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Internal Readness</label>
                                        <input type="number" className="form-control" name="internal" value={nilai.internal} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>External Readness</label>
                                        <input type="number" className="form-control" name="external" value={nilai.external} onChange={handlerInput} />
                                    </div>
                                </div>
                            ) : valForm.jenisNilai === 'pj' ? (
                                <div className="row">
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Pemasaran dan Niaga</label>
                                        <input type="number" className="form-control" name="pemasaran" value={nilai.pemasaran} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Keteknisian</label>
                                        <input type="number" className="form-control" name="keteknisian" value={nilai.keteknisian} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>K3L</label>
                                        <input type="number" className="form-control" name="k3l" value={nilai.k3l} onChange={handlerInput} />
                                    </div>
                                    <div className="form-group col-sm-6 col-12">
                                        <label>Kontribusi Terhadap KPI dan Kontrak</label>
                                        <input type="number" className="form-control" name="kontribusi_kpi" value={nilai.kontribusi_kpi} onChange={handlerInput} />
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        {nilai.bsn_acumen !== '' && nilai.creative !== '' && nilai.cust_focus !== '' && nilai.driving_execution !== '' && nilai.empowering !== '' && nilai.enthusiasthic !== '' && nilai.external !== '' && nilai.internal !== '' && nilai.k3l !== '' && nilai.keteknisian !== '' && nilai.kontribusi_kpi !== '' && nilai.partnership !== '' && nilai.pemasaran !== '' && valForm.penguji !== '' && valForm.nama !== '' ? (
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={simpan}>Simpan</button>
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