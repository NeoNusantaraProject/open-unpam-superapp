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
    <div className="container max-h-52 lg:max-h-64 bg-palette-4 text-white rounded">
      <div className="h-20">
        <p className="text-xs text-center font-semibold p-3 line-clamp-3 sm:text-md lg:text-lg">
          🚀{namaMatkul}
        </p>
      </div>
      <div className="flex flex-col justify-center text-xs gap-3 px-3 h-24 md:text-md lg:text-lg lg:h-32">
        <p>
          <i className="fas fa-layer-group"></i>
          {"  "}
          {sks} SKS - {sks == 2 ? 14 : sks == 3 ? 21 : 0} Pertemuan
        </p>
        <a href={`/dashboard/presensi/${idMatkul}/${idKelas}`}>
          <button className="p-2 rounded bg-palette-6 hover:scale-110">
            <i className="fas fa-info-circle"></i> Details
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
  astroCookie: { myUNPAMToken: string };
}> = ({ astroCookie }) => {
  const [apiData, setApiData] = useState<IMatkul[]>([]);

  const api = new APIProvider(astroCookie.myUNPAMToken, "ProxyFetchAPI");

  useEffect(() => {
    api.myunpam.getJadwalKuliah().then((e) => {
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
    <div className="flex p-5 flex-wrap justify-center items-center h-full">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
    </div>
  ) : (
    <div className="flex justify-center w-full h-screen scale-75">
      <LoadingComponent />
    </div>
  );
};
