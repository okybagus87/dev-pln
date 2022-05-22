import axios from 'axios'
export default {
    getDataPegawai: () =>
        axios({
            'method': 'GET',
            'url': 'https://linksmart-pln.herokuapp.com/api/pegawais?populate=jabatan'
        }),

    getDataPegawaiById: (id) =>
        axios({
            'method': 'GET',
            'url': 'https://linksmart-pln.herokuapp.com/api/pegawais/' + id + '?populate=jabatan'
        }),

    updateRolePenguji: (id) =>
        axios.put('https://linksmart-pln.herokuapp.com/api/pegawais/' + id, {
            data: {
                role: 'Penguji'
            }
        }),

    addPenguji: (id) =>
        axios.post('https://linksmart-pln.herokuapp.com/api/pengujis', {
            data: {
                id_penguji: id
            }
        }),

    getJabatan: () => axios.get('https://linksmart-pln.herokuapp.com/api/jabatans?populate=*'),

    getPenguji: () => axios.get('https://linksmart-pln.herokuapp.com/api/pengujis?populate=*'),

    addFitProper: (data) =>
        axios.post('https://linksmart-pln.herokuapp.com/api/fit-propers', {
            data: {
                tanggalFitProper: data.tanggalFitProper,
                proyeksi: data.proyeksi.value,
                jenis: data.jenis,
                idPeserta: data.idPeserta,
                pengujis: data.pengujis.value,
                jenjang_proyeksi: data.jenjang_proyeksi.value
            }
        }),
}