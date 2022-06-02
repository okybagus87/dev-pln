import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../../api/Api";
import Spinner from "../loading/Spinner";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Nilai() {

    const [fitProper, setFitProper] = useState([]);
    const [nilaiKc, setNilaiKc] = useState([]);
    const [nilaiPe, setNilaiPe] = useState([]);
    const [nilaiPj, setNilaiPj] = useState([]);
    const [wawancara, setWawancara] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCetak, setShowCetak] = useState(false);

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
        kontribusi_kpi: '',
        nilaiWawancara: ''
    });

    let { id } = useParams();

    useEffect(() => {
        if (fitProper.length === 0 && nilaiKc.length === 0 && nilaiPe.length === 0 && nilaiPj.length === 0) {
            Api.getFitProperById(id).then((response) => {
                setFitProper(response.data.data);
                Api.getNilaiKc().then((response) => {
                    setNilaiKc(response.data.data);
                    Api.getNilaiPe().then((response) => {
                        setNilaiPe(response.data.data);
                        Api.getNilaiPj().then((response) => {
                            setNilaiPj(response.data.data);
                            Api.getWawancara().then((response) => {
                                setWawancara(response.data.data);
                                setIsLoading(true);
                            });
                        });
                    });
                });
            });
        }
        if (nilai.enthusiasthic === '' && nilai.creative === '' && nilai.partnership === '' && nilai.bsn_acumen === '' && nilai.cust_focus === '' && nilai.empowering === '' && nilai.driving_execution === '') {
            nilaiKc.forEach((data) => {
                if (data.attributes.nilai_kc.data.id === fitProper.id) {
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
                            kontribusi_kpi: '',
                            nilaiWawancara: ''
                        });
                    }, 1000);
                }
            });
        }
        else if (nilai.internal === '' && nilai.external === '') {
            nilaiPe.forEach((data) => {
                if (data.attributes.nilai_pe.data.id === fitProper.id) {
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
                            kontribusi_kpi: '',
                            nilaiWawancara: ''
                        });
                    }, 1000);
                }
            });
        }
        else if (nilai.pemasaran === '' && nilai.keteknisian === '' && nilai.k3l === '' && nilai.kontribusi_kpi === '') {
            nilaiPj.forEach((data) => {
                if (data.attributes.nilai_pj.data.id === fitProper.id) {
                    var dt = data.attributes;
                    setTimeout(() => {
                        setNilai({
                            ...nilai,
                            pemasaran: dt.pemasaran,
                            keteknisian: dt.keteknisan,
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
                            kontribusi_kpi: '',
                            nilaiWawancara: ''
                        });
                    }, 1000);
                }
            });
        }
        else {
            setShowCetak(true);
        }
        if (nilai.nilaiWawancara === '') {
            wawancara.forEach((data) => {
                if (data.attributes.fit_proper.data.id === fitProper.id) {
                    setTimeout(() => {
                        setNilai({
                            ...nilai,
                            nilaiWawancara: data.attributes.nilaiWawancara
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
                            kontribusi_kpi: '',
                            nilaiWawancara: ''
                        });
                    }, 1000);
                }
            });
        }
        else {
            setShowCetak(true);
        }
    });

    const cetak = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);

        const title = 'NIP : ' + fitProper.attributes.idPeserta.data.attributes.NIP + '\n' +
            'Nama : ' + fitProper.attributes.idPeserta.data.attributes.namaPegawai + '\n' +
            'Proyeksi : ' + fitProper.attributes.proyeksi;

        doc.text(title, marginLeft, 40);
        doc.text('Key Competencie', marginLeft, 110);
        doc.autoTable({ startY: 120, html: '#kc' });
        doc.text('Personal Endurance', marginLeft, 300);
        doc.autoTable({ html: '#pe', startY: doc.lastAutoTable.finalY + 40 });
        doc.text('Proyeksi Jabatan', marginLeft, 380);
        doc.autoTable({ html: '#pj', startY: doc.lastAutoTable.finalY + 40 });
        doc.text('Nilai Wawancara', marginLeft, 510);
        doc.autoTable({ html: '#wc', startY: doc.lastAutoTable.finalY + 40 });
        doc.save('Nilai_' + fitProper.attributes.idPeserta.data.attributes.namaPegawai + '.pdf');
    }

    if (isLoading) {
        return (
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Nilai</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">Report</li>
                        <li className="breadcrumb-item active">Rekap Nilai</li>
                        <li className="breadcrumb-item active">Detail</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <Link to="/report/rekap-nilai" className="btn btn-sm btn-primary mb-3"><i
                                className="fas fa-arrow-circle-left"></i> Kembali</Link>
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <input type="text" className="form-control" value={'Nama: ' + fitProper.attributes.idPeserta.data.attributes.namaPegawai} readOnly />
                                </div>
                                <div className="col-sm-6 col-12">
                                    <input type="text" className="form-control" value={'Proyeksi: ' + fitProper.attributes.proyeksi} readOnly />
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-lg-12 col-xl-4">
                                    <div className="dt-responsive table-responsive">
                                        <label>Key Competency</label>
                                        <table className="table table-striped nowrap" id="kc">
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
                                        <table className="table table-striped nowrap" id="pe">
                                            <tbody>
                                                <tr>
                                                    <th>Internal Readness &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <td>{nilai.internal}</td>
                                                </tr>
                                                <tr>
                                                    <th>External Readness &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <td>{nilai.external}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="dt-responsive table-responsive">
                                        <label>Wawancara</label>
                                        <table className="table table-striped nowrap" id="wc">
                                            <tbody>
                                                <tr>
                                                    <th>Nilai Wawancara &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <td>{nilai.nilaiWawancara}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-xl-4">
                                    <div className="dt-responsive table-responsive">
                                        <label>Proyeksi Jabatan</label>
                                        <table className="table table-striped nowrap" id="pj">
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
                        {showCetak ? (
                            <div className="card-footer">
                                <button className="btn btn-warning float-right" onClick={cetak}><i className="fas fa-file-export"></i> Cetak</button>
                            </div>
                        ) : (
                            <div></div>
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