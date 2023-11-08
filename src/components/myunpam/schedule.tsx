import { useEffect, useState } from "react";
import { initAPI } from "../../utilities/apiprovider";
import LoadingComponent from "../LoadingComponent";

interface IScheduleData {
  id_semester_registrasi: string;
  id_dosen: string;
  id_ruang: string;
  id_kelas: string;
  id_periode: string;
  id_waktu_kuliah: string;
  tgl_mulai_kuliah: string;
  tgl_akhir_kuliah: string;
  id_mata_kuliah: string;
  nama_prodi: string;
  id_hari_waktu_kuliah: string;
  id_sesi: string;
  id_lokasi_kampus: string;
  nama_lokasi_kampus: string;
  id_jenis_perkuliahan: string;
  keterangan_jenis_perkuliahan: string;
  ruang: string;
  nama_mata_kuliah: string;
  dosen: {
    id_dosen: string;
    nama_dosen: string;
  };
  semester: {
    id_semester_registrasi: string;
    nama_semester_registrasi: string;
  };
  mata_kuliah: {
    id_mata_kuliah: string;
    nama_mata_kuliah: string;
  };
  waktu_kuliah: {
    id_waktu_kuliah: string;
    id_hari_waktu_kuliah: number;
    id_sesi: number;
    id_shift: string;
    ket_jam: string;
    hari: {
      id_hari_waktu_kuliah: number;
      nama_hari: string;
    };
    shift: {
      id_shift: string;
      nama_shift: string;
    };
  };
}

const Schedule: React.FC<{
  astroCookies: { myUNPAMToken: string };
}> = ({ astroCookies }) => {
  const [scheduleData, setScheduleData] = useState<IScheduleData[]>();

  useEffect(() => {
    const api = initAPI(astroCookies, "ProxyFetchAPI");
    api.myunpam.getScheduleData().then((e) => setScheduleData(e.data.jadwal));
  }, []);

  return (
    <div className="w-full text-white overflow-x-scroll">
      <table className="min-w-full text-[10px] sm:text-sm" cellPadding={10}>
        <thead>
          <tr className="bg-palette-3">
            <th>Kode Matkul</th>
            <th>Nama Matkul</th>
            <th>Dosen</th>
            <th>Kelas</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Kelompok</th>
            <th>Ruangan</th>
          </tr>
        </thead>
        <tbody>
          {!scheduleData && (
            <tr>
              <td colSpan={8}>
                <LoadingComponent />
              </td>
            </tr>
          )}
          {scheduleData &&
            scheduleData.map((e, i) => (
              <tr key={i} className="odd:bg-palette-5 even:bg-palette-6">
                <td className="text-center">{e.id_mata_kuliah}</td>
                <td>{e.nama_mata_kuliah}</td>
                <td>{e.dosen.nama_dosen}</td>
                <td className="text-center">{e.id_kelas}</td>
                <td className="text-center">{e.waktu_kuliah.hari.nama_hari}</td>
                <td className="text-center">{e.waktu_kuliah.ket_jam}</td>
                <td className="text-center">{e.id_periode}</td>
                <td className="text-center">{e.id_ruang}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
