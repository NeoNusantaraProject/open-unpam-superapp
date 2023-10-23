import { useEffect, useState } from "react";
import { APIProvider } from "../../utilities/apiprovider";
import LoadingComponent from "../LoadingComponent";

export const Matkul: React.FC<{
  namaMatkul: string;
  sks: number;
  idMatkul: string;
  idKelas: string;
}> = ({ idKelas, idMatkul, namaMatkul, sks }) => {
  return (
    <div className="text-white p-2">
      <div className="bg-palette-4 p-1">
        <p className="text-center font-bold">🚀{namaMatkul}</p>
        <p>
          <i className="fas fa-layer-group"></i>
          {"  "}
          {sks} SKS - {sks == 2 ? 14 : sks == 3 ? 31 : 0} Pertemuan
        </p>
        <a href={`/dashboard/presensi/${idMatkul}/${idKelas}`}>
          <button className="px-2 rounded-md bg-palette-6">
            <i className="fas fa-info-circle px-1"></i>Details
          </button>
        </a>
      </div>
    </div>
  );
};

interface IMatkul {
  namaMatkul: string;
  sks: number;
  idMatkul: string;
  idKelas: string;
}

export const MaktulGroup: React.FC<{
  astroCookie: { myUNPAMToken: string; presensiToken: string };
}> = ({ astroCookie }) => {
  const [apiData, setApiData] = useState<IMatkul[]>([]);

  const api = new APIProvider(
    astroCookie.myUNPAMToken,
    astroCookie.presensiToken,
    "ProxyFetchAPI"
  );

  useEffect(() => {
    api.presensi.getJadwalKuliah().then((e) => {
      if (!e.status.success) return;

      setApiData(
        e.data.map((e) => ({
          namaMatkul: e.nama_mata_kuliah,
          sks: parseInt(e.sks),
          idMatkul: e.id_mata_kuliah,
          idKelas: e.id_kelas,
        }))
      );
    });
  }, []);

  return apiData.length > 0 ? (
    <div className="grid grid-cols-4">
      {apiData.map((e, i) => (
        <Matkul
          idKelas={e.idKelas}
          idMatkul={e.idMatkul}
          namaMatkul={e.namaMatkul}
          sks={e.sks}
          key={i}
        />
      ))}
    </div>
  ) : (
    <div className="w-full h-full flex justify-center">
      <LoadingComponent />
    </div>
  );
};
