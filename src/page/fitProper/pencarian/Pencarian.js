import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import Select from "react-select";
import Spinner from "../../loading/Spinner";

export default function Pencarian() {

    const [fitProper, setFitProper] = useState([]);
    const [nilaiKc, setNilaiKc] = useState([]);
    const [nilaiPe, setNilaiPe] = useState([]);
    const [nilaiPj, setNilaiPj] = useState([]);
    const [showNilai, setShowNilai] = useState(false);
    const [valSelect, setValSelect] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [valForm, setValForm] = useState({
        tanggalFitProper: '',
        proyeksi: '',
        jenis: '',
        jenjangProyeksi: '',
        nama: '',
        penguji: '',
        jenisNilai: '',
        nip: '',
        id: ''
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

    var dataFit = [];
    var id;

    useEffect(() => {
        if (fitProper.length === 0 && nilaiKc.length === 0 && nilaiPe.length === 0 && nilaiPj.length === 0) {
            Api.getFitProper().then((response) => {
                setFitProper(response.data.data);
                Api.getNilaiKc().then((response) => {
                    setNilaiKc(response.data.data);
                    Api.getNilaiPe().then((response) => {
                        setNilaiPe(response.data.data);
                        Api.getNilaiPj().then((response) => {
                            setNilaiPj(response.data.data);
                            setIsLoading(true);
                        });
                    });
                });
            });
        }
        if (nilai.enthusiasthic === '' && nilai.creative === '' && nilai.partnership === '' && nilai.bsn_acumen === '' && nilai.cust_focus === '' && nilai.empowering === '' && nilai.driving_execution === '') {
            nilaiKc.forEach((data) => {
                if (data.attributes.nilai_kc.data.id === valForm.id) {
                    var dt = data.attributes;
                    setTimeout(() => {
                        setNilai({
                            ...nilai,
                            enthusiasthic: dt.enthusiasthic,
                            creative: dt.creative,
                            partnership: dt.partnership,
                            bsn_acumen: dt.bsn_acumen,
                            cust_focus: dt.cust_focus,
                            empowering: dt.empowering,
                            driving_execution: dt.driving_execution
                        });
                    }, 1000);
                }
                else {
                    setTimeout(() => {
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
                    }, 1000);
                }
            });
        }
        else if (nilai.internal === '' && nilai.external === '') {
            nilaiPe.forEach((data) => {
                if (data.attributes.nilai_pe.data.id === valForm.id) {
                    var dt = data.attributes;
                    setTimeout(() => {
                        setNilai({
                            ...nilai,
                            internal: dt.internal,
                            external: dt.external
                        });
                    }, 1000);
                }
                else {
                    setTimeout(() => {
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
                    }, 1000);
                }
            });
        }
        else if (nilai.pemasaran === '' && nilai.keteknisian === '' && nilai.k3l === '' && nilai.kontribusi_kpi === '') {
            nilaiPj.forEach((data) => {
                if (data.attributes.nilai_pj.data.id === valForm.id) {
                    var dt = data.attributes;
                    setTimeout(() => {
                        setNilai({
                            ...nilai,
                            pemasaran: dt.pemasaran,
                            keteknisian: dt.keteknisian,
                            k3l: dt.k3l,
                            kontribusi_kpi: dt.kontribusi_kpi
                        });
                    }, 1000);
                }
                else {
                    setTimeout(() => {
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
                    }, 1000);
                }
            });
        }
    });

    fitProper.forEach((data) => {
        dataFit.push({ value: data.id, label: data.attributes.idPeserta.data.attributes.NIP + ' | ' + data.attributes.idPeserta.data.attributes.namaPegawai });
    });

    const handlerSelectChange = (val) => {
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
        setShowNilai(false);
        setValSelect(val);
        id = val.value;
        Api.getFitProperById(id).then((response) => {
            var dt = response.data.data.attributes;
            setValForm({
                ...valForm,
                proyeksi: dt.proyeksi,
                jenjangProyeksi: dt.jenjang_proyeksi,
                jenis: dt.jenis,
                tanggalFitProper: dt.tanggalFitProper,
                nip: dt.idPeserta.data.attributes.NIP,
                nama: dt.idPeserta.data.attributes.namaPegawai,
                id: response.data.data.id
            });
        });
    }

    if (isLoading) {
        return (
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Pencarian Fit & Proper</h1>
                </div>
                <div className="col-sm-12">
                    <br></br>
                </div>
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-12 col-sm-12">
                                    <label>Fit & Proper</label>
                                    <Select
                                        options={dataFit}
                                        value={valSelect}
                                        onChange={handlerSelectChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {valForm.nama !== '' ? (
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="dt-responsive table-responsive">
                                        <table className="table table-striped table-bordered nowrap dttable">
                                            <thead>
                                                <tr>
                                                    <th>NIP</th>
                                                    <th>Nama</th>
                                                    <th>Jenis</th>
                                                    <th>Proyeksi</th>
                                                    <th>Jenjang Proyeksi</th>
                                                    <th>Tanggal Uji</th>
                                                    <th>Nilai</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{valForm.nip}</td>
                                                    <td>{valForm.nama}</td>
                                                    <td>{valForm.jenis}</td>
                                                    <td>{valForm.proyeksi}</td>
                                                    <td>{valForm.jenjangProyeksi}</td>
                                                    <td>{valForm.tanggalFitProper}</td>
                                                    <td><button className="btn btn-xs btn-info" onClick={() => setShowNilai(!showNilai)}><i className="fas fa-eye"></i></button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {showNilai ? (
                        <div className="card">
                            <div className="card-header">
                                <label>Semua Nilai</label>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12 col-xl-4">
                                        <div className="dt-responsive table-responsive">
                                            <label>Key Competency</label>
                                            <table className="table table-striped nowrap">
                                                <tbody>
                                                    <tr>
                                                        <th>Enthusiasthic for Challenge</th>
                                                        <td>{nilai.enthusiasthic}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Creative and Innovative</th>
                                                        <td>{nilai.creative}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bulding Business Partnership</th>
                                                        <td>{nilai.partnership}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Business Acumen</th>
                                                        <td>{nilai.bsn_acumen}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Customer Focus Oriented</th>
                                                        <td>{nilai.cust_focus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Driving Execution</th>
                                                        <td>{nilai.driving_execution}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Empowering / Developing Others</th>
                                                        <td>{nilai.empowering}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-4">
                                        <div className="dt-responsive table-responsive">
                                            <label>Personal Endurance</label>
                                            <table className="table table-striped nowrap">
                                                <tbody>
                                                    <tr>
                                                        <th>Internal Readness</th>
                                                        <td>{nilai.internal}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>External Readness</th>
                                                        <td>{nilai.external}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="dt-responsive table-responsive">
                                            <label>Wawancara</label>
                                            <table className="table table-striped nowrap">
                                                <tbody>
                                                    <tr>
                                                        <th>Nilai Wawancara</th>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-4">
                                        <div className="dt-responsive table-responsive">
                                            <label>Proyeksi Jabatan</label>
                                            <table className="table table-striped nowrap">
                                                <tbody>
                                                    <tr>
                                                        <th>Pemasaran dan Niaga</th>
                                                        <td>{nilai.pemasaran}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Keteknisian</th>
                                                        <td>{nilai.keteknisian}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>K3L</th>
                                                        <td>{nilai.k3l}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Kontribusi Terhadap KPI dan Kontrak</th>
                                                        <td>{nilai.kontribusi_kpi}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
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