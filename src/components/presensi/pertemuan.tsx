import { useEffect, useState } from "react";
import { APIProvider } from "../../utilities/apiprovider";
import LoadingComponent from "../LoadingComponent";

interface IAPIData {
  jenis_perkuliahan?: string;
  id_semester_registrasi?: string;
  id_mata_kuliah?: string;
  id_kelas?: string;
  ket_jam?: string;
  tanggal_mulai?: string;
  tanggal_akhir?: string;
  presensi_status?: string;
  presensi_date?: string;
  presensi_by?: string;
  date_status?: string;
}

type TPertemuanComponent = { pertemuan_ke: number } & IAPIData;

const Pertemuan = ({
  jenis_perkuliahan,
  presensi_status,
  presensi_date,
  pertemuan_ke,
  id_mata_kuliah,
  id_kelas,
  id_semester_registrasi,
}: TPertemuanComponent) => {
  return (
    <div className="text-white">
      <div className="bg-palette-4 p-5 rounded text-xs">
        <div>
          <div className="text-sm sm:text-sm lg:text-xl h-20">
            <p className="text-center font-bold">🚀 PERTEMUAN {pertemuan_ke}</p>
          </div>
          <div className="flex flex-col gap-3 text-xs sm:text-sm lg:text-lg">

            <p>
              <i
                className={`nf ${jenis_perkuliahan == "tatap muka"
                  ? "fas fa-user"
                  : jenis_perkuliahan == "e-learning"
                    ? "fas fa-laptop"
                    : "fad fa-circle"
                  }`}
              ></i>
              {jenis_perkuliahan || "Belum ada"}
            </p>
            <span
              className={`px-1 rounded-md ${presensi_status == "hadir"
                ? "bg-green-600"
                : presensi_status == "absen"
                  ? "bg-red-600"
                  : "bg-palette-3"
                }`}
            >
              <i
                className={`nf ${presensi_status == "hadir"
                  ? "fas fa-check"
                  : presensi_status == "absen"
                    ? "fas fa-close"
                    : "fad fa-circle"
                  }`}
              ></i>
              {presensi_status || "Belum Absensi"} - {presensi_date || "00"}
            </span>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-1 py-1">
          <a
            className="bg-palette-3 rounded-md text-center"
            href={`https://my.unpam.ac.id/presensi/pertemuan/scan-qr-pertemuan/${pertemuan_ke}/${id_mata_kuliah}/${id_kelas}/${id_semester_registrasi}`}
          >
            <button>Scan QR</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export const PertemuanGroup: React.FC<{
  params: { idmatkul: string; idkelas: string };
  astroCookie: { myUNPAMToken: string };
}> = ({ astroCookie, params }) => {
  const [apiData, setApiData] = useState<IAPIData[]>([]);

  const api = new APIProvider(astroCookie.myUNPAMToken, "ProxyFetchAPI");

  useEffect(() => {
    api.myunpam.getMatkulPresensi(params.idmatkul, params.idkelas).then((e) => {
      if (!e.status.success) return;
      setApiData(e.data);
    });
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full p-5">
        <a href="/dashboard/presensi" className="w-1/12">
          <button className="text-white font-semibold bg-palette-6 px-3 py-2 rounded-md">
            {"< Back"}
          </button>
        </a>
      </div>
      {apiData.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-4">
          {apiData.map((e, index) => (
            <Pertemuan
              pertemuan_ke={index + 1}
              jenis_perkuliahan={e.jenis_perkuliahan}
              presensi_status={e.presensi_status}
              presensi_date={e.presensi_date}
              id_kelas={e.id_kelas}
              id_mata_kuliah={e.id_mata_kuliah}
              id_semester_registrasi={e.id_semester_registrasi}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[70%] scale-75">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
