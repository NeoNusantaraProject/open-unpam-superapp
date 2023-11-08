import { useEffect, useState } from "react";
import { APIProvider } from "../../utilities/apiprovider";
import LoadingComponent from "../LoadingComponent";

interface IPertemuan {
  nama_pertemuan: string;
  jenis_perkuliahan: string;
  presensi_status: string;
  presensi_date: string;
  uid: string;
  qrcode: string;
  nama_dosen: string;
}

const Pertemuan = ({
  uid,
  qrcode,
  nama_pertemuan,
  jenis_perkuliahan,
  presensi_status,
  presensi_date,
  nama_dosen,
}: IPertemuan) => {
  return (
    <div className="text-white">
      <div className="bg-palette-4 p-3 rounded-md">
        <div className="text-sm sm:text-sm lg:text-xl h-20">
          <p className="text-center font-semibold">🚀 {nama_pertemuan}</p>
        </div>
        <div className="text-xs sm:text-sm">
          <p>{nama_dosen}</p>
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
        <div className="grid grid-cols-2 gap-1 py-1">
          <a
            className="bg-palette-3 rounded-md text-center"
            href={`https://presensi.unpam.ac.id/jadwal/presensi/${uid}`}
          >
            <button>Scan QR</button>
          </a>
          <a
            className="bg-palette-3 rounded-md text-center"
            href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrcode}`}
            target="_blank"
          >
            <button>Get QR</button>
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
  const [apiData, setApiData] = useState<IPertemuan[]>([]);

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
          <button className="text-white bg-palette-6 px-3 py-2 rounded-md">
            {"< Back"}
          </button>
        </a>
      </div>
      {apiData.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-4">
          {apiData.map((e, index) => (
            <Pertemuan
              nama_pertemuan={`PERTEMUAN ${index + 1}`}
              jenis_perkuliahan={e.jenis_perkuliahan}
              presensi_status={e.presensi_status}
              presensi_date={e.presensi_date}
              uid={e.uid}
              qrcode={e.qrcode}
              nama_dosen={e.nama_dosen}
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
