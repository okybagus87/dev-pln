import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../../api/Api";
import Spinner from "../loading/Spinner";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Cetak() {
    const [fitProper, setFitProper] = useState([]);
    const [nilaiKc, setNilaiKc] = useState([]);
    const [nilaiPe, setNilaiPe] = useState([]);
    const [nilaiPj, setNilaiPj] = useState([]);
    const [wawancara, setWawancara] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                            });
                        });
                    });
                });
            });
        }
        else {
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
            else if (nilai.nilaiWawancara === '') {
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
                setIsLoading(true);
            }
        }
    });

    var people = [
        { name: "Keanu Reeves", profession: "Actor" },
        { name: "Lionel Messi", profession: "Football Player" },
        { name: "Cristiano Ronaldo", profession: "Football Player" },
        { name: "Jack Nicklaus", profession: "Golf Player" },
    ]

    const cetak = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "My Awesome Report";
        const headers = [["NAME", "PROFESSION"]];

        const data = people.map(elt => [elt.name, elt.profession]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf");
        setIsLoading(false);
    }

    if (isLoading) {
        return(
            <div onLoad={() => cetak()}>

            </div>
        );
    }
    else {
        return (
            <Spinner />
        );
    }
}