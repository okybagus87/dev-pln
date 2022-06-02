import './App.css';
import Header from './master/Header';
import Sidebar from './master/Sidebar';
import Footer from './master/Footer';
import Dashboard from './page/dashboard/Dashboard';
import DataPeserta from './page/master/dataPeserta/DataPeserta';
import DataPenguji from './page/master/dataPenguji/DataPenguji';
import EditPeserta from './page/master/dataPeserta/Edit';
import AddPenguji from './page/master/dataPenguji/Add';
import React from "react";
import PendaftaranFit from './page/fitProper/pendaftaran/Pendaftaran';
import PenilaianFit from './page/fitProper/penilaian/Penilaian';
import PendaftaranWawancara from './page/fitProper/pendaftaran/Wawancara';
import Pencarian from './page/fitProper/pencarian/Pencarian';
import PenilaianWawancara from './page/fitProper/penilaian/Wawancara';
import RekapNilai from './page/report/RekapNilai';
import Cetak from './page/report/Cetak';
import Nilai from './page/report/Nilai';
import AddPeserta from './page/master/dataPeserta/Add';
import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="wrapper">
				<Header />
				<Sidebar />
				<div className="content-wrapper">
					<div className="content-header">
						<div className="container-fluid">
							<Routes>
								<Route path='/' element={<Dashboard />} />
								<Route path='/dashboard' element={<Dashboard />} />

								{/* Adrianus */}
								<Route path='/master/dataPeserta' element={<DataPeserta />} />
								<Route path='/master/dataPeserta/edit/:id' element={<EditPeserta />} />

								<Route path='/master/dataPenguji' element={<DataPenguji />} />
								<Route path='/master/dataPenguji/add' element={<AddPenguji />} />
								<Route path='/master/dataPeserta/add' element={<AddPeserta />} />

								{/* Oky */}
								<Route path='/fit-proper/pendaftaran' element={<PendaftaranFit />} />
								<Route path='/fit-proper/penilaian' element={<PenilaianFit />} />
								<Route path='/fit-proper/pencarian' element={<Pencarian />} />

								{/* Rafid */}
								<Route path='/fit-proper/wawancara/pendaftaran' element={<PendaftaranWawancara />} />
								<Route path='/fit-proper/wawancara/penilaian' element={<PenilaianWawancara />} />

								<Route path='/report/rekap-nilai' element={<RekapNilai />} />
								<Route path='/report/rekap-nilai/:id' element={<Nilai />} />
								<Route path='/report/cetak-nilai/:id' element={<Cetak />} />
							</Routes>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
