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
								<Route path='/dashboard' element={<Dashboard />} />

								<Route path='/master/dataPeserta' element={<DataPeserta />} />
								<Route path='/master/dataPeserta/edit/:id' element={<EditPeserta />} />

								<Route path='/master/dataPenguji' element={<DataPenguji />} />
								<Route path='/master/dataPenguji/add' element={<AddPenguji />} />

								<Route path='/fit-proper/pendaftaran' element={<PendaftaranFit />} />
							</Routes>
						</div>
					</div>
				</div>
				<div className="modal fade show" id="delModal" aria-modal="true" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Hapus Data</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<p>Apakah anda yakin untuk menghapus data ini?</p>
							</div>
							<div className="modal-footer justify-content-between">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								<a href="" id="delHref"><button type="button" className="btn btn-outline-danger">Hapus</button></a>
							</div>
						</div>

					</div>

				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
